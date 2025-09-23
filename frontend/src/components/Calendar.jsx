import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Ticket,
  Info
} from "lucide-react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const today = dayjs();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const calendarDays = [];

  // Build calendar grid
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(dayjs(currentMonth).date(i));
  }

  const handleDateSelect = (date) => {
    if (!date || date.isBefore(today, "day") || date.day() === 0) return;
    setSelectedDate(date);
  };

    const openMap = () => {
        window.open(
            "https://www.google.com/maps/place/Buddha+Samyak+Darshan+Museum+%26+Stupa/@25.9942639,85.1175337,959m/data=!3m2!1e3!4b1!4m6!3m5!1s0x39ed391d4d1060ad:0x60961d6b8f33c717!8m2!3d25.9942639!4d85.1201086!16s%2Fg%2F11rbrwj7s7?entry=ttu",
            "_blank"
        );
    };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl text-black mb-3 tracking-wide">
            Plan Your Visit
          </h1>
          <p className="text-gray-500 text-sm font-light">
            Select your preferred date and explore booking options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              
              {/* Calendar Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-5">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevMonth}
                    className="w-9 h-9 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-black" />
                  </button>
                  
                  <h2 className="text-xl font-medium text-black tracking-wide">
                    {currentMonth.format("MMMM YYYY")}
                  </h2>
                  
                  <button
                    onClick={handleNextMonth}
                    className="w-9 h-9 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-black" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={day}
                      className="h-10 flex items-center justify-center text-xs font-medium text-gray-400 tracking-wider"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((date, index) => {
                    const isToday = date && date.isSame(today, "day");
                    const isSunday = date && date.day() === 1;
                    const isPastMonth = date && !date.isSame(currentMonth, "month");
                    const isPast = date && date.isBefore(today, "day");
                    const isSelected = selectedDate && date && date.isSame(selectedDate, "day");

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(date)}
                        disabled={!date || isPastMonth || isPast || isSunday}
                        className={`
                          h-12 rounded-lg border text-sm font-medium transition-all duration-200
                          ${!date ? "invisible" : ""}
                          ${isPastMonth || isPast || isSunday
                            ? "text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50" 
                            : isSelected
                              ? "bg-black text-white border-black shadow-sm"
                              : isToday 
                                ? "text-black border-gray-400 bg-gray-50 hover:bg-gray-100" 
                                : "text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }
                        `}
                      >
                        {date && date.date()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
              <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-black mb-4">
                  {selectedDate.format("dddd, MMMM D, YYYY")}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium">
                    Morning Visit (10:00 AM)
                  </button>
                  <button className="bg-white text-black border border-gray-200 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                    Afternoon Visit (1:00 PM)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Information Cards */}
          <div className="space-y-6">
            
            {/* Ticket Information */}

            {/* Opening Hours */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="font-medium text-black text-lg">Opening Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Monday - Saturday</span>
                  <span className="font-medium text-black">010:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100">
                  <span className="text-gray-400">Sunday</span>
                  <span className="font-medium text-gray-400">Closed</span>
                </div>
              </div>
            </div>

            {/* Visitor Guidelines */}


            {/* Contact Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="font-medium text-black text-lg">Location</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Buddha Samyak Darshan Museum<br />
                Near Central Park<br />
                Exhibition Road, City Center
              </p>
              <button
                  onClick={openMap}
                  className="mt-4 w-full bg-black text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium text-sm">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
