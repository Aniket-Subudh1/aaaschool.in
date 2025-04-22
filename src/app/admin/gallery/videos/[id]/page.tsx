"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Youtube,
  Loader2,
  Check,
  X,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
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
  updatedAt: string;
};

export default function VideoDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  });

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/videos/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch video");
      }

      const data = await res.json();
      setVideo(data);
    } catch (err) {
      console.error("Error fetching video:", err);
      setError("Failed to load video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = () => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
    });
  };

  const confirmDelete = async () => {
    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(`/api/videos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete video");
      }

      router.push("/admin/gallery/videos");
    } catch (err) {
      console.error("Error deleting video:", err);
      setError("Failed to delete video. Please try again.");
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="animate-spin text-[#8b1a1a]" />
      </div>
    );
  }
  if (error || !video) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>{error || "Video not found or could not be loaded."}</p>
        <Link
          href="/admin/gallery/videos"
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Videos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/gallery/videos"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Videos
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#8b1a1a]">{video.title}</h1>

            <div className="flex gap-4 mt-3">
              <div className="text-sm text-gray-600 flex items-center">
                <Calendar size={16} className="mr-1 text-gray-400" />
                {formatDate(video.createdAt)}
              </div>
              <div className="text-sm flex items-center">
                {video.active ? (
                  <span className="flex items-center text-green-600">
                    <Check size={16} className="mr-1" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <X size={16} className="mr-1" />
                    Inactive
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/admin/gallery/videos/${video._id}/edit`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Pencil size={16} className="mr-2" />
              Edit Video
            </Link>
            <button
              onClick={openDeleteModal}
              className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-600 bg-white hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-sm bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              {video.description && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Description
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {video.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Video Details
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Thumbnail
                  </h3>
                  <div className="mt-1 relative aspect-video rounded-md overflow-hidden">
                    <Image
                      src={video.thumbnailUrl}
                      alt={`Thumbnail for ${video.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    YouTube URL
                  </h3>
                  <div className="mt-1 flex items-center">
                    <Youtube size={16} className="text-red-600 mr-2" />
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {video.youtubeUrl}
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    YouTube ID
                  </h3>
                  <p className="mt-1 text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded">
                    {video.youtubeId}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Last Updated
                  </h3>
                  <p className="mt-1 text-gray-700">
                    {formatDate(video.updatedAt || video.createdAt)}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <a
                    href={`/gallery/video/${video._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 w-full justify-center"
                  >
                    <Eye size={16} className="mr-2" />
                    View Public Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        title={`Are you sure you want to delete the video "${video.title}"?`}
        message="This action cannot be undone. The video reference will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
