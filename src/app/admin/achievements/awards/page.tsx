"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

interface AwardItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category?: string;
  recipient?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminAwardsPage() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [filteredAwards, setFilteredAwards] = useState<AwardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    awardId: string | null;
  }>({
    isOpen: false,
    isDeleting: false,
    awardId: null,
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch("/api/achievements/awards");

      if (!res.ok) {
        throw new Error("Failed to fetch awards");
      }

      const data = await res.json();
      const awardsData = Array.isArray(data) ? data : [];
      setAwards(awardsData);
      setFilteredAwards(awardsData);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(awardsData.map((award) => award.category).filter(Boolean))
      ) as string[];

      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching awards:", err);
      setError("Failed to load awards. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...awards];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (award) =>
          award.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          award.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (award.recipient &&
            award.recipient.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter((award) => award.category === selectedCategory);
    }

    setFilteredAwards(results);
  }, [searchQuery, selectedCategory, awards]);

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

  // Toggle award active status
  const toggleAwardStatus = async (id: string, currentActive: boolean) => {
    try {
      const formData = new FormData();
      formData.append("active", (!currentActive).toString());

      const res = await authFetch(`/api/achievements/awards/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update award");
      }

      // Update state
      setAwards(
        awards.map((award) =>
          award._id === id ? { ...award, active: !currentActive } : award
        )
      );
    } catch (err) {
      console.error("Error updating award status:", err);
      alert("Failed to update award status");
    }
  };

  // Delete award functions
  const handleDeleteClick = (awardId: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      awardId,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.awardId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(
        `/api/achievements/awards/${deleteModal.awardId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete award");
      }

      // Remove deleted award from state
      setAwards((prev) =>
        prev.filter((item) => item._id !== deleteModal.awardId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting award:", err);
      setError("Failed to delete award. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      awardId: null,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/achievements"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Achievements
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a] mb-2">
            Awards & Recognition
          </h1>
          <p className="text-gray-600">
            Manage awards, certificates, and other recognitions
          </p>
        </div>
        <Link
          href="/admin/achievements/awards/new"
          className="inline-flex items-center mt-4 md:mt-0 px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Plus size={16} className="mr-2" />
          Add New Award
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
          <button
            onClick={fetchAwards}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search awards by title, description, or recipient..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {selectedCategory && (
              <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                1
              </span>
            )}
          </button>

          {(searchQuery || selectedCategory) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-3 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-200"
            >
              <XCircle size={14} className="mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? null : category
                    )
                  }
                  className={`${
                    selectedCategory === category
                      ? "bg-[#8b1a1a] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="rounded-md bg-gray-200 h-24 w-24"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredAwards.length === 0 ? (
        <NoData
          message="No awards found"
          buttonText="Add Award"
          href="/admin/achievements/awards/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAwards.map((award) => (
            <div
              key={award._id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                award.active ? "border-gray-200" : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="relative h-48">
                <Image
                  src={award.imageUrl}
                  alt={award.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                {!award.active && (
                  <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                    <div className="bg-white/90 px-3 py-1 rounded-md text-gray-700 text-sm font-medium">
                      Inactive
                    </div>
                  </div>
                )}
                {award.category && (
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                    {award.category}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                  {award.title}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar size={14} className="mr-1" />
                  {formatDate(award.date)}
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {award.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    <Link
                      href={`/admin/achievements/awards/${award._id}`}
                      className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/achievements/awards/${award._id}/edit`}
                      className="p-1 rounded-full text-green-600 hover:bg-green-50"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(award._id)}
                      className="p-1 rounded-full text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleAwardStatus(award._id, award.active)}
                    className={`${
                      award.active
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-100"
                    } p-1 rounded-full`}
                    title={award.active ? "Set Inactive" : "Set Active"}
                  >
                    <CheckCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmation
        title="Are you sure you want to delete this award?"
        message="This action cannot be undone. The award and its associated image will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
