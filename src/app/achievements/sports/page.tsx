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
  Loader2,
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

    setFilteredAchievements(results);
  }, [searchQuery, selectedYear, selectedEvent, achievements]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedEvent(null);
  };

  // Get award class for styling
  const getAwardClass = (award: string) => {
    if (award.toLowerCase().includes("gold")) {
      return "bg-yellow-100 text-yellow-800";
    } else if (award.toLowerCase().includes("silver")) {
      return "bg-gray-100 text-gray-800";
    } else if (award.toLowerCase().includes("bronze")) {
      return "bg-amber-100 text-amber-800";
    } else if (award.toLowerCase().includes("participant")) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-green-100 text-green-800";
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

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/achievements"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Achievements
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#8b1a1a] mb-2">
              Sports Achievements
            </h1>
            <p className="text-gray-600">
              Celebrating our student&apos;s excellence in sports competitions
            </p>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, event, or award..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-200"
              >
                Clear Filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">
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
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">
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
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                    >
                      {event}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md mb-6">
            <p>{error}</p>
            <button
              onClick={fetchAchievements}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={40} className="animate-spin text-[#8b1a1a] mb-4" />
            <p className="text-gray-600">Loading sports achievements...</p>
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Sports Achievements Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedYear || selectedEvent
                ? "No achievements match your current search criteria. Try adjusting your filters."
                : "Sports achievements will be added soon. Please check back later."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {achievement.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {achievement.class}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {achievement.event}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAwardClass(
                            achievement.award
                          )}`}
                        >
                          {achievement.award}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          {achievement.year}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="py-4 px-6 bg-gray-50 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {filteredAchievements.length}
                </span>{" "}
                achievements
                {(searchQuery || selectedYear || selectedEvent) &&
                  " with applied filters"}
              </div>
            </div>
          </div>
        )}

        {/* Championship Highlights Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center mb-8">
            <Medal size={28} className="text-[#8b1a1a] mr-3" />
            <h2 className="text-2xl font-bold text-[#8b1a1a]">
              Championship Highlights
            </h2>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-yellow-50 p-6 rounded-lg text-center border border-yellow-200"
            >
              <div className="text-yellow-500 mb-2">
                <Trophy size={36} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                National Taekwondo Championship
              </h3>
              <p className="text-gray-600 mb-3">
                Multiple medals in various categories
              </p>
              <div className="text-sm font-medium text-yellow-600">2021</div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200"
            >
              <div className="text-blue-500 mb-2">
                <Trophy size={36} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                State Chess Tournament
              </h3>
              <p className="text-gray-600 mb-3">Champions in junior category</p>
              <div className="text-sm font-medium text-blue-600">2022</div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-green-50 p-6 rounded-lg text-center border border-green-200"
            >
              <div className="text-green-500 mb-2">
                <Trophy size={36} className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Inter-School Cricket Tournament
              </h3>
              <p className="text-gray-600 mb-3">
                School team secured first place
              </p>
              <div className="text-sm font-medium text-green-600">2023</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
