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
  X,
  Star,
  User,
  Trophy,
  Medal,
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
  const [selectedAward, setSelectedAward] = useState<AwardItem | null>(null);

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

  // Open award modal
  const openAwardModal = (award: AwardItem) => {
    setSelectedAward(award);
    document.body.style.overflow = "hidden";
  };

  // Close award modal
  const closeAwardModal = () => {
    setSelectedAward(null);
    document.body.style.overflow = "auto";
  };

  // Get category accent color
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      Academic: "bg-blue-600",
      Sports: "bg-emerald-600",
      Cultural: "bg-purple-600",
      Leadership: "bg-amber-600",
      Innovation: "bg-indigo-600",
      Service: "bg-pink-600",
    };

    return colorMap[category] || "bg-[#8b1a1a]";
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case "academic":
        return <Award size={16} className="text-blue-600" />;
      case "sports":
        return <Trophy size={16} className="text-emerald-600" />;
      case "leadership":
        return <Star size={16} className="text-amber-600" />;
      default:
        return <Medal size={16} className="text-[#8b1a1a]" />;
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2,
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
              <Award size={36} className="mr-3 text-[#8b1a1a]" />
              Awards & Recognition
            </h1>
            <p className="text-gray-600 md:text-lg">
              Celebrating excellence and achievements at Aryavart Ancient
              Academy
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
                placeholder="Search awards by title, description or recipient..."
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
              {selectedCategory && (
                <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                  1
                </span>
              )}
            </button>

            {(searchQuery || selectedCategory) && (
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
              className="mt-6 pt-6 border-t border-dashed border-gray-200 relative z-10"
            >
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Award size={16} className="mr-2 text-[#8b1a1a]" />
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
                        : "bg-[#f8f3e9] text-gray-700 hover:bg-[#f0e6d2]"
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center`}
                  >
                    {getCategoryIcon(category)}
                    <span className="ml-1.5">{category}</span>
                    {selectedCategory === category && (
                      <span className="ml-1.5 text-white">✓</span>
                    )}
                  </button>
                ))}
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
              onClick={fetchAwards}
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
                <Award size={20} className="text-[#8b1a1a] animate-pulse" />
              </div>
            </div>
            <p className="text-gray-600 mt-4 font-medium">Loading awards...</p>
          </div>
        ) : filteredAwards.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-100">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#f8f3e9] p-6 rounded-full">
                <Award size={40} className="text-[#8b1a1a]" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Awards Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchQuery || selectedCategory
                ? "No awards match your current search criteria. Try adjusting your filters."
                : "Awards and recognition will be added soon. Please check back later."}
            </p>
            {(searchQuery || selectedCategory) && (
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAwards.map((award) => (
              <motion.div
                key={award._id}
                variants={fadeInUp}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
                onClick={() => openAwardModal(award)}
              >
                <div className="relative h-48">
                  <Image
                    src={award.imageUrl}
                    alt={award.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none"></div>

                  {award.category && (
                    <div
                      className={`absolute top-4 right-4 ${getCategoryColor(
                        award.category
                      )} text-white text-xs px-3 py-1.5 rounded-full shadow-md flex items-center`}
                    >
                      {getCategoryIcon(award.category)}
                      <span className="ml-1">{award.category}</span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center mb-1">
                      <div className="bg-white/20 backdrop-blur-sm p-1 rounded-full mr-2">
                        <Award size={14} className="text-white" />
                      </div>
                      <p className="text-white text-xs font-medium">AWARD</p>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {award.title}
                    </h3>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-white to-[#f8f3e9]/30">
                  <p className="text-gray-700 mb-4 line-clamp-2 h-10">
                    {award.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                      <Calendar size={14} className="mr-1 text-[#8b1a1a]" />
                      {formatDate(award.date)}
                    </div>
                    {award.recipient && (
                      <div className="flex items-center text-sm font-medium text-[#8b1a1a] bg-[#f8f3e9] px-2 py-1 rounded-md">
                        <User size={14} className="mr-1" />
                        {award.recipient}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Award Detail Modal */}
        {selectedAward && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeAwardModal}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedAward.imageUrl}
                  alt={selectedAward.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <button
                  onClick={closeAwardModal}
                  className="absolute top-4 right-4 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {selectedAward.category && (
                    <div
                      className={`${getCategoryColor(
                        selectedAward.category
                      )} text-white text-xs px-3 py-1.5 rounded-full w-fit mb-2 flex items-center`}
                    >
                      {getCategoryIcon(selectedAward.category)}
                      <span className="ml-1">{selectedAward.category}</span>
                    </div>
                  )}
                  <h2 className="text-2xl font-bold text-white">
                    {selectedAward.title}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center bg-[#f8f3e9] px-3 py-1.5 rounded-md">
                    <Calendar size={16} className="mr-1.5 text-[#8b1a1a]" />
                    <span className="text-gray-700">
                      {formatDate(selectedAward.date)}
                    </span>
                  </div>

                  {selectedAward.recipient && (
                    <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-md">
                      <User size={16} className="mr-1.5 text-gray-600" />
                      <span className="text-gray-700">
                        {selectedAward.recipient}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-[#f8f3e9]/40 p-4 rounded-lg border border-[#f8f3e9] mb-6">
                  <h3 className="text-[#8b1a1a] font-medium mb-2 flex items-center">
                    <Award size={16} className="mr-2" />
                    Description
                  </h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedAward.description}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeAwardModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
