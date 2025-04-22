"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CalendarDays,
  Search,
  ImageIcon,
  CheckCircle,
  Filter,
  X,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import GalleryLayout from "../GalleryLayout";

type Album = {
  _id: string;
  title: string;
  description?: string;
  coverImageUrl: string;
  imageCount: number;
  active: boolean;
  createdAt: string;
};

export default function PhotoGalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/albums?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch albums");
      }

      const data = await res.json();
      const albumsData = Array.isArray(data) ? data : [];
      setAlbums(albumsData);
      setFilteredAlbums(albumsData);

      // Extract years for filtering
      const uniqueYears = Array.from(
        new Set(
          albumsData.map((album) =>
            new Date(album.createdAt).getFullYear().toString()
          )
        )
      ).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending (newest first)

      setYears(uniqueYears);
    } catch (err) {
      console.error("Error fetching albums:", err);
      setError("Failed to load photo albums. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...albums];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (album) =>
          album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (album.description &&
            album.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (album) =>
          new Date(album.createdAt).getFullYear().toString() === selectedYear
      );
    }

    setFilteredAlbums(results);
  }, [searchQuery, selectedYear, albums]);

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

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
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
      title="Photo Albums"
      description="Browse through our collection of photo albums capturing events, celebrations, and everyday moments at Aryavart Ancient Academy."
      backgroundClass="from-indigo-600 to-blue-600"
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
                placeholder="Search albums by title or description..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
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
              {selectedYear && (
                <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  1
                </span>
              )}
            </button>

            {(searchQuery || selectedYear) && (
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
                            ? "bg-indigo-600 text-white"
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
                Loading albums...
              </span>
            ) : filteredAlbums.length === 0 ? (
              "No albums found"
            ) : (
              <span>
                Showing{" "}
                <span className="font-medium">{filteredAlbums.length}</span>{" "}
                album
                {filteredAlbums.length !== 1 && "s"}
                {(searchQuery || selectedYear) && (
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
              onClick={fetchAlbums}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Album Grid */}
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
        ) : filteredAlbums.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-gray-200 rounded-lg p-8 text-center"
          >
            <div className="inline-block bg-indigo-100 p-6 rounded-full mb-4">
              <Camera className="h-10 w-10 text-indigo-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Photo Albums Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchQuery || selectedYear
                ? "No albums match your current search criteria. Try adjusting your filters or search query."
                : "Photo albums will be added soon. Please check back later."}
            </p>
            {(searchQuery || selectedYear) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
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
            {filteredAlbums.map((album) => (
              <motion.div key={album._id} variants={fadeInUp}>
                <Link
                  href={`/gallery/photo/${album._id}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1 duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={album.coverImageUrl}
                      alt={album.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-medium text-lg">
                        {album.title}
                      </h3>
                      {album.description && (
                        <p className="text-white/80 text-sm line-clamp-1 mt-1">
                          {album.description}
                        </p>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <ImageIcon size={12} className="mr-1" />
                      {album.imageCount} photos
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDays size={14} className="mr-1" />
                      {formatDate(album.createdAt)}
                    </div>
                    <div className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-sm font-medium">
                      View Album
                      <ArrowUpRight size={14} className="ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty space at bottom for better UX */}
        <div className="h-12"></div>
      </div>
    </GalleryLayout>
  );
}
