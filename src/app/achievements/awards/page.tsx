"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  ChevronLeft,
  Search,
  Filter,
  Loader2,
} from "lucide-react";

interface AwardItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
  recipient: string;
  active: boolean;
}

export default function AwardsPage() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [filteredAwards, setFilteredAwards] = useState<AwardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/achievements/awards?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch awards");
      }

      const data = await res.json();
      const awardsData = Array.isArray(data) ? data : [];
      setAwards(awardsData);
      setFilteredAwards(awardsData);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(awardsData.map((award) => award.category))
      ).filter(Boolean) as string[];

      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching awards:", err);
      setError("Failed to load awards. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...awards];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (award) =>
          award.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          award.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          award.recipient.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter((award) => award.category === selectedCategory);
    }

    setFilteredAwards(results);
  }, [searchQuery, selectedCategory, awards]);

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
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
              Awards & Recognition
            </h1>
            <p className="text-gray-600">
              Celebrating excellence and achievements at Aryavart Ancient
              Academy
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
                placeholder="Search awards by title, description or recipient..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {selectedCategory && (
                <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                  1
                </span>
              )}
            </button>

            {(searchQuery || selectedCategory) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-200"
              >
                Clear Filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">
                Filter by Category
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md mb-6">
            <p>{error}</p>
            <button
              onClick={fetchAwards}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 size={40} className="animate-spin text-[#8b1a1a] mb-4" />
            <p className="text-gray-600">Loading awards...</p>
          </div>
        ) : filteredAwards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Award size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Awards Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedCategory
                ? "No awards match your current search criteria. Try adjusting your filters."
                : "Awards and recognition will be added soon. Please check back later."}
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAwards.map((award) => (
              <motion.div
                key={award._id}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={award.imageUrl}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {award.category && (
                    <div className="absolute top-4 right-4 bg-[#8b1a1a] text-white text-xs px-2 py-1 rounded-full">
                      {award.category}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {award.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {award.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(award.date)}
                    </div>
                    {award.recipient && (
                      <div className="text-sm font-medium text-[#8b1a1a]">
                        {award.recipient}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
