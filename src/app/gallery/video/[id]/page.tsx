"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  Share2,
  Youtube,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

export default function VideoDetailPage() {
  const { id } = useParams();

  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    fetchVideoDetails();
  }, [id]);

  const fetchVideoDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowShareOptions(false);

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

      // Fetch related videos
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

  // Share functionality
  const shareVideo = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShareOptions(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={48} className="animate-spin text-rose-600 mb-4" />
        <p className="text-gray-600">Loading video...</p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
          <p>{error || "Video not found"}</p>
          <Link
            href="/gallery/video"
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Videos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/gallery/video"
            className="inline-flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all videos
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{video.title}</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center text-white/80">
              <Calendar size={16} className="mr-1" />
              {formatDate(video.createdAt)}
            </div>
            <div className="relative">
              <button
                onClick={shareVideo}
                className="flex items-center text-white/80 hover:text-white"
              >
                <Share2 size={16} className="mr-1" />
                Share
              </button>
              {showShareOptions && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-10 w-64">
                  <button
                    onClick={copyToClipboard}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
                  >
                    <span>Copy link</span>
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md block"
                  >
                    Share on Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(video.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md block"
                  >
                    Share on Twitter
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      video.title + ": " + window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md block"
                  >
                    Share on WhatsApp
                  </a>
                </div>
              )}
            </div>
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/80 hover:text-white"
            >
              <Youtube size={16} className="mr-1" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {video.description && (
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  About this video
                </h2>
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
                  <p className="text-gray-700 whitespace-pre-line">
                    {video.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              More Videos
            </h2>

            {relatedVideos.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">No related videos available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {relatedVideos.map((related) => (
                  <Link
                    key={related._id}
                    href={`/gallery/video/${related._id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={related.thumbnailUrl}
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="bg-rose-600/90 rounded-full p-2">
                          <Play size={16} className="text-white" fill="white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(related.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/gallery/video"
                  className="block text-center py-3 bg-gray-50 text-rose-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  View All Videos
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/gallery/video"
            className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors font-medium"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Videos
          </Link>

          <div className="flex gap-4">
            <Link
              href="/gallery/photo"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Photo Albums
            </Link>
            <Link
              href="/gallery/news-bulletin"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              News Bulletins
            </Link>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center text-gray-700 hover:text-rose-600 transition-colors font-medium"
          >
            Gallery Home
            <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
