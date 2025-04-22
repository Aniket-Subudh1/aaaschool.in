"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Play, CalendarDays, VideoOff, Search, X } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

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
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter videos based on search query
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (video.description &&
        video.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Video Gallery</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Watch videos from our events, performances, and educational
            activities at Aryavart Ancient Academy
          </p>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Featured Videos</h2>

          <div className="relative md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="animate-spin text-rose-600 mb-4" />
            <p className="text-gray-600">Loading videos...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
            <p>{error}</p>
            <button
              onClick={fetchVideos}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <VideoOff size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Videos Found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No videos matching "${searchQuery}"`
                : "Videos will be added soon. Please check back later."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className="relative aspect-video cursor-pointer overflow-hidden"
                  onClick={() => openVideoModal(video)}
                >
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                    <div className="bg-rose-600 rounded-full p-3 opacity-90 hover:opacity-100 transition-opacity">
                      <Play size={24} className="text-white" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-rose-600 transition-colors line-clamp-2"
                    onClick={() => openVideoModal(video)}
                  >
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays size={16} className="mr-1" />
                    {formatDate(video.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 pr-8">
                {selectedVideo.title}
              </h3>
              <button
                onClick={closeVideoModal}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={24} />
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
                <p className="text-gray-700">{selectedVideo.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
            Explore More Media
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Discover other media collections from Aryavart Ancient Academy.
            Browse our photo albums and news bulletins to see the complete
            picture of our school activities.
          </p>
          <div className="space-x-4">
            <Link
              href="/gallery/photo"
              className="inline-block bg-rose-600 text-white px-6 py-3 rounded-md font-medium hover:bg-rose-700 transition-colors"
            >
              View Photos
            </Link>
            <Link
              href="/gallery/news-bulletin"
              className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              News Bulletins
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
