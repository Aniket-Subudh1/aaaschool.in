"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  Check,
  X,
  Calendar,
  ExternalLink,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

type Banner = {
  _id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  order: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    bannerId: string | null;
    bannerTitle: string;
  }>({
    isOpen: false,
    isDeleting: false,
    bannerId: null,
    bannerTitle: "",
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/banners`);

      if (!res.ok) {
        throw new Error("Failed to fetch banners");
      }

      const data = await res.json();
      setBanners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (bannerId: string, bannerTitle: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      bannerId,
      bannerTitle,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.bannerId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(`/api/banners/${deleteModal.bannerId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete banner");
      }

      // Remove deleted banner from the list
      setBanners((prev) =>
        prev.filter((item) => item._id !== deleteModal.bannerId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting banner:", err);
      setError("Failed to delete banner. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      bannerId: null,
      bannerTitle: "",
    });
  };

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if banner is currently active (considering date range)
  const isBannerCurrentlyActive = (banner: Banner) => {
    if (!banner.active) return false;
    
    const now = new Date();
    const startDate = banner.startDate ? new Date(banner.startDate) : null;
    const endDate = banner.endDate ? new Date(banner.endDate) : null;
    
    if (startDate && now < startDate) return false;
    if (endDate && now > endDate) return false;
    
    return true;
  };

  // Filter banners based on search query
  const filteredBanners = banners.filter((banner) =>
    banner.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Website Banners</h1>
          <p className="text-gray-600">Manage homepage popup banners</p>
        </div>
        <Link
          href="/admin/banners/new"
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <PlusCircle size={16} className="mr-2" />
          New Banner
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
              placeholder="Search banners by title"
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
        ) : filteredBanners.length === 0 ? (
          <NoData
            message="No banners found"
            buttonText="Create New Banner"
            href="/admin/banners/new"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredBanners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {isBannerCurrentlyActive(banner) ? (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <Check size={14} />
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={14} />
                    </div>
                  )}
                  {banner.order && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      Order: {banner.order}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {banner.title}
                  </h3>
                  
                  {banner.linkUrl && (
                    <div className="flex items-center text-sm text-blue-600 mb-2">
                      <ExternalLink size={12} className="mr-1" />
                      Link attached
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(banner.createdAt)}
                  </div>
                  
                  {(banner.startDate || banner.endDate) && (
                    <div className="text-xs text-gray-600 mb-3">
                      {banner.startDate && `Start: ${formatDate(banner.startDate)}`}
                      {banner.startDate && banner.endDate && " | "}
                      {banner.endDate && `End: ${formatDate(banner.endDate)}`}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/banners/${banner._id}/edit`}
                      className="inline-flex items-center px-3 py-1 text-sm bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(banner._id, banner.title)}
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
        title={`Are you sure you want to delete the banner "${deleteModal.bannerTitle}"?`}
        message="This action cannot be undone. The banner will be permanently removed from the website."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}