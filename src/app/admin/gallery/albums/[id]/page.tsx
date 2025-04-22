"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Pencil,
  Trash2,
  X,
  Check,
  Calendar,
  ImagePlus,
  Grid,
  Loader2,
} from "lucide-react";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

type Album = {
  _id: string;
  title: string;
  description?: string;
  coverImageUrl: string;
  imageCount: number;
  active: boolean;
  createdAt: string;
};

type Photo = {
  _id: string;
  albumId: string;
  imageUrl: string;
  caption?: string;
  order: number;
  createdAt: string;
};

export default function AlbumDetailPage() {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [newPhotoCaption, setNewPhotoCaption] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    photoId: string | null;
  }>({
    isOpen: false,
    isDeleting: false,
    photoId: null,
  });

  useEffect(() => {
    fetchAlbumDetails();
  }, [id]);

  const fetchAlbumDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/albums/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch album");
      }

      const data = await res.json();
      setAlbum(data.album);
      setPhotos(data.photos || []);
    } catch (err) {
      console.error("Error fetching album details:", err);
      setError("Failed to load album. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setUploadError(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed"
      );
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadError("File is too large. Maximum size is 5MB");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("albumId", id as string);
      formData.append("image", file);
      formData.append("caption", newPhotoCaption);

      const res = await authFetch("/api/photos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to upload photo");
      }

      // Reset form
      setNewPhotoCaption("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Refresh album details
      fetchAlbumDetails();
    } catch (err) {
      console.error("Error uploading photo:", err);
      setUploadError(
        err instanceof Error ? err.message : "Failed to upload photo"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteClick = (photoId: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      photoId,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.photoId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(`/api/photos/${deleteModal.photoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete photo");
      }

      // Refresh album details
      fetchAlbumDetails();
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting photo:", err);
      setError("Failed to delete photo. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      photoId: null,
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="animate-spin text-[#8b1a1a]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>{error}</p>
        <Link
          href="/admin/gallery/albums"
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Albums
        </Link>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>Album not found or could not be loaded.</p>
        <Link
          href="/admin/gallery/albums"
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Albums
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/gallery/albums"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Albums
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#8b1a1a]">{album.title}</h1>
            {album.description && (
              <p className="text-gray-600 mt-2">{album.description}</p>
            )}
            <div className="flex gap-4 mt-3">
              <div className="text-sm text-gray-600 flex items-center">
                <Calendar size={16} className="mr-1 text-gray-400" />
                {formatDate(album.createdAt)}
              </div>
              <div className="text-sm flex items-center">
                {album.active ? (
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
          <Link
            href={`/admin/gallery/albums/${album._id}/edit`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Pencil size={16} className="mr-2" />
            Edit Album
          </Link>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <Image
                  src={album.coverImageUrl}
                  alt={album.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
              </div>
              <div className="mt-4 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Add New Photo
                </h3>

                {uploadError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4 text-sm">
                    {uploadError}
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="caption"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Caption (Optional)
                  </label>
                  <input
                    type="text"
                    id="caption"
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="Enter photo caption"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <input
                    type="file"
                    id="photoUpload"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || album.imageCount >= 10}
                    className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={16} className="mr-2" />
                        Upload Photo
                      </>
                    )}
                  </button>
                  <span className="text-sm text-gray-500">
                    {album.imageCount}/10 photos
                  </span>
                </div>

                {album.imageCount >= 10 && (
                  <p className="mt-2 text-sm text-amber-600">
                    Maximum number of photos (10) reached for this album.
                  </p>
                )}
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <Grid size={20} className="mr-2 text-gray-400" />
                Album Photos ({photos.length})
              </h3>

              {photos.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-md p-8 text-center">
                  <ImagePlus size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No photos in this album yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Upload your first photo using the form on the left
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {photos.map((photo) => (
                    <div
                      key={photo._id}
                      className="border border-gray-200 rounded-md overflow-hidden group relative"
                    >
                      <Image
                        src={photo.imageUrl}
                        alt={photo.caption || "Album photo"}
                        width={300}
                        height={200}
                        className="object-cover w-full h-40"
                      />
                      {photo.caption && (
                        <div className="p-2 bg-gray-100">
                          <p className="text-sm text-gray-700 truncate">
                            {photo.caption}
                          </p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDeleteClick(photo._id)}
                          className="bg-red-600 text-white p-2 rounded-full"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        title="Are you sure you want to delete this photo?"
        message="This action cannot be undone. The photo will be permanently removed from the album."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
