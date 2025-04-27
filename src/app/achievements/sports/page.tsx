"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  ChevronLeft,
  Search,
  Calendar,
  Medal,
  Filter,
  Flag,
  Award,
  User,
  X,
  ArrowUp,
  Flame,
} from "lucide-react";

interface SportAchievement {
  _id: string;
  name: string;
  class: string;
  event: string;
  award: string;
  year: string;
  active: boolean;
}

export default function SportsAchievementsPage() {
  const [achievements, setAchievements] = useState<SportAchievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<
    SportAchievement[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/achievements/sports?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch sports achievements");
      }

      const data = await res.json();
      const achievementsData = Array.isArray(data) ? data : [];
      setAchievements(achievementsData);
      setFilteredAchievements(achievementsData);

      // Extract unique years and events
      const uniqueYears = Array.from(
        new Set(achievementsData.map((achievement) => achievement.year))
      )
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a)) as string[];

      const uniqueEvents = Array.from(
        new Set(achievementsData.map((achievement) => achievement.event))
      )
        .filter(Boolean)
        .sort() as string[];

      setYears(uniqueYears);
      setEvents(uniqueEvents);
    } catch (err) {
      console.error("Error fetching sports achievements:", err);
      setError("Failed to load sports achievements. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...achievements];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (achievement) =>
          achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.award.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.class.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (achievement) => achievement.year === selectedYear
      );
    }

    // Apply event filter
    if (selectedEvent) {
      results = results.filter(
        (achievement) => achievement.event === selectedEvent
      );
    }

    // Apply sort order
    results.sort((a, b) => {
      if (sortOrder === "desc") {
        return parseInt(b.year) - parseInt(a.year);
      } else {
        return parseInt(a.year) - parseInt(b.year);
      }
    });

    setFilteredAchievements(results);
  }, [searchQuery, selectedYear, selectedEvent, achievements, sortOrder]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedEvent(null);
  };

  // Get award class for styling
  const getAwardClass = (award: string) => {
    if (award.toLowerCase().includes("gold")) {
      return "bg-yellow-50 text-yellow-800 border-yellow-200";
    } else if (award.toLowerCase().includes("silver")) {
      return "bg-gray-50 text-gray-800 border-gray-200";
    } else if (award.toLowerCase().includes("bronze")) {
      return "bg-amber-50 text-amber-800 border-amber-200";
    } else if (award.toLowerCase().includes("first")) {
      return "bg-green-50 text-green-800 border-green-200";
    } else if (award.toLowerCase().includes("second")) {
      return "bg-blue-50 text-blue-800 border-blue-200";
    } else if (award.toLowerCase().includes("third")) {
      return "bg-orange-50 text-orange-800 border-orange-200";
    } else if (award.toLowerCase().includes("participant")) {
      return "bg-blue-50 text-blue-800 border-blue-200";
    } else {
      return "bg-purple-50 text-purple-800 border-purple-200";
    }
  };

  // Get award icon
  const getAwardIcon = (award: string) => {
    if (
      award.toLowerCase().includes("gold") ||
      award.toLowerCase().includes("first")
    ) {
      return <Medal className="h-4 w-4 text-yellow-500" />;
    } else if (
      award.toLowerCase().includes("silver") ||
      award.toLowerCase().includes("second")
    ) {
      return <Medal className="h-4 w-4 text-gray-400" />;
    } else if (
      award.toLowerCase().includes("bronze") ||
      award.toLowerCase().includes("third")
    ) {
      return <Medal className="h-4 w-4 text-amber-600" />;
    } else if (award.toLowerCase().includes("participant")) {
      return <Flag className="h-4 w-4 text-blue-500" />;
    } else {
      return <Award className="h-4 w-4 text-purple-500" />;
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/achievements"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 group"
          >
            <div className="bg-white rounded-full p-1.5 shadow-sm mr-2 group-hover:-translate-x-1 transition-transform">
              <ChevronLeft size={16} className="text-[#8b1a1a]" />
            </div>
            <span className="font-medium">Back to Achievements</span>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-3 flex items-center">
              <Trophy size={36} className="mr-3 text-[#8b1a1a]" />
              Sports Achievements
            </h1>
            <p className="text-gray-600 md:text-lg">
              Celebrating our student&apos;s excellence in sports competitions
            </p>
          </div>
        </div>

        {/* Enhanced Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10 border-l-4 border-[#8b1a1a] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#8b1a1a]/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, event, or award..."
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:inline-flex items-center px-4 py-2.5 bg-[#f8f3e9] border border-[#d4b483] rounded-md shadow-sm text-sm font-medium text-[#8b1a1a] hover:bg-[#f0e6d2] transition-colors"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {(selectedYear || selectedEvent) && (
                <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                  {(selectedYear ? 1 : 0) + (selectedEvent ? 1 : 0)}
                </span>
              )}
            </button>

            {(searchQuery || selectedYear || selectedEvent) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100"
              >
                <X size={14} className="mr-1.5" />
                Clear Filters
              </button>
            )}
          </div>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
            >
              <div>
                <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                  <Calendar size={16} className="mr-2 text-[#8b1a1a]" />
                  Filter by Year
                </h3>
                <div className="flex flex-wrap gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() =>
                        setSelectedYear(selectedYear === year ? null : year)
                      }
                      className={`${
                        selectedYear === year
                          ? "bg-[#8b1a1a] text-white"
                          : "bg-[#f8f3e9] text-gray-700 hover:bg-[#f0e6d2]"
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}
                    >
                      {year}
                      {selectedYear === year && (
                        <span className="ml-1.5 text-white">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                  <Flag size={16} className="mr-2 text-[#8b1a1a]" />
                  Filter by Event
                </h3>
                <div className="flex flex-wrap gap-2">
                  {events.map((event) => (
                    <button
                      key={event}
                      onClick={() =>
                        setSelectedEvent(selectedEvent === event ? null : event)
                      }
                      className={`${
                        selectedEvent === event
                          ? "bg-[#8b1a1a] text-white"
                          : "bg-[#f8f3e9] text-gray-700 hover:bg-[#f0e6d2]"
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}
                    >
                      {event}
                      {selectedEvent === event && (
                        <span className="ml-1.5 text-white">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-md mb-6">
            <p className="flex items-center">
              <span className="bg-red-100 p-1 rounded-full mr-2">
                <X size={16} className="text-red-500" />
              </span>
              {error}
            </p>
            <button
              onClick={fetchAchievements}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#f0e6d2] border-t-[#8b1a1a] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Trophy size={20} className="text-[#8b1a1a] animate-pulse" />
              </div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">
              Loading sports achievements...
            </p>
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#f8f3e9] p-6 rounded-full">
                <Trophy size={40} className="text-[#8b1a1a]" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Sports Achievements Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedYear || selectedEvent
                ? "No achievements match your current search criteria. Try adjusting your filters."
                : "Sports achievements will be added soon. Please check back later."}
            </p>
            {(searchQuery || selectedYear || selectedEvent) && (
              <button
                onClick={resetFilters}
                className="mt-6 px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#a52a2a] transition-colors inline-flex items-center"
              >
                <X size={16} className="mr-2" />
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border border-gray-100">
              <div className="p-4 bg-[#f8f3e9] border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#8b1a1a] flex items-center">
                  <Trophy size={20} className="mr-2" />
                  Sports Achievement Records
                </h2>

                <button
                  onClick={toggleSortOrder}
                  className="flex items-center text-gray-700 bg-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <Calendar size={14} className="mr-1.5" />
                  Sort by Year
                  <ArrowUp
                    size={14}
                    className={`ml-1.5 transition-transform duration-300 ${
                      sortOrder === "asc" ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Student Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Class
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Award
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAchievements.map((achievement, index) => (
                      <tr
                        key={achievement._id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-[#f8f3e9]/50 transition-colors`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-[#f8f3e9] rounded-full flex items-center justify-center text-[#8b1a1a]">
                              <User size={16} />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {achievement.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
                            {achievement.class}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium">
                            {achievement.event}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1.5 inline-flex items-center text-sm font-semibold rounded-full border ${getAwardClass(
                              achievement.award
                            )}`}
                          >
                            <span className="mr-1.5">
                              {getAwardIcon(achievement.award)}
                            </span>
                            {achievement.award}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-md w-fit">
                            <Calendar
                              size={14}
                              className="mr-1.5 text-[#8b1a1a]"
                            />
                            {achievement.year}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="py-4 px-6 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-700 flex items-center">
                  <Trophy size={16} className="mr-2 text-[#8b1a1a]" />
                  Showing{" "}
                  <span className="font-medium mx-1">
                    {filteredAchievements.length}
                  </span>{" "}
                  achievements
                  {(searchQuery || selectedYear || selectedEvent) &&
                    " with applied filters"}
                </div>
              </div>
            </div>

            {/* Championship Highlights Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mt-16 bg-white rounded-lg shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="bg-[#8b1a1a] p-3 rounded-full shadow-md mr-3">
                  <Medal size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#8b1a1a] md:text-center">
                  Championship Highlights
                </h2>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <motion.div
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg text-center border border-yellow-200 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                  <div className="bg-yellow-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Trophy size={28} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    National Taekwondo Championship
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Multiple medals in various categories
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200 w-fit mx-auto">
                    <Calendar size={14} className="mr-1.5" />
                    2023
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center border border-blue-200 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                  <div className="bg-blue-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Trophy size={28} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    State Chess Tournament
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Champions in junior category
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200 w-fit mx-auto">
                    <Calendar size={14} className="mr-1.5" />
                    2022
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center border border-green-200 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                  <div className="bg-green-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Trophy size={28} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Inter-School Cricket Tournament
                  </h3>
                  <p className="text-gray-600 mb-3">
                    School team secured first place
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full border border-green-200 w-fit mx-auto">
                    <Calendar size={14} className="mr-1.5" />
                    2023
                  </div>
                </motion.div>
              </motion.div>

              {/* Call to action */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center bg-[#8b1a1a]/10 text-[#8b1a1a] px-4 py-2 rounded-full text-sm font-medium">
                  <Flame size={16} className="mr-2" />
                  Join our sports teams and become the next champion!
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
