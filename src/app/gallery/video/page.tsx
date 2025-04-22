"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  CalendarDays,
  Search,
  Play,
  CheckCircle,
  Filter,
  X,
  Loader2,
  Youtube,
  ExternalLink,
} from "lucide-react";
import GalleryLayout from "../GalleryLayout";

type Video = {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  active: boolean;
  createdAt: string;
};

export default function VideoGalleryPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/videos?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await res.json();
      const videosData = Array.isArray(data) ? data : [];
      setVideos(videosData);
      setFilteredVideos(videosData);

      // Extract years for filtering
      const uniqueYears = Array.from(
        new Set(
          videosData.map((video) =>
            new Date(video.createdAt).getFullYear().toString()
          )
        )
      ).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending (newest first)

      setYears(uniqueYears);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...videos];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (video.description &&
            video.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (video) =>
          new Date(video.createdAt).getFullYear().toString() === selectedYear
      );
    }

    setFilteredVideos(results);
  }, [searchQuery, selectedYear, videos]);

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

  // Open video modal
  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  // Close video modal
  const closeVideoModal = () => {
    setSelectedVideo(null);
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
      title="Video Gallery"
      description="Watch videos from our school events, performances and special moments at Aryavart Ancient Academy."
      backgroundClass="from-rose-600 to-pink-600"
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
                placeholder="Search videos by title or description..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white shadow-sm"
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
                <span className="ml-2 bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full">
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
                            ? "bg-rose-600 text-white"
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
                Loading videos...
              </span>
            ) : filteredVideos.length === 0 ? (
              "No videos found"
            ) : (
              <span>
                Showing{" "}
                <span className="font-medium">{filteredVideos.length}</span>{" "}
                video
                {filteredVideos.length !== 1 && "s"}
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
              onClick={fetchVideos}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Video Grid */}
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
        ) : filteredVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-gray-200 rounded-lg p-8 text-center"
          >
            <div className="inline-block bg-rose-100 p-6 rounded-full mb-4">
              <Film className="h-10 w-10 text-rose-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Videos Found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchQuery || selectedYear
                ? "No videos match your current search criteria. Try adjusting your filters or search query."
                : "Videos will be added soon. Please check back later."}
            </p>
            {(searchQuery || selectedYear) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
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
            {filteredVideos.map((video) => (
              <motion.div
                key={video._id}
                variants={fadeInUp}
                onMouseEnter={() => setHoveredVideo(video._id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <div className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 hover:-translate-y-1 duration-300">
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer"
                    onClick={() => openVideoModal(video)}
                  >
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <motion.div
                        animate={{
                          scale: hoveredVideo === video._id ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className="bg-rose-600/80 rounded-full p-4 opacity-90 hover:opacity-100 transition-opacity"
                      >
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center text-white text-xs bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                          <Youtube size={12} className="mr-1 text-red-500" />
                          YouTube
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 cursor-pointer hover:text-rose-600 transition-colors"
                      onClick={() => openVideoModal(video)}
                    >
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarDays size={14} className="mr-1" />
                        {formatDate(video.createdAt)}
                      </div>
                      <Link
                        href={`/gallery/video/${video._id}`}
                        className="text-rose-600 text-sm font-medium hover:underline flex items-center"
                      >
                        Details
                        <ExternalLink size={12} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeVideoModal}
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
                    {selectedVideo.title}
                  </h3>
                  <button
                    onClick={closeVideoModal}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                {selectedVideo.description && (
                  <div className="p-4 border-t border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedVideo.description}
                    </p>
                  </div>
                )}
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
