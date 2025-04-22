"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PlusCircle,
  Play,
  Edit,
  Trash2,
  Check,
  X,
  Youtube,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

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

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    videoId: string | null;
    videoTitle: string;
  }>({
    isOpen: false,
    isDeleting: false,
    videoId: null,
    videoTitle: "",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/videos`);

      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (videoId: string, videoTitle: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      videoId,
      videoTitle,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.videoId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(`/api/videos/${deleteModal.videoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete video");
      }

      // Remove deleted video from the list
      setVideos((prev) =>
        prev.filter((item) => item._id !== deleteModal.videoId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting video:", err);
      setError("Failed to delete video. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      videoId: null,
      videoTitle: "",
    });
  };

  // Filter videos based on search query
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Video Gallery</h1>
          <p className="text-gray-600">
            Manage YouTube videos displayed on website
          </p>
        </div>
        <Link
          href="/admin/gallery/videos/new"
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <PlusCircle size={16} className="mr-2" />
          Add New Video
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos by title"
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="rounded-md bg-gray-200 h-24 w-32"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredVideos.length === 0 ? (
          <NoData
            message="No videos found"
            buttonText="Add New Video"
            href="/admin/gallery/videos/new"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <div className="aspect-video relative">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-3 opacity-90">
                        <Play size={24} className="text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                  {video.active ? (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <Check size={14} />
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={14} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                    >
                      <Youtube size={14} className="mr-1" />
                      Watch
                    </a>
                    <Link
                      href={`/admin/gallery/videos/${video._id}/edit`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(video._id, video.title)}
                      className="inline-flex items-center px-3 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmation
        title={`Are you sure you want to delete the video "${deleteModal.videoTitle}"?`}
        message="This action cannot be undone. The video reference will be permanently removed from the website."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
