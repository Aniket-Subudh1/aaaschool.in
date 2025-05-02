"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarIcon, Info } from "lucide-react";
import Earth from "@/components/ui/globe";

interface Holiday {
  _id?: string;
  date: string;
  name: string;
  type: "national" | "religious" | "school" | "exam";
  description?: string;
}

export default function SchoolCalendar() {
  const [currentMonth, setCurrentMonth] = useState(3); // April
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use ?format=raw to get raw array
      const res = await fetch("/api/holidays?active=true&format=raw");
      if (!res.ok) {
        console.error("Response status:", res.status);
        throw new Error("Failed to fetch holidays");
      }

      const data = await res.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setHolidays(data);
      } else {
        // Fallback holidays if none are available
        setHolidays([
          {
            _id: "1",
            date: "2025-04-13",
            name: "Baisakhi",
            type: "religious",
          },
          {
            _id: "2",
            date: "2025-04-14",
            name: "Dr. Ambedkar Jayanti",
            type: "national",
          },
          {
            _id: "3",
            date: "2025-04-19",
            name: "Ram Navami",
            type: "religious",
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching holidays:", err);
      setError("Failed to load holidays");

      // Fallback holidays if fetch fails
      setHolidays([
        {
          _id: "1",
          date: "2025-04-13",
          name: "Baisakhi",
          type: "religious",
        },
        {
          _id: "2",
          date: "2025-04-14",
          name: "Dr. Ambedkar Jayanti",
          type: "national",
        },
        {
          _id: "3",
          date: "2025-04-19",
          name: "Ram Navami",
          type: "religious",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isHoliday = (date: string) => {
    return holidays.find((holiday) => holiday.date === date);
  };

  const getHolidayType = (date: string) => {
    const holiday = holidays.find((holiday) => holiday.date === date);
    return holiday ? holiday.type : null;
  };

  const getHolidayDetails = (date: string) => {
    return holidays.find((holiday) => holiday.date === date);
  };

  const renderCalendar = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-7 gap-1">
          {Array(35)
            .fill(0)
            .map((_, index) => (
              <div
                key={`loading-${index}`}
                className="h-14 md:h-20 p-1 animate-pulse bg-gray-200 rounded"
              ></div>
            ))}
        </div>
      );
    }

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const days: JSX.Element[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-14 md:h-20 p-1 text-center text-gray-500 border border-[#d4b483]/10"
        >
          <span className="text-sm md:text-base">
            {getDaysInMonth(
              currentYear,
              currentMonth - 1 < 0 ? 11 : currentMonth - 1
            ) -
              firstDayOfMonth +
              i +
              1}
          </span>
        </div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const holiday = isHoliday(dateString);
      const holidayType = getHolidayType(dateString);

      let bgColor = "";
      if (holidayType === "national") bgColor = "bg-[#8b1a1a]/10";
      else if (holidayType === "religious") bgColor = "bg-[#d4b483]/20";
      else if (holidayType === "school") bgColor = "bg-green-100";
      else if (holidayType === "exam") bgColor = "bg-blue-100";

      days.push(
        <div
          key={day}
          className={`h-14 md:h-20 p-1 text-center border border-[#d4b483]/10 relative cursor-pointer transition-colors hover:bg-[#f0e6d2] ${bgColor} ${
            selectedDate === dateString ? "ring-2 ring-[#8b1a1a]" : ""
          }`}
          onClick={() => setSelectedDate(dateString)}
        >
          <div className="flex flex-col h-full">
            <span className="text-base md:text-lg font-medium">{day}</span>
            {holiday && (
              <div className="mt-auto">
                <div className="text-xs md:text-sm truncate text-[#8b1a1a] font-medium">
                  {holiday.name}
                </div>
              </div>
            )}
          </div>
          {holiday && (
            <div className="absolute bottom-0 right-0 w-0 h-0 border-8 border-transparent border-b-[#8b1a1a] border-r-[#8b1a1a]"></div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <section className="py-16 bg-[#f8f3e9] relative">
      <div className="absolute top-0 left-0 w-full h-8 bg-[#8b1a1a]/10"></div>

      {/* Main container */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Globe Component */}
          <div className="lg:w-1/3 flex justify-center items-center">
            <div className="bg-[#f0e6d2] rounded-lg shadow-lg border border-[#d4b483]/20 p-6 w-full mt-44 h-[400px] md:h-[550px] flex flex-col justify-center">
              <h3 className="text-2xl font-serif font-bold text-[#8b1a1a] mb-2 text-center">
                Global Learning
              </h3>
              <p className="text-center text-[#5a3e36] mb-6">
                Exploring education across the world
              </p>
              <div className="flex-1 flex items-center justify-center">
                <Earth
                  scale={1}
                  mapBrightness={6}
                  baseColor={[0.94, 0.9, 0.82]}
                  glowColor={[0.94, 0.9, 0.82]}
                  markerColor={[0.55, 0.1, 0.1]}
                />
              </div>
            </div>
          </div>
          {/* Calendar Component */}
          <div className="lg:w-2/3">
            <div className="text-center mb-6">
              <div className="inline-block mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
                  <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                    <CalendarIcon className="h-8 w-8 text-[#8b1a1a]" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-2 font-serif">
                School Calendar
              </h2>
              <p className="text-[#5a3e36] max-w-2xl mx-auto">
                Stay updated with important dates, holidays, and events
                throughout the academic year.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg border border-[#d4b483]/20 overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-[#8b1a1a] text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex items-center">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h3 className="text-xl font-medium mx-4">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("month")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      viewMode === "month"
                        ? "bg-white text-[#8b1a1a]"
                        : "hover:bg-white/10"
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode("week")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      viewMode === "week"
                        ? "bg-white text-[#8b1a1a]"
                        : "hover:bg-white/10"
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setViewMode("day")}
                    className={`px-3 py-1 rounded-md text-sm ${
                      viewMode === "day"
                        ? "bg-white text-[#8b1a1a]"
                        : "hover:bg-white/10"
                    }`}
                  >
                    Day
                  </button>
                </div>
              </div>

              {/* Calendar Body */}
              <div>
                {/* Day Names */}
                <div className="grid grid-cols-7 bg-[#f0e6d2]">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center font-medium text-[#8b1a1a]"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7">{renderCalendar()}</div>
              </div>

              {/* Legend */}
              <div className="p-4 bg-[#f8f3e9] border-t border-[#d4b483]/20">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#8b1a1a]/10 mr-2"></div>
                    <span className="text-sm text-[#5a3e36]">
                      National Holiday
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#d4b483]/20 mr-2"></div>
                    <span className="text-sm text-[#5a3e36]">
                      Religious Holiday
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 mr-2"></div>
                    <span className="text-sm text-[#5a3e36]">School Event</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-100 mr-2"></div>
                    <span className="text-sm text-[#5a3e36]">Examination</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Date Details */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 bg-white rounded-lg shadow-md border border-[#d4b483]/20 p-4"
                >
                  <div className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-4">
                      <Info className="h-5 w-5 text-[#8b1a1a]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-[#8b1a1a]">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h4>
                      {isHoliday(selectedDate) ? (
                        <div className="mt-2">
                          <p className="text-[#5a3e36]">
                            <span className="font-medium">
                              {getHolidayDetails(selectedDate)?.name}
                            </span>{" "}
                            -
                            {getHolidayType(selectedDate) === "national" &&
                              " National Holiday"}
                            {getHolidayType(selectedDate) === "religious" &&
                              " Religious Holiday"}
                            {getHolidayType(selectedDate) === "school" &&
                              " School Event"}
                            {getHolidayType(selectedDate) === "exam" &&
                              " Examination Period"}
                          </p>
                          {getHolidayDetails(selectedDate)?.description && (
                            <p className="text-sm text-[#5a3e36] mt-2">
                              {getHolidayDetails(selectedDate)?.description}
                            </p>
                          )}
                          {!getHolidayDetails(selectedDate)?.description && (
                            <p className="text-sm text-[#5a3e36] mt-2">
                              {getHolidayType(selectedDate) === "national" &&
                                "School will remain closed on this day."}
                              {getHolidayType(selectedDate) === "religious" &&
                                "Optional holiday for students of the respective religion."}
                              {getHolidayType(selectedDate) === "school" &&
                                "Special activities planned for students."}
                              {getHolidayType(selectedDate) === "exam" &&
                                "Students should prepare according to the exam schedule."}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-[#5a3e36] mt-2">
                          Regular school day. No special events scheduled.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
