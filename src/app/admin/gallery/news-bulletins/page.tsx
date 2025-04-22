"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PlusCircle,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

type NewsBulletin = {
  _id: string;
  title: string;
  imageUrl: string;
  publishDate: string;
  active: boolean;
  createdAt: string;
};

export default function AdminNewsBulletinsPage() {
  const [bulletins, setBulletins] = useState<NewsBulletin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    bulletinId: string | null;
    bulletinTitle: string;
  }>({
    isOpen: false,
    isDeleting: false,
    bulletinId: null,
    bulletinTitle: "",
  });

  useEffect(() => {
    fetchBulletins();
  }, []);

  const fetchBulletins = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/news-bulletins`);

      if (!res.ok) {
        throw new Error("Failed to fetch news bulletins");
      }

      const data = await res.json();
      setBulletins(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching news bulletins:", err);
      setError("Failed to load news bulletins. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (bulletinId: string, bulletinTitle: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      bulletinId,
      bulletinTitle,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.bulletinId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(
        `/api/news-bulletins/${deleteModal.bulletinId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete news bulletin");
      }

      // Remove deleted bulletin from the list
      setBulletins((prev) =>
        prev.filter((item) => item._id !== deleteModal.bulletinId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting news bulletin:", err);
      setError("Failed to delete news bulletin. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      bulletinId: null,
      bulletinTitle: "",
    });
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

  // Filter bulletins based on search query
  const filteredBulletins = bulletins.filter((bulletin) =>
    bulletin.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">News Bulletins</h1>
          <p className="text-gray-600">Manage school news bulletins</p>
        </div>
        <Link
          href="/admin/gallery/news-bulletins/new"
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <PlusCircle size={16} className="mr-2" />
          New Bulletin
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
              placeholder="Search bulletins by title"
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
        ) : filteredBulletins.length === 0 ? (
          <NoData
            message="No news bulletins found"
            buttonText="Create New Bulletin"
            href="/admin/gallery/news-bulletins/new"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredBulletins.map((bulletin) => (
              <div
                key={bulletin._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={bulletin.imageUrl}
                    alt={bulletin.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {bulletin.active ? (
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {bulletin.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(bulletin.publishDate)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={bulletin.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </a>
                    <Link
                      href={`/admin/gallery/news-bulletins/${bulletin._id}/edit`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDeleteClick(bulletin._id, bulletin.title)
                      }
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
        title={`Are you sure you want to delete the bulletin "${deleteModal.bulletinTitle}"?`}
        message="This action cannot be undone. The news bulletin will be permanently removed from the website."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
