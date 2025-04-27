"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  ChevronLeft,
  Search,
  Briefcase,
  GraduationCap,
  Filter,
  Loader2,
  Instagram,
  ExternalLink,
  MapPin,
  Award,
  X,
} from "lucide-react";

interface AlumniProfile {
  _id: string;
  name: string;
  graduationYear: string;
  currentPosition: string;
  company: string;
  achievement: string;
  instagramPostUrl?: string;
  category?: string;
  imageUrl?: string;
  active: boolean;
}

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<AlumniProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/achievements/alumni?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch alumni profiles");
      }

      const data = await res.json();
      const alumniData = Array.isArray(data) ? data : [];
      setAlumni(alumniData);
      setFilteredAlumni(alumniData);

      // Extract unique years and categories
      const uniqueYears = Array.from(
        new Set(alumniData.map((profile) => profile.graduationYear))
      )
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a)) as string[];

      const uniqueCategories = Array.from(
        new Set(alumniData.map((profile) => profile.category))
      )
        .filter(Boolean)
        .sort() as string[];

      setYears(uniqueYears);
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching alumni profiles:", err);
      setError("Failed to load alumni profiles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...alumni];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.currentPosition
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          profile.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.achievement.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (profile) => profile.graduationYear === selectedYear
      );
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter(
        (profile) => profile.category === selectedCategory
      );
    }

    setFilteredAlumni(results);
  }, [searchQuery, selectedYear, selectedCategory, alumni]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedCategory(null);
  };

  // Extract Instagram post ID from URL
  const getInstagramPostId = (url: string) => {
    // Handle different Instagram URL formats
    const regex = /\/p\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
              <Users size={32} className="mr-3 text-[#8b1a1a]" />
              Alumni Network
            </h1>
            <p className="text-gray-600 md:text-lg">
              Connect with our successful graduates making a difference in the
              world
            </p>
          </div>
        </div>

        {/* Enhanced Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10 border-l-4 border-[#8b1a1a]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alumni by name, position, company..."
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
              {(selectedYear || selectedCategory) && (
                <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                  {(selectedYear ? 1 : 0) + (selectedCategory ? 1 : 0)}
                </span>
              )}
            </button>

            {(searchQuery || selectedYear || selectedCategory) && (
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
              className="mt-6 pt-6 border-t border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                  <GraduationCap size={16} className="mr-2 text-[#8b1a1a]" />
                  Filter by Graduation Year
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

              {categories.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                    <MapPin size={16} className="mr-2 text-[#8b1a1a]" />
                    Filter by Field
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category ? null : category
                          )
                        }
                        className={`${
                          selectedCategory === category
                            ? "bg-[#8b1a1a] text-white"
                            : "bg-[#f8f3e9] text-gray-700 hover:bg-[#f0e6d2]"
                        } px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}
                      >
                        {category}
                        {selectedCategory === category && (
                          <span className="ml-1.5 text-white">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
              onClick={fetchAlumni}
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
                <Users size={20} className="text-[#8b1a1a] animate-pulse" />
              </div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">
              Loading alumni profiles...
            </p>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#f8f3e9] p-6 rounded-full">
                <Users size={40} className="text-[#8b1a1a]" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Alumni Profiles Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedYear || selectedCategory
                ? "No alumni match your current search criteria. Try adjusting your filters."
                : "Alumni profiles will be added soon. Please check back later."}
            </p>
            {(searchQuery || selectedYear || selectedCategory) && (
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAlumni.map((profile) => {
              const instagramPostId = profile.instagramPostUrl
                ? getInstagramPostId(profile.instagramPostUrl)
                : null;

              return (
                <motion.div
                  key={profile._id}
                  variants={fadeInUp}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-gray-100"
                >
                  <div className="p-5 border-b border-gray-100 flex items-start bg-gradient-to-r from-[#f8f3e9] to-white">
                    <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border-2 border-[#8b1a1a] shadow-sm">
                      {profile.imageUrl ? (
                        <Image
                          src={profile.imageUrl}
                          alt={profile.name}
                          width={48}
                          height={48}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-[#8b1a1a]/10 text-[#8b1a1a]">
                          <Users size={18} />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-bold text-gray-800 line-clamp-1">
                        {profile.name}
                      </h3>
                      <p className="text-[#8b1a1a] text-xs flex items-center">
                        <Briefcase size={12} className="mr-1 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {profile.currentPosition} at {profile.company}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Instagram Post Section */}
                  {instagramPostId && (
                    <div className="flex-grow relative bg-gray-50 border-b border-gray-100">
                      <div className="aspect-square w-full relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <Loader2
                            size={30}
                            className="animate-spin text-[#8b1a1a]/50"
                          />
                        </div>
                        <iframe
                          src={`https://www.instagram.com/p/${instagramPostId}/embed/captioned/`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          className="absolute inset-0 z-10"
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  )}

                  <div className="p-5 bg-white flex-grow">
                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-md">
                        <GraduationCap
                          size={12}
                          className="mr-1 text-[#8b1a1a]"
                        />
                        <span>Class of {profile.graduationYear}</span>
                      </div>

                      {profile.category && (
                        <div className="bg-gray-100 px-2 py-1 rounded-md flex items-center">
                          <MapPin size={12} className="mr-1 text-gray-500" />
                          <span className="line-clamp-1">
                            {profile.category}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#f8f3e9]/50 p-3 rounded-md mb-3 border border-[#f8f3e9]">
                      <div className="flex items-start mb-1">
                        <Award
                          size={14}
                          className="mr-1 mt-0.5 text-[#8b1a1a]"
                        />
                        <span className="text-xs font-medium text-[#8b1a1a]">
                          Achievement
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {profile.achievement}
                      </p>
                    </div>

                    {profile.instagramPostUrl && (
                      <a
                        href={profile.instagramPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#8b1a1a] hover:underline flex items-center mt-auto bg-gray-50 px-2 py-1.5 rounded-md w-fit"
                      >
                        <Instagram size={12} className="mr-1 flex-shrink-0" />
                        View on Instagram
                        <ExternalLink
                          size={10}
                          className="ml-1 flex-shrink-0"
                        />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
