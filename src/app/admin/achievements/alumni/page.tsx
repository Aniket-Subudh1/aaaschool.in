"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
  Instagram,
  CheckCircle,
  XCircle,
  Briefcase,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

interface AlumniProfile {
  _id: string;
  name: string;
  graduationYear: string;
  currentPosition: string;
  company: string;
  achievement: string;
  instagramPostUrl?: string;
  category?: string;
  imageUrl?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminAlumniPage() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<AlumniProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    alumniId: string | null;
  }>({
    isOpen: false,
    isDeleting: false,
    alumniId: null,
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch("/api/achievements/alumni");

      if (!res.ok) {
        throw new Error("Failed to fetch alumni profiles");
      }

      const data = await res.json();
      const alumniData = Array.isArray(data) ? data : [];
      setAlumni(alumniData);
      setFilteredAlumni(alumniData);

      // Extract unique years and categories
      const uniqueYears = Array.from(
        new Set(alumniData.map((profile) => profile.graduationYear))
      )
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a)) as string[];

      const uniqueCategories = Array.from(
        new Set(alumniData.map((profile) => profile.category).filter(Boolean))
      ).sort() as string[];

      setYears(uniqueYears);
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching alumni profiles:", err);
      setError("Failed to load alumni profiles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...alumni];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.currentPosition
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          profile.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.achievement.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (profile) => profile.graduationYear === selectedYear
      );
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter(
        (profile) => profile.category === selectedCategory
      );
    }

    setFilteredAlumni(results);
  }, [searchQuery, selectedYear, selectedCategory, alumni]);

  // Toggle alumni profile active status
  const toggleAlumniStatus = async (id: string, currentActive: boolean) => {
    try {
      const formData = new FormData();
      formData.append("active", (!currentActive).toString());

      const res = await authFetch(`/api/achievements/alumni/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update alumni profile");
      }

      // Update state
      setAlumni(
        alumni.map((profile) =>
          profile._id === id ? { ...profile, active: !currentActive } : profile
        )
      );
    } catch (err) {
      console.error("Error updating alumni status:", err);
      alert("Failed to update alumni status");
    }
  };

  // Delete alumni profile functions
  const handleDeleteClick = (alumniId: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      alumniId,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.alumniId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(
        `/api/achievements/alumni/${deleteModal.alumniId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete alumni profile");
      }

      // Remove deleted profile from state
      setAlumni((prev) =>
        prev.filter((item) => item._id !== deleteModal.alumniId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting alumni profile:", err);
      setError("Failed to delete alumni profile. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      alumniId: null,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedCategory(null);
  };

  // Extract Instagram post ID from URL
  const getInstagramPostId = (url: string) => {
    // Handle different Instagram URL formats
    const regex = /\/p\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
            Alumni Network
          </h1>
          <p className="text-gray-600">
            Manage alumni profiles and success stories
          </p>
        </div>
        <Link
          href="/admin/achievements/alumni/new"
          className="inline-flex items-center mt-4 md:mt-0 px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Plus size={16} className="mr-2" />
          Add New Alumni
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
          <button
            onClick={fetchAlumni}
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
              placeholder="Search by name, position, company..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {(selectedYear || selectedCategory) && (
              <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                {(selectedYear ? 1 : 0) + (selectedCategory ? 1 : 0)}
              </span>
            )}
          </button>

          {(searchQuery || selectedYear || selectedCategory) && (
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
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">
                Filter by Graduation Year
              </h3>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() =>
                      setSelectedYear(selectedYear === year ? null : year)
                    }
                    className={`${
                      selectedYear === year
                        ? "bg-[#8b1a1a] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {categories.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 mb-3">
                  Filter by Field
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
        )}
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredAlumni.length === 0 ? (
        <NoData
          message="No alumni profiles found"
          buttonText="Add Alumni"
          href="/admin/achievements/alumni/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((profile) => {
            const instagramPostId = profile.instagramPostUrl
              ? getInstagramPostId(profile.instagramPostUrl)
              : null;

            return (
              <div
                key={profile._id}
                className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                  profile.active
                    ? "border-gray-200"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                      {profile.imageUrl ? (
                        <Image
                          src={profile.imageUrl}
                          alt={profile.name}
                          width={48}
                          height={48}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-[#8b1a1a]/10 text-[#8b1a1a]">
                          <Users size={20} />
                        </div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-bold text-gray-800">
                        {profile.name}
                      </h3>
                      <p className="text-[#8b1a1a] text-sm flex items-center">
                        <Briefcase size={14} className="mr-1" />
                        {profile.currentPosition} at {profile.company}
                      </p>
                    </div>
                    {!profile.active && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="mb-4 flex items-center text-sm text-gray-500">
                    <GraduationCap size={14} className="mr-1" />
                    <span>Class of {profile.graduationYear}</span>
                    {profile.category && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{profile.category}</span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {profile.achievement}
                  </p>

                  {instagramPostId && (
                    <div className="border border-gray-200 rounded-md overflow-hidden mb-4 h-40">
                      <iframe
                        src={`https://www.instagram.com/p/${instagramPostId}/embed/`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                      ></iframe>
                    </div>
                  )}

                  {profile.instagramPostUrl && (
                    <a
                      href={profile.instagramPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center mb-4"
                    >
                      <Instagram size={14} className="mr-1" />
                      View Instagram Post
                    </a>
                  )}

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-1">
                      <Link
                        href={`/admin/achievements/alumni/${profile._id}`}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/achievements/alumni/${profile._id}/edit`}
                        className="p-1 rounded-full text-green-600 hover:bg-green-50"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(profile._id)}
                        className="p-1 rounded-full text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        toggleAlumniStatus(profile._id, profile.active)
                      }
                      className={`${
                        profile.active
                          ? "text-green-600 hover:bg-green-50"
                          : "text-gray-400 hover:bg-gray-100"
                      } p-1 rounded-full`}
                      title={profile.active ? "Set Inactive" : "Set Active"}
                    >
                      <CheckCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteConfirmation
        title="Are you sure you want to delete this alumni profile?"
        message="This action cannot be undone. The profile and its associated image will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
