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
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Achievements
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#8b1a1a] mb-2">
              Alumni Network
            </h1>
            <p className="text-gray-600">
              Connect with our successful graduates making a difference in the
              world
            </p>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
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
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {categories.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-3">
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
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md mb-6">
            <p>{error}</p>
            <button
              onClick={fetchAlumni}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={40} className="animate-spin text-[#8b1a1a] mb-4" />
            <p className="text-gray-600">Loading alumni profiles...</p>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Alumni Profiles Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedYear || selectedCategory
                ? "No alumni match your current search criteria. Try adjusting your filters."
                : "Alumni profiles will be added soon. Please check back later."}
            </p>
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
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                >
                  <div className="p-4 border-b border-gray-100 flex items-start">
                    <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                      {profile.imageUrl ? (
                        <Image
                          src={profile.imageUrl}
                          alt={profile.name}
                          width={40}
                          height={40}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-[#8b1a1a]/10 text-[#8b1a1a]">
                          <Users size={16} />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
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
                    <div className="flex-grow relative bg-gray-50">
                      <div className="aspect-square w-full">
                        <iframe
                          src={`https://www.instagram.com/p/${instagramPostId}/embed/captioned/`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency={true}
                          className="absolute inset-0"
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-white flex-grow">
                    <div className="mb-2 flex items-center text-xs text-gray-500">
                      <GraduationCap size={12} className="mr-1 flex-shrink-0" />
                      <span>Class of {profile.graduationYear}</span>
                      {profile.category && (
                        <>
                          <span className="mx-1">•</span>
                          <span className="line-clamp-1">
                            {profile.category}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {profile.achievement}
                    </p>

                    {profile.instagramPostUrl && (
                      <a
                        href={profile.instagramPostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#8b1a1a] hover:underline flex items-center mt-auto"
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
