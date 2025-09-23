import { useEffect, useState } from "react";

export default function DateSelector({ value, onChange }) {
    const [currentDate, setCurrentDate] = useState(() =>
        value ? new Date(value) : new Date()
    );
    const [selectedDate, setSelectedDate] = useState(() =>
        value ? new Date(value) : null
    );
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    useEffect(() => {
        if (value) {
            const parsed = new Date(value);
            if (!isNaN(parsed)) {
                setSelectedDate(parsed);
                setCurrentDate(parsed);
            }
        }
    }, [value]);

    const handleToggleCalendar = () => {
        setIsCalendarOpen((prev) => !prev);
    };

    // Modified handleDayClick to automatically close calendar and apply the date
    const handleDayClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        clickedDate.setHours(0, 0, 0, 0);

        if (clickedDate >= today) {
            setSelectedDate(clickedDate);

            const localDateString = `${clickedDate.getFullYear()}-${String(clickedDate.getMonth() + 1).padStart(2, '0')}-${String(clickedDate.getDate()).padStart(2, '0')}`;
            onChange?.(localDateString);

            // Automatically close the calendar after date selection
            setTimeout(() => {
                setIsCalendarOpen(false);
            }, 200); // Small delay for visual feedback
        }
    };

    const handlePrevMonth = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentDate(
            (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
    };

    const handleCancel = () => {
        setSelectedDate(null);
        onChange(null);
        setIsCalendarOpen(false);
    };

    // Removed handleApply function as it's no longer needed

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const blanks = [...Array((firstDay + 6) % 7)].map((_, idx) => (
            <div key={`blank-${idx}`} />
        ));

        const days = [...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dateObj = new Date(year, month, day);
            dateObj.setHours(0, 0, 0, 0);

            const isSunday = dateObj.getDay() === 0;
            const isPast = dateObj < today;

            const isSelected =
                selectedDate &&
                day === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear();

            const isDisabled = isPast || isSunday;

            return (
                <div
                    key={day}
                    onClick={() => !isDisabled && handleDayClick(day)}
                    className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] sm:h-[58px] sm:w-[58px] text-sm rounded-[7px] mb-2 transition-all duration-200
            ${isDisabled ? "opacity-40 pointer-events-none" : "cursor-pointer"}
            ${
                        isSelected
                            ? "bg-black text-white scale-105"
                            : "border border-transparent text-dark hover:border-stroke hover:bg-gray-100 hover:scale-105 dark:text-white dark:hover:border-dark-3 dark:hover:bg-dark"
                    }`}
                >
                    <span>{day}</span>
                    {isSunday && <span className="text-[10px] text-red-500">Closed</span>}
                </div>
            );
        });

        return [...blanks, ...days];
    };

    return (
        <section className="bg-white dark:bg-dark">
            <div className="container">
                <div className="mx-auto w-full max-w-[510px]">
                    <div className="relative mb-3">
                        <input
                            type="text"
                            placeholder="Pick a date"
                            readOnly
                            onClick={handleToggleCalendar}
                            value={
                                selectedDate
                                    ? `${String(selectedDate.getDate()).padStart(2, '0')}/${String(selectedDate.getMonth() + 1).padStart(2, '0')}/${selectedDate.getFullYear()}`
                                    : ""
                            }
                            className="h-12 w-full p-3 appearance-none rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-dark outline-none focus:border-black transition-colors duration-200 dark:border-dark-3 dark:bg-dark-2 dark:text-white cursor-pointer"
                        />
                        <span
                            onClick={handleToggleCalendar}
                            className="absolute inset-y-0 left-0 flex h-12 w-12 items-center justify-center text-dark-5 cursor-pointer hover:text-black transition-colors duration-200"
                        >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#AEAEAE" className="size-6">
                <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                <path fillRule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clipRule="evenodd" />
              </svg>
            </span>
                    </div>

                    {isCalendarOpen && (
                        <div className="w-full flex-col rounded-xl bg-white border border-gray-300 p-4 shadow-four sm:p-[30px] dark:bg-dark-2 dark:shadow-box-dark">
                            <div className="flex items-center justify-between pb-4">
                                <button onClick={handlePrevMonth} className="calendar-nav hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
                                    ◀
                                </button>
                                <span className="text-xl font-medium capitalize text-dark dark:text-white">
                  {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                  })}
                </span>
                                <button onClick={handleNextMonth} className="calendar-nav hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200">
                                    ▶
                                </button>
                            </div>

                            <div className="grid grid-cols-7 justify-between text-center pb-2 pt-4 text-sm font-medium capitalize text-body-color sm:text-lg dark:text-dark-6">
                                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                                    <span
                                        key={d}
                                        className="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
                                    >
                    {d}
                  </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 text-center text-sm font-medium sm:text-lg">
                                {generateCalendarDays()}
                            </div>

                            {/* Updated button section - only showing Remove button */}
                            <div className="flex items-center justify-center pt-4">
                                <button
                                    onClick={handleCancel}
                                    className="flex h-[50px] w-full max-w-[200px] border border-gray-300 text-black items-center justify-center rounded-md bg-white text-base font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                                >
                                    Remove Selection
                                </button>
                            </div>

                            {/* Instruction text */}
                            <div className="text-center pt-3">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Click on a date to select automatically
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
