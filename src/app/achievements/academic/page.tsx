// src/app/achievements/academic/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  ChevronLeft,
  Search,
  Calendar,
  Award,
  Filter,
  X,
  User,
  Book,
  Star,
} from "lucide-react";

interface AcademicAchievement {
  _id: string;
  name: string;
  class: string;
  photoUrl?: string;
  marks: number;
  stream: string;
  achievement: string;
  year: string;
  active: boolean;
}

export default function AcademicAchievementsPage() {
  const [achievements, setAchievements] = useState<AcademicAchievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<AcademicAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [streams, setStreams] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/achievements/academic?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch academic achievements");
      }

      const data = await res.json();
      const achievementsData = Array.isArray(data) ? data : [];
      setAchievements(achievementsData);
      setFilteredAchievements(achievementsData);

      // Extract unique years and streams
      const uniqueYears = Array.from(
        new Set(achievementsData.map((achievement) => achievement.year))
      )
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a)) as string[];

      const uniqueStreams = Array.from(
        new Set(achievementsData.map((achievement) => achievement.stream))
      )
        .filter(Boolean)
        .sort() as string[];

      setYears(uniqueYears);
      setStreams(uniqueStreams);
    } catch (err) {
      console.error("Error fetching academic achievements:", err);
      setError("Failed to load academic achievements. Please try again later.");
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
          achievement.achievement.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.stream.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.class.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (achievement) => achievement.year === selectedYear
      );
    }

    // Apply stream filter
    if (selectedStream) {
      results = results.filter(
        (achievement) => achievement.stream === selectedStream
      );
    }

    // Apply sort order
    results.sort((a, b) => {
      if (sortOrder === "desc") {
        return b.marks - a.marks; // Sort by marks descending
      } else {
        return a.marks - b.marks; // Sort by marks ascending
      }
    });

    setFilteredAchievements(results);
  }, [searchQuery, selectedYear, selectedStream, achievements, sortOrder]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedStream(null);
  };

  // Get achievement class for styling based on marks
  const getAchievementClass = (marks: number) => {
    if (marks >= 95) {
      return "bg-yellow-50 text-yellow-800 border-yellow-200";
    } else if (marks >= 90) {
      return "bg-green-50 text-green-800 border-green-200";
    } else if (marks >= 85) {
      return "bg-blue-50 text-blue-800 border-blue-200";
    } else if (marks >= 80) {
      return "bg-purple-50 text-purple-800 border-purple-200";
    } else {
      return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  // Get achievement icon based on marks
  const getAchievementIcon = (marks: number) => {
    if (marks >= 95) {
      return <Star className="h-4 w-4 text-yellow-500" />;
    } else if (marks >= 90) {
      return <Award className="h-4 w-4 text-green-500" />;
    } else if (marks >= 85) {
      return <GraduationCap className="h-4 w-4 text-blue-500" />;
    } else {
      return <Book className="h-4 w-4 text-purple-500" />;
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
              <GraduationCap size={36} className="mr-3 text-[#8b1a1a]" />
              Academic Achievements
            </h1>
            <p className="text-gray-600 md:text-lg">
              Celebrating our students&apos; academic excellence and outstanding performance
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
                placeholder="Search by name, achievement, or stream..."
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
              {(selectedYear || selectedStream) && (
                <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                  {(selectedYear ? 1 : 0) + (selectedStream ? 1 : 0)}
                </span>
              )}
            </button>

            {(searchQuery || selectedYear || selectedStream) && (
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
                  <Book size={16} className="mr-2 text-[#8b1a1a]" />
                  Filter by Stream
                </h3>
                <div className="flex flex-wrap gap-2">
                  {streams.map((stream) => (
                    <button
                      key={stream}
                      onClick={() =>
                        setSelectedStream(selectedStream === stream ? null : stream)
                      }
                      className={`${
                        selectedStream === stream
                          ? "bg-[#8b1a1a] text-white"
                          : "bg-[#f8f3e9] text-gray-700 hover:bg-[#f0e6d2]"
                      } px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}
                    >
                      {stream}
                      {selectedStream === stream && (
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
                <GraduationCap size={20} className="text-[#8b1a1a] animate-pulse" />
              </div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">
              Loading academic achievements...
            </p>
          </div>
        ) : filteredAchievements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#f8f3e9] p-6 rounded-full">
                <GraduationCap size={40} className="text-[#8b1a1a]" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Academic Achievements Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedYear || selectedStream
                ? "No achievements match your current search criteria. Try adjusting your filters."
                : "Academic achievements will be added soon. Please check back later."}
            </p>
            {(searchQuery || selectedYear || selectedStream) && (
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
                  <GraduationCap size={20} className="mr-2" />
                  Academic Excellence Records
                </h2>

                <button
                  onClick={toggleSortOrder}
                  className="flex items-center text-gray-700 bg-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <Award size={14} className="mr-1.5" />
                  Sort by Marks
                  <span className={`ml-1.5 transition-transform duration-300 ${
                    sortOrder === "asc" ? "rotate-180" : "rotate-0"
                  }`}>
                    ↓
                  </span>
                </button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6"
              >
                {filteredAchievements.map((achievement) => (
                  <motion.div
                    key={achievement._id}
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    {/* Photo Section */}
                    <div className="relative h-64 w-full overflow-hidden">
                      {achievement.photoUrl ? (
                        <Image
                          src={achievement.photoUrl}
                          alt={achievement.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#8b1a1a]/10 to-[#8b1a1a]/5">
                          <User size={64} className="text-[#8b1a1a]/30" />
                        </div>
                      )}
                      
                      {/* Percentage Overlay */}
                      <div className="absolute top-4 right-4">
                        <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                          achievement.marks >= 95 ? 'bg-yellow-500 border-yellow-300 shadow-yellow-200' :
                          achievement.marks >= 90 ? 'bg-green-500 border-green-300 shadow-green-200' :
                          achievement.marks >= 85 ? 'bg-blue-500 border-blue-300 shadow-blue-200' :
                          achievement.marks >= 80 ? 'bg-purple-500 border-purple-300 shadow-purple-200' :
                          'bg-gray-500 border-gray-300 shadow-gray-200'
                        } shadow-lg`}>
                          <div className="text-center">
                            <div className="text-white font-bold text-sm leading-none">
                              {achievement.marks}%
                            </div>
                            <div className="text-white text-xs font-medium">
                              
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stream Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                          {achievement.stream}
                        </div>
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {achievement.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-[#8b1a1a] text-sm flex items-center">
                            <GraduationCap size={14} className="mr-1" />
                            Class {achievement.class}
                          </p>
                          <div className="bg-[#f8f3e9] px-2 py-1 rounded-md flex items-center">
                            <Calendar size={12} className="mr-1 text-[#8b1a1a]" />
                            <span className="text-xs text-[#8b1a1a] font-medium">{achievement.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Achievement Level Badge */}
                      <div className="mb-4">
                        <span
                          className={`px-4 py-2 inline-flex items-center text-sm font-semibold rounded-full border-2 ${getAchievementClass(
                            achievement.marks
                          )}`}
                        >
                          {getAchievementIcon(achievement.marks)}
                          <span className="ml-2">
                            {achievement.marks >= 95 ? 'Outstanding Excellence' :
                             achievement.marks >= 90 ? 'High Distinction' :
                             achievement.marks >= 85 ? 'Distinction' :
                             achievement.marks >= 80 ? 'Merit' :
                             'Achievement'}
                          </span>
                        </span>
                      </div>

                      {/* Achievement Description */}
                      <div className="bg-gradient-to-br from-[#f8f3e9]/50 to-[#f8f3e9]/20 p-4 rounded-lg border border-[#f8f3e9]">
                        <div className="flex items-start mb-2">
                          <Star size={16} className="mr-2 mt-0.5 text-[#8b1a1a] flex-shrink-0" />
                          <span className="text-sm font-semibold text-[#8b1a1a]">
                            Achievement Details
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {achievement.achievement}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="py-4 px-6 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-700 flex items-center">
                  <GraduationCap size={16} className="mr-2 text-[#8b1a1a]" />
                  Showing{" "}
                  <span className="font-medium mx-1">
                    {filteredAchievements.length}
                  </span>{" "}
                  achievements
                  {(searchQuery || selectedYear || selectedStream) &&
                    " with applied filters"}
                </div>
              </div>
            </div>

            {/* Top Performers Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="mt-16 bg-white rounded-lg shadow-md p-8 border border-gray-100"
            >
              <div className="flex items-center justify-center mb-8">
                <div className="bg-[#8b1a1a] p-3 rounded-full shadow-md mr-3">
                  <Star size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#8b1a1a] md:text-center">
                  Academic Excellence Highlights
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
                    <Star size={28} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    95%+ Achievers
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Outstanding academic performance with distinction
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200 w-fit mx-auto">
                    <Award size={14} className="mr-1.5" />
                    Excellence
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center border border-green-200 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                  <div className="bg-green-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap size={28} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Subject Toppers
                  </h3>
                  <p className="text-gray-600 mb-3">
                    First position holders in various subjects
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full border border-green-200 w-fit mx-auto">
                    <Book size={14} className="mr-1.5" />
                    Mastery
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center border border-blue-200 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
                >
                  <div className="bg-blue-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Award size={28} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Merit Certificates
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Recognition for consistent academic performance
                  </p>
                  <div className="flex items-center justify-center text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full border border-blue-200 w-fit mx-auto">
                    <User size={14} className="mr-1.5" />
                    Recognition
                  </div>
                </motion.div>
              </motion.div>

              {/* Call to action */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center bg-[#8b1a1a]/10 text-[#8b1a1a] px-4 py-2 rounded-full text-sm font-medium">
                  <GraduationCap size={16} className="mr-2" />
                  Strive for academic excellence and join our achievers!
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}