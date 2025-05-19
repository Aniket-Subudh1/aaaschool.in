"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarIcon, Info, Calendar as CalendarRange } from "lucide-react";
import Earth from "@/components/ui/globe";

interface Holiday {
  _id?: string;
  date: string;
  endDate?: string; 
  name: string;
  type: "national" | "religious" | "school" | "exam" | "other";
  customType?: string; 
  description?: string;
  active?: boolean;
}

export default function SchoolCalendar() {
  // Set current month and year by default
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDateHighlighted, setCurrentDateHighlighted] = useState(true);

  useEffect(() => {
    // Set today's date as selected by default
    const todayFormatted = formatDateString(today);
    setSelectedDate(todayFormatted);
    
    fetchHolidays();
  }, []);

  // When month/year changes, fetch holidays for that specific period
  useEffect(() => {
    fetchHolidays(currentMonth + 1, currentYear);
  }, [currentMonth, currentYear]);

  const formatDateString = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const fetchHolidays = async (month?: number, year?: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // Build query params for filtering by month and year if provided
      let url = "/api/holidays?active=true&format=raw";
      if (month && year) {
        url += `&month=${month}&year=${year}`;
      }

      const res = await fetch(url);
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
    setCurrentDateHighlighted(false);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setCurrentDateHighlighted(false);
  };

  const goToCurrentMonth = () => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
    setCurrentDateHighlighted(true);
    // Also select today's date
    const todayFormatted = formatDateString(now);
    setSelectedDate(todayFormatted);
  };

  // Check if a given date has a holiday
  const isHoliday = (dateString: string) => {
    return holidays.find((holiday) => {
      // Check if the date matches exactly
      if (holiday.date === dateString) return true;
      
      // If holiday has a date range, check if the date is within the range
      if (holiday.endDate && holiday.date <= dateString && dateString <= holiday.endDate) {
        return true;
      }
      
      return false;
    });
  };

  // Get the holiday type for a given date
  const getHolidayType = (dateString: string) => {
    const holiday = holidays.find((holiday) => {
      if (holiday.date === dateString) return true;
      
      if (holiday.endDate && holiday.date <= dateString && dateString <= holiday.endDate) {
        return true;
      }
      
      return false;
    });
    
    return holiday ? holiday.type : null;
  };

  // Get holiday details for a given date
  const getHolidayDetails = (dateString: string) => {
    return holidays.find((holiday) => {
      if (holiday.date === dateString) return true;
      
      if (holiday.endDate && holiday.date <= dateString && dateString <= holiday.endDate) {
        return true;
      }
      
      return false;
    });
  };

  // Get a user-friendly label for a holiday type
  const getHolidayTypeLabel = (type: string, customType?: string) => {
    if (type === 'other' && customType) {
      return customType;
    }
    
    const types: Record<string, string> = {
      'national': 'National Holiday',
      'religious': 'Religious Holiday',
      'school': 'School Event',
      'exam': 'Examination',
      'other': 'Other'
    };
    
    return types[type] || type;
  };

  // Check if a date is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
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
      const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
      const prevMonthDay = daysInPrevMonth - firstDayOfMonth + i + 1;
      
      const prevMonthDateString = `${prevMonthYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(prevMonthDay).padStart(2, "0")}`;
      const isPrevMonthHoliday = isHoliday(prevMonthDateString);
      
      days.push(
        <div
          key={`empty-${i}`}
          className={`h-14 md:h-20 p-1 text-center text-gray-500 border border-[#d4b483]/10 ${
            isPrevMonthHoliday ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedDate(prevMonthDateString)}
        >
          <span className="text-sm md:text-base">
            {prevMonthDay}
          </span>
          {isPrevMonthHoliday && (
            <div className="mt-auto">
              <div className="text-xs truncate text-gray-400">
                {getHolidayDetails(prevMonthDateString)?.name}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const holiday = isHoliday(dateString);
      const holidayType = getHolidayType(dateString);
      const holidayDetails = getHolidayDetails(dateString);

      let bgColor = "";
      if (holidayType === "national") bgColor = "bg-[#8b1a1a]/10";
      else if (holidayType === "religious") bgColor = "bg-[#d4b483]/20";
      else if (holidayType === "school") bgColor = "bg-green-100";
      else if (holidayType === "exam") bgColor = "bg-blue-100";
      else if (holidayType === "other") bgColor = "bg-purple-100";

      const todayClass = isToday(day) && currentDateHighlighted
        ? "ring-2 ring-blue-500 bg-blue-50"
        : "";

      days.push(
        <div
          key={day}
          className={`h-14 md:h-20 p-1 text-center border border-[#d4b483]/10 relative cursor-pointer transition-colors hover:bg-[#f0e6d2] ${bgColor} ${
            selectedDate === dateString ? "ring-2 ring-[#8b1a1a]" : todayClass
          }`}
          onClick={() => setSelectedDate(dateString)}
        >
          <div className="flex flex-col h-full">
            <span className={`text-base md:text-lg font-medium ${isToday(day) && currentDateHighlighted ? "text-blue-700" : ""}`}>
              {day}
            </span>
            {holiday && (
              <div className="mt-auto">
                <div className="text-xs md:text-sm truncate text-[#8b1a1a] font-medium">
                  {holidayDetails?.name}
                </div>
              </div>
            )}
          </div>
          {holiday && (
            <div className="absolute bottom-0 right-0 w-0 h-0 border-8 border-transparent border-b-[#8b1a1a] border-r-[#8b1a1a]"></div>
          )}
          {holidayDetails?.endDate && holidayDetails.date !== holidayDetails.endDate && (
            <div className="absolute top-0 right-0">
              <CalendarRange size={10} className="text-[#8b1a1a]" />
            </div>
          )}
        </div>
      );
    }

    // Add empty cells for days after the last day of the month
    const totalCells = days.length;
    const cellsToAdd = 42 - totalCells; // Always make it a 6x7 grid
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    
    for (let i = 1; i <= cellsToAdd; i++) {
      const nextMonthDateString = `${nextMonthYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const isNextMonthHoliday = isHoliday(nextMonthDateString);
      
      days.push(
        <div
          key={`next-${i}`}
          className={`h-14 md:h-20 p-1 text-center text-gray-500 border border-[#d4b483]/10 ${
            isNextMonthHoliday ? "bg-gray-100" : ""
          }`}
          onClick={() => setSelectedDate(nextMonthDateString)}
        >
          <span className="text-sm md:text-base">{i}</span>
          {isNextMonthHoliday && (
            <div className="mt-auto">
              <div className="text-xs truncate text-gray-400">
                {getHolidayDetails(nextMonthDateString)?.name}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Return the days grid
    return <div className="grid grid-cols-7">{days}</div>;
  };

  // Format date for display in the selected date details
  const formatSelectedDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
               Global Learning Methodologies
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
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <h3 className="text-xl font-medium mx-4">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={goToCurrentMonth}
                    className={`px-3 py-1 rounded-md text-sm hover:bg-white/10 ${
                      isToday(today.getDate()) && currentDateHighlighted
                        ? "bg-white text-[#8b1a1a]"
                        : ""
                    }`}
                  >
                    Today
                  </button>
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
                {renderCalendar()}
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
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-purple-100 mr-2"></div>
                    <span className="text-sm text-[#5a3e36]">Other Event</span>
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
                        {formatSelectedDate(selectedDate)}
                        {isToday(new Date(selectedDate).getDate()) && 
                         currentMonth === new Date(selectedDate).getMonth() && 
                         currentYear === new Date(selectedDate).getFullYear() && (
                          <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Today
                          </span>
                        )}
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
                            {getHolidayType(selectedDate) === "other" && 
                              ` ${getHolidayTypeLabel('other', getHolidayDetails(selectedDate)?.customType)}`}
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
                              {getHolidayType(selectedDate) === "other" &&
                                "Please check with school administration for more details."}
                            </p>
                          )}
                          
                          {/* Show date range info if applicable */}
                          {getHolidayDetails(selectedDate)?.endDate && 
                           getHolidayDetails(selectedDate)?.date !== getHolidayDetails(selectedDate)?.endDate && (
                            <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                              <p className="text-sm text-gray-700 flex items-center">
                                <CalendarRange size={14} className="mr-1 text-[#8b1a1a]" />
                                This is a multi-day event from{" "}
                                <span className="font-medium mx-1">
                                  {new Date(getHolidayDetails(selectedDate)?.date || "").toLocaleDateString()}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium mx-1">
                                  {new Date(getHolidayDetails(selectedDate)?.endDate || "").toLocaleDateString()}
                                </span>
                              </p>
                            </div>
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