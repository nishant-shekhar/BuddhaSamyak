import { useEffect, useMemo, useRef, useState } from "react";

export default function DateSelector({ value, onChange }) {
  // --- Config ---
  const CUTOFF_HOUR = 16;
  const CUTOFF_MINUTE = 30;
  const WINDOW_DAYS = 15;

  // --- Internet time state ---
  const [netNow, setNetNow] = useState(null); // Date in Asia/Kolkata
  const [timeSource, setTimeSource] = useState("loading"); // 'cloudflare' | 'worldtimeapi' | 'device' | 'error' | 'loading'
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);

  // --- Selected/current ---
  const [currentDate, setCurrentDate] = useState(() =>
    value ? new Date(value) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    value ? new Date(value) : null
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Helpers
  const normalizeMidnight = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  // Convert any Date to "Asia/Kolkata" clock by round-tripping via toLocaleString
  const toKolkata = (d) =>
    new Date(d.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  // Robust fetch with timeout
  const withTimeout = (p, ms = 3000) =>
    Promise.race([
      p,
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
    ]);

  const fetchCloudflare = async () => {
    const res = await withTimeout(fetch("https://time.cloudflare.com/now"));
    if (!res.ok) throw new Error("cf not ok");
    const iso = await res.text(); // ISO in UTC
    const d = new Date(iso);
    return toKolkata(d);
  };

  const fetchWorldTime = async () => {
    const res = await withTimeout(
      fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
    );
    if (!res.ok) throw new Error("wta not ok");
    const json = await res.json();
    return new Date(json.datetime); // already with +05:30 offset
  };

  const fetchInternetNow = async () => {
    setTimeSource((s) => (s === "loading" ? "loading" : s)); // keep status if refreshing
    try {
      // Race Cloudflare & WorldTime; whichever resolves first wins
      const winner = await Promise.any([fetchCloudflare(), fetchWorldTime()]);
      setNetNow(winner);
      setTimeSource(
        winner && winner.__source ? winner.__source : "internet"
      );
      setLastUpdated(new Date());
    } catch {
      // Fallback: device time coerced to IST
      const device = toKolkata(new Date());
      setNetNow(device);
      setTimeSource("device");
      setLastUpdated(new Date());
    }
  };

  // Annotate sources (optional; invisible)
  // (We can’t actually tag the Date; skipping to keep it simple.)

  // Kick off time fetch; refresh every 60s while open
  useEffect(() => {
    fetchInternetNow();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isCalendarOpen) {
      fetchInternetNow(); // ensure fresh when opened
      intervalRef.current = setInterval(fetchInternetNow, 60000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isCalendarOpen]);

  // Compute today, cutoff, window
  const todayIST = useMemo(() => (netNow ? normalizeMidnight(netNow) : null), [netNow]);

  const isAfterCutoff = useMemo(() => {
    if (!netNow) return false;
    const h = netNow.getHours();
    const m = netNow.getMinutes();
    return h > CUTOFF_HOUR || (h === CUTOFF_HOUR && m >= CUTOFF_MINUTE);
  }, [netNow]);

  const minDate = useMemo(() => {
    if (!todayIST) return null;
    // If after cutoff, earliest is tomorrow
    const d = new Date(todayIST);
    if (isAfterCutoff) d.setDate(d.getDate() + 1);
    return d;
  }, [todayIST, isAfterCutoff]);

  const maxDate = useMemo(() => {
    if (!minDate) return null;
    const d = new Date(minDate);
    d.setDate(d.getDate() + WINDOW_DAYS); // inclusive window of 15 days
    return d;
  }, [minDate]);

  // Sync from prop
  useEffect(() => {
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed)) {
        const normalized = new Date(
          parsed.getFullYear(),
          parsed.getMonth(),
          parsed.getDate()
        );
        setSelectedDate(normalized);
        setCurrentDate(normalized);
        return;
      }
    }
    setSelectedDate(null);
  }, [value]);

  const handleToggleCalendar = () => setIsCalendarOpen((prev) => !prev);

  const handleDayClick = (day) => {
    if (!minDate || !maxDate) return; // wait for time load
    const clicked = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    clicked.setHours(0, 0, 0, 0);

    // Validate window
    const inWindow = clicked >= minDate && clicked <= maxDate;
    if (!inWindow) return;

    setSelectedDate(clicked);
    const localDateString = `${clicked.getFullYear()}-${String(
      clicked.getMonth() + 1
    ).padStart(2, "0")}-${String(clicked.getDate()).padStart(2, "0")}`;
    onChange?.(localDateString);
    setTimeout(() => setIsCalendarOpen(false), 150);
  };

  const handlePrevMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const handleNextMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const handleCancel = () => {
    setSelectedDate(null);
    onChange?.(null);
    setIsCalendarOpen(false);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const leadingBlanks = (firstDay + 6) % 7;
    const blanks = Array.from({ length: leadingBlanks }).map((_, idx) => (
      <div key={`blank-${idx}`} />
    ));

    const days = Array.from({ length: daysInMonth }).map((_, i) => {
      const day = i + 1;
      const dateObj = new Date(year, month, day);
      dateObj.setHours(0, 0, 0, 0);

      const weekday = dateObj.getDay(); // 1 = Monday
      const isMonday = weekday === 1;
      const isPast = todayIST ? dateObj < todayIST : false;

      const isSelected =
        selectedDate &&
        day === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      // Window check (only if min/max computed)
      let outOfWindow = false;
      if (minDate && maxDate) {
        if (dateObj < minDate || dateObj > maxDate) outOfWindow = true;
      }

      const isDisabled = isMonday || isPast || outOfWindow;

      return (
        <div
          key={day}
          onClick={() => !isDisabled && handleDayClick(day)}
          className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] sm:h-[58px] sm:w-[58px] text-sm rounded-[7px] mb-2 transition-all duration-150
            ${isDisabled ? "opacity-40 pointer-events-none" : "cursor-pointer"}
            ${
              isSelected
                ? "bg-black text-white scale-105"
                : "border border-transparent text-gray-800 hover:border-gray-400 hover:bg-gray-100 hover:scale-105"
            }`}
          aria-disabled={isDisabled}
          aria-current={isSelected ? "date" : undefined}
          role="button"
          title={
            isMonday
              ? "Closed on Mondays"
              : outOfWindow
              ? "Bookings allowed from earliest available date up to 15 days ahead"
              : undefined
          }
        >
          <span>{day}</span>
          {isMonday && (
            <span className="text-[10px] text-red-500 leading-none mt-0.5">
              Closed
            </span>
          )}
        </div>
      );
    });

    return [...blanks, ...days];
  };

  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[510px]">
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Pick a date"
            readOnly
            onClick={handleToggleCalendar}
            value={
              selectedDate
                ? `${String(selectedDate.getDate()).padStart(2, "0")}/${String(
                    selectedDate.getMonth() + 1
                  ).padStart(2, "0")}/${selectedDate.getFullYear()}`
                : ""
            }
            className="h-12 w-full p-3 appearance-none rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-gray-800 outline-none focus:border-black transition-colors duration-200 cursor-pointer"
            aria-haspopup="dialog"
            aria-expanded={isCalendarOpen}
          />
          <span
            onClick={() => setIsCalendarOpen((p) => !p)}
            className="absolute inset-y-0 left-0 flex h-12 w-12 items-center justify-center text-gray-400 cursor-pointer hover:text-gray-700 transition-colors duration-200"
            aria-hidden="true"
          >
            {/* calendar icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              fill="currentColor" className="h-6 w-6">
              <path d="M7 2.75a.75.75 0 0 0-1.5 0V4H4.75A2.75 2.75 0 0 0 2 6.75v10.5A2.75 2.75 0 0 0 4.75 20h14.5A2.75 2.75 0 0 0 22 17.25V6.75A2.75 2.75 0 0 0 19.25 4H18.5V2.75a.75.75 0 0 0-1.5 0V4H7V2.75ZM3.5 8.5h17v8.75c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25V8.5Z" />
            </svg>
          </span>
        </div>

        {/* Time status */}
        <div className="mb-2 text-xs text-gray-500">
          {timeSource === "loading"
            ? "Time source: checking…"
            : `Time source: ${timeSource}`}
          {netNow && (
            <> • {netNow.toLocaleString("en-IN", { hour12: true })} (Asia/Kolkata)</>
          )}
          {lastUpdated && <> • updated {lastUpdated.toLocaleTimeString("en-IN")}</>}
          {isAfterCutoff && (
            <span className="text-red-600"> • Today after 4:30 PM is closed</span>
          )}
        </div>

        {isCalendarOpen && (
          <div
            className="w-full flex-col rounded-xl bg-white border border-gray-300 p-4 shadow-md"
            role="dialog"
            aria-label="Choose a date"
          >
            <div className="flex items-center justify-between pb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Previous month"
              >
                ◀
              </button>
              <span className="text-xl font-medium capitalize text-gray-800">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Next month"
              >
                ▶
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 pb-2 pt-1">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <span
                  key={d}
                  className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-800">
              {generateCalendarDays()}
            </div>

            <div className="flex items-center justify-center pt-4">
              <button
                onClick={handleCancel}
                className="flex h-[46px] w-full max-w-[220px] border border-gray-300 text-gray-800 items-center justify-center rounded-md bg-white font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Remove Selection
              </button>
            </div>

            <div className="text-center pt-3">
              <p className="text-sm text-gray-500">
                Click on a date to select automatically
              </p>
              {minDate && maxDate && (
                <p className="text-xs text-gray-400 mt-1">
                  Booking window: {minDate.toLocaleDateString("en-IN")} to{" "}
                  {maxDate.toLocaleDateString("en-IN")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
