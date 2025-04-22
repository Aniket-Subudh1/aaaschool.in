"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PlusCircle,
  ImagePlus,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
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

export default function AdminAlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    albumId: string | null;
    albumTitle: string;
  }>({
    isOpen: false,
    isDeleting: false,
    albumId: null,
    albumTitle: "",
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/albums`);

      if (!res.ok) {
        throw new Error("Failed to fetch albums");
      }

      const data = await res.json();
      setAlbums(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching albums:", err);
      setError("Failed to load albums. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (albumId: string, albumTitle: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      albumId,
      albumTitle,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.albumId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(`/api/albums/${deleteModal.albumId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete album");
      }

      // Remove deleted album from the list
      setAlbums((prev) =>
        prev.filter((item) => item._id !== deleteModal.albumId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting album:", err);
      setError("Failed to delete album. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      albumId: null,
      albumTitle: "",
    });
  };

  // Filter albums based on search query
  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Photo Albums</h1>
          <p className="text-gray-600">Manage school photo albums</p>
        </div>
        <Link
          href="/admin/gallery/albums/new"
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <PlusCircle size={16} className="mr-2" />
          New Album
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
              placeholder="Search albums by title"
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
        ) : filteredAlbums.length === 0 ? (
          <NoData
            message="No albums found"
            buttonText="Create New Album"
            href="/admin/gallery/albums/new"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredAlbums.map((album) => (
              <div
                key={album._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={album.coverImageUrl}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold truncate">
                      {album.title}
                    </h3>
                  </div>
                  {album.active ? (
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
                  <div className="text-sm text-gray-500 mb-2">
                    {album.imageCount} photos
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/gallery/albums/${album._id}`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Link>
                    <Link
                      href={`/admin/gallery/albums/${album._id}/edit`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Link>
                    <Link
                      href={`/admin/gallery/albums/${album._id}/photos`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100"
                    >
                      <ImagePlus size={14} className="mr-1" />
                      Photos
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(album._id, album.title)}
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
        title={`Are you sure you want to delete the album "${deleteModal.albumTitle}"?`}
        message="This will permanently delete the album and all its photos. This action cannot be undone."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
