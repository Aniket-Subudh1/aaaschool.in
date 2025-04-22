"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  CalendarDays,
  Search,
  CheckCircle,
  Filter,
  X,
  Loader2,
  Eye,
  Download,
  ExternalLink,
} from "lucide-react";
import GalleryLayout from "../GalleryLayout";

type NewsBulletin = {
  _id: string;
  title: string;
  imageUrl: string;
  publishDate: string;
  active: boolean;
  createdAt: string;
};

export default function NewsBulletinPage() {
  const [bulletins, setBulletins] = useState<NewsBulletin[]>([]);
  const [filteredBulletins, setFilteredBulletins] = useState<NewsBulletin[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState<NewsBulletin | null>(
    null
  );

  useEffect(() => {
    fetchBulletins();
  }, []);

  const fetchBulletins = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/news-bulletins?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch news bulletins");
      }

      const data = await res.json();
      const bulletinsData = Array.isArray(data) ? data : [];
      setBulletins(bulletinsData);
      setFilteredBulletins(bulletinsData);

      // Extract years and months for filtering
      const uniqueYears = Array.from(
        new Set(
          bulletinsData.map((bulletin) =>
            new Date(bulletin.publishDate).getFullYear().toString()
          )
        )
      ).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending (newest first)

      setYears(uniqueYears);

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

      const uniqueMonths = monthNames.filter((month) =>
        bulletinsData.some(
          (bulletin) =>
            new Date(bulletin.publishDate).toLocaleString("default", {
              month: "long",
            }) === month
        )
      );

      setMonths(uniqueMonths);
    } catch (err) {
      console.error("Error fetching news bulletins:", err);
      setError("Failed to load news bulletins. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...bulletins];

    // Apply search filter
    if (searchQuery) {
      results = results.filter((bulletin) =>
        bulletin.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (bulletin) =>
          new Date(bulletin.publishDate).getFullYear().toString() ===
          selectedYear
      );
    }

    // Apply month filter
    if (selectedMonth) {
      results = results.filter(
        (bulletin) =>
          new Date(bulletin.publishDate).toLocaleString("default", {
            month: "long",
          }) === selectedMonth
      );
    }

    // Sort by publish date (newest first)
    results.sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

    setFilteredBulletins(results);
  }, [searchQuery, selectedYear, selectedMonth, bulletins]);

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

  // Toggle year filter
  const toggleYearFilter = (year: string) => {
    if (selectedYear === year) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
    }
  };

  // Toggle month filter
  const toggleMonthFilter = (month: string) => {
    if (selectedMonth === month) {
      setSelectedMonth(null);
    } else {
      setSelectedMonth(month);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedMonth(null);
  };

  const openBulletinModal = (bulletin: NewsBulletin) => {
    setSelectedBulletin(bulletin);
    document.body.style.overflow = "hidden";
  };

  const closeBulletinModal = () => {
    setSelectedBulletin(null);
    document.body.style.overflow = "auto";
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const shimmer = {
    hidden: { backgroundPosition: "-200px 0" },
    show: {
      backgroundPosition: "calc(200px + 100%) 0",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  return (
    <GalleryLayout
      title="News Bulletins"
      description="Stay updated with the latest news, announcements, and achievements at Aryavart Ancient Academy."
      backgroundClass="from-amber-600 to-yellow-500"
    >
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bulletins by title..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {(selectedYear || selectedMonth) && (
                <span className="ml-2 bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {(selectedYear ? 1 : 0) + (selectedMonth ? 1 : 0)}
                </span>
              )}
            </button>

            {(searchQuery || selectedYear || selectedMonth) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-200"
              >
                <X size={14} className="mr-1" />
                Clear All
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-3">
                        Filter by Year
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => toggleYearFilter(year)}
                            className={`${
                              selectedYear === year
                                ? "bg-amber-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                          >
                            {year}
                            {selectedYear === year && (
                              <CheckCircle size={14} className="ml-1 inline" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-700 mb-3">
                        Filter by Month
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {months.map((month) => (
                          <button
                            key={month}
                            onClick={() => toggleMonthFilter(month)}
                            className={`${
                              selectedMonth === month
                                ? "bg-amber-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                          >
                            {month}
                            {selectedMonth === month && (
                              <CheckCircle size={14} className="ml-1 inline" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-700">
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 size={16} className="mr-2 animate-spin" />
                Loading bulletins...
              </span>
            ) : filteredBulletins.length === 0 ? (
              "No bulletins found"
            ) : (
              <span>
                Showing{" "}
                <span className="font-medium">{filteredBulletins.length}</span>{" "}
                bulletin
                {filteredBulletins.length !== 1 && "s"}
                {(searchQuery || selectedYear || selectedMonth) && (
                  <span> with applied filters</span>
                )}
              </span>
            )}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md mb-6">
            <p>{error}</p>
            <button
              onClick={fetchBulletins}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Bulletins Grid */}
        {isLoading ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={shimmer}
                className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-lg h-72"
              ></motion.div>
            ))}
          </motion.div>
        ) : filteredBulletins.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-gray-200 rounded-lg p-8 text-center"
          >
            <div className="inline-block bg-amber-100 p-6 rounded-full mb-4">
              <Newspaper className="h-10 w-10 text-amber-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No News Bulletins Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchQuery || selectedYear || selectedMonth
                ? "No bulletins match your current search criteria. Try adjusting your filters or search query."
                : "Bulletins will be added soon. Please check back later."}
            </p>
            {(searchQuery || selectedYear || selectedMonth) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBulletins.map((bulletin) => (
              <motion.div key={bulletin._id} variants={fadeInUp}>
                <div
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1 duration-300 cursor-pointer"
                  onClick={() => openBulletinModal(bulletin)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={bulletin.imageUrl}
                      alt={bulletin.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center text-white text-xs bg-amber-600/80 px-2 py-1 rounded-full backdrop-blur-sm">
                          <Newspaper size={12} className="mr-1" />
                          News Bulletin
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 m-3">
                        <div className="flex items-center text-white text-xs bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                          <CalendarDays size={12} className="mr-1" />
                          {formatDate(bulletin.publishDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                      {bulletin.title}
                    </h3>
                    <div className="flex justify-end">
                      <button className="text-amber-600 text-sm font-medium flex items-center">
                        View Bulletin
                        <Eye
                          size={16}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bulletin Modal */}
        <AnimatePresence>
          {selectedBulletin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeBulletinModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800 pr-8">
                    {selectedBulletin.title}
                  </h3>
                  <button
                    onClick={closeBulletinModal}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="relative w-full max-h-[70vh] overflow-auto">
                  <div className="flex justify-center p-4">
                    <div className="relative max-w-full">
                      <Image
                        src={selectedBulletin.imageUrl}
                        alt={selectedBulletin.title}
                        width={800}
                        height={1000}
                        className="max-h-[65vh] object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDays size={16} className="mr-1" />
                    Published on {formatDate(selectedBulletin.publishDate)}
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={selectedBulletin.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1.5 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={14} className="mr-1.5" />
                      Download
                    </a>
                    <a
                      href={selectedBulletin.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} className="mr-1.5" />
                      View Full Size
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty space at bottom for better UX */}
        <div className="h-12"></div>
      </div>
    </GalleryLayout>
  );
}
