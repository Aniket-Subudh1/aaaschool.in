"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Calendar,
  Youtube,
  Share2,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  ExternalLink,
  Info,
  Tag,
  Clock,
} from "lucide-react";
import GalleryLayout from "../../GalleryLayout";

type Video = {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnailUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type RelatedVideo = {
  _id: string;
  title: string;
  thumbnailUrl: string;
  youtubeId: string;
};

export default function VideoDetailPage() {
  const { id } = useParams();

  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<RelatedVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const fetchVideoDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowShare(false);

      // Fetch the specific video
      const res = await fetch(`/api/videos/${id}`);

      if (!res.ok) {
        if (res.status === 404) {
          return notFound();
        }
        throw new Error("Failed to fetch video");
      }

      const videoData = await res.json();

      if (!videoData.active) {
        return notFound(); // Don't show inactive videos
      }

      setVideo(videoData);

      // Fetch related videos (all videos except current one)
      const relatedRes = await fetch(`/api/videos?active=true`);

      if (relatedRes.ok) {
        const allVideos = await relatedRes.json();
        // Filter out the current video and get up to 4 related videos
        const filtered = Array.isArray(allVideos)
          ? allVideos.filter((v) => v._id !== id && v.active).slice(0, 4)
          : [];
        setRelatedVideos(filtered);
      }
    } catch (err) {
      console.error("Error fetching video:", err);
      setError("Failed to load video. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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

  // Share functions
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShare(false);
  };

  // Animation variants
  const fadeIn = {
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <GalleryLayout
        title="Loading Video..."
        backgroundClass="from-rose-600 to-pink-600"
      >
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="animate-spin text-rose-600 mb-4" />
          <p className="text-gray-600">Loading video details...</p>
        </div>
      </GalleryLayout>
    );
  }

  if (error || !video) {
    return (
      <GalleryLayout
        title="Video Not Found"
        backgroundClass="from-rose-600 to-pink-600"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
            <p>{error || "Video not found"}</p>
            <Link
              href="/gallery/video"
              className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <ChevronLeft size={16} className="mr-2" />
              Back to Videos
            </Link>
          </div>
        </div>
      </GalleryLayout>
    );
  }

  return (
    <GalleryLayout
      title={video.title}
      description={
        video.description?.substring(0, 150) +
        (video.description && video.description.length > 150 ? "..." : "")
      }
      backgroundClass="from-rose-600 to-pink-600"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Video and Description */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-6">
              <div className="aspect-video w-full relative">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Video Info and Description */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-rose-100 p-2 rounded-md mr-3">
                  <Youtube className="h-5 w-5 text-rose-600" />
                </div>
                <span className="text-sm text-rose-600 font-medium">
                  YouTube Video
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                {video.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-gray-400" />
                  {formatDate(video.createdAt)}
                </div>
                <div className="flex items-center">
                  <Tag size={16} className="mr-1 text-gray-400" />
                  School Activity
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1 text-gray-400" />
                  Last updated: {formatDate(video.updatedAt || video.createdAt)}
                </div>
              </div>

              <div className="flex space-x-3 mb-6">
                <div className="relative">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    <Share2 size={14} className="mr-1.5" />
                    Share
                  </button>
                  <AnimatePresence>
                    {showShare && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-2 z-10 w-48 border border-gray-200"
                      >
                        <button
                          onClick={copyToClipboard}
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center text-sm"
                        >
                          Copy link
                        </button>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md block text-sm"
                        >
                          Share on Facebook
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            window.location.href
                          )}&text=${encodeURIComponent(video.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md block text-sm"
                        >
                          Share on Twitter
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            video.title + ": " + window.location.href
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md block text-sm"
                        >
                          Share on WhatsApp
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                >
                  <Youtube size={14} className="mr-1.5" />
                  Watch on YouTube
                </a>
              </div>

              {video.description && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Description
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
                    <p className="text-gray-700 whitespace-pre-line">
                      {video.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar - Related Videos */}
          <div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Info size={18} className="mr-2 text-rose-500" />
                Video Information
              </h2>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-rose-100 p-2 rounded-md mr-3 mt-0.5">
                    <Youtube size={16} className="text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      YouTube ID
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                      {video.youtubeId}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100">
                  <a
                    href={`/gallery`}
                    className="inline-flex items-center px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 w-full justify-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View All Gallery
                  </a>
                </div>
              </div>
            </motion.div>

            {relatedVideos.length > 0 && (
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn}
                className="mt-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  More Videos
                </h2>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {relatedVideos.map((relatedVideo) => (
                    <motion.div
                      key={relatedVideo._id}
                      variants={fadeIn}
                      onMouseEnter={() => setHoveredVideo(relatedVideo._id)}
                      onMouseLeave={() => setHoveredVideo(null)}
                    >
                      <Link
                        href={`/gallery/video/${relatedVideo._id}`}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={relatedVideo.thumbnailUrl}
                            alt={relatedVideo.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.div
                              animate={{
                                scale:
                                  hoveredVideo === relatedVideo._id ? 1.1 : 1,
                              }}
                              className="text-white"
                            >
                              <PlayCircle size={20} />
                            </motion.div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-800 group-hover:text-rose-600 transition-colors line-clamp-2">
                            {relatedVideo.title}
                          </h3>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  <div className="pt-3 border-t border-gray-100">
                    <Link
                      href="/gallery/video"
                      className="inline-flex items-center text-rose-600 hover:text-rose-700 text-sm font-medium"
                    >
                      View All Videos
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </GalleryLayout>
  );
}
