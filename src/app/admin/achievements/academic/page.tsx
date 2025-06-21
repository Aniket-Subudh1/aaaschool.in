"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  XCircle,
  Edit,
  GraduationCap,
  Award,
  User,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

interface AcademicAchievement {
  _id: string;
  name: string;
  class: string;
  photoUrl?: string;
  marks: number;
  stream: string;
  achievement: string;
  year: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminAcademicPage() {
  const [achievements, setAchievements] = useState<AcademicAchievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<AcademicAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedStream, setSelectedStream] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [streams, setStreams] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    achievementId: string | null;
  }>({
    isOpen: false,
    isDeleting: false,
    achievementId: null,
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch("/api/achievements/academic");

      if (!res.ok) {
        throw new Error("Failed to fetch academic achievements");
      }

      const data = await res.json();
      const achievementsData = Array.isArray(data) ? data : [];
      setAchievements(achievementsData);
      setFilteredAchievements(achievementsData);

      // Extract unique years and streams
      const uniqueYears = Array.from(
        new Set(achievementsData.map((achievement) => achievement.year))
      )
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a)) as string[];

      const uniqueStreams = Array.from(
        new Set(achievementsData.map((achievement) => achievement.stream))
      )
        .filter(Boolean)
        .sort() as string[];

      setYears(uniqueYears);
      setStreams(uniqueStreams);
    } catch (err) {
      console.error("Error fetching academic achievements:", err);
      setError("Failed to load academic achievements. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters and search
  useEffect(() => {
    let results = [...achievements];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (achievement) =>
          achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.achievement.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.stream.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.class.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (achievement) => achievement.year === selectedYear
      );
    }

    // Apply stream filter
    if (selectedStream) {
      results = results.filter(
        (achievement) => achievement.stream === selectedStream
      );
    }

    setFilteredAchievements(results);
  }, [searchQuery, selectedYear, selectedStream, achievements]);

  // Toggle achievement active status
  const toggleAchievementStatus = async (
    id: string,
    currentActive: boolean
  ) => {
    try {
      const formData = new FormData();
      formData.append("active", (!currentActive).toString());

      const res = await authFetch(`/api/achievements/academic/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update achievement");
      }

      // Update state
      setAchievements(
        achievements.map((achievement) =>
          achievement._id === id
            ? { ...achievement, active: !currentActive }
            : achievement
        )
      );
    } catch (err) {
      console.error("Error updating achievement status:", err);
      alert("Failed to update achievement status");
    }
  };

  // Delete achievement functions
  const handleDeleteClick = (achievementId: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      achievementId,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.achievementId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(
        `/api/achievements/academic/${deleteModal.achievementId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete achievement");
      }

      // Remove deleted achievement from state
      setAchievements((prev) =>
        prev.filter((item) => item._id !== deleteModal.achievementId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting achievement:", err);
      setError("Failed to delete achievement. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      achievementId: null,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear(null);
    setSelectedStream(null);
  };

  // Get achievement class for styling based on marks
  const getAchievementClass = (marks: number) => {
    if (marks >= 95) {
      return "bg-yellow-100 text-yellow-800";
    } else if (marks >= 90) {
      return "bg-green-100 text-green-800";
    } else if (marks >= 85) {
      return "bg-blue-100 text-blue-800";
    } else if (marks >= 80) {
      return "bg-purple-100 text-purple-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
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
            Academic Achievements
          </h1>
          <p className="text-gray-600">
            Manage student academic achievements and records
          </p>
        </div>
        <Link
          href="/admin/achievements/academic/new"
          className="inline-flex items-center mt-4 md:mt-0 px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Plus size={16} className="mr-2" />
          Add New Achievement
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
          <button
            onClick={fetchAchievements}
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
              placeholder="Search by student name, achievement, or stream..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {(selectedYear || selectedStream) && (
              <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                {(selectedYear ? 1 : 0) + (selectedStream ? 1 : 0)}
              </span>
            )}
          </button>

          {(searchQuery || selectedYear || selectedStream) && (
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
              <h3 className="font-medium text-gray-700 mb-3">Filter by Year</h3>
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

            <div>
              <h3 className="font-medium text-gray-700 mb-3">
                Filter by Stream
              </h3>
              <div className="flex flex-wrap gap-2">
                {streams.map((stream) => (
                  <button
                    key={stream}
                    onClick={() =>
                      setSelectedStream(selectedStream === stream ? null : stream)
                    }
                    className={`${
                      selectedStream === stream
                        ? "bg-[#8b1a1a] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                  >
                    {stream}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredAchievements.length === 0 ? (
        <NoData
          message="No academic achievements found"
          buttonText="Add Achievement"
          href="/admin/achievements/academic/new"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement._id}
              className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                achievement.active
                  ? "border-gray-200"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    {achievement.photoUrl ? (
                      <Image
                        src={achievement.photoUrl}
                        alt={achievement.name}
                        width={48}
                        height={48}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-[#8b1a1a]/10 text-[#8b1a1a]">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {achievement.name}
                    </h3>
                    <p className="text-[#8b1a1a] text-sm flex items-center">
                      <GraduationCap size={14} className="mr-1" />
                      Class {achievement.class} - {achievement.stream}
                    </p>
                  </div>
                  {!achievement.active && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`px-3 py-1.5 inline-flex items-center text-sm font-semibold rounded-full ${getAchievementClass(
                      achievement.marks
                    )}`}
                  >
                    <Award size={12} className="mr-1" />
                    {achievement.marks}%
                  </span>
                  <span className="text-xs text-gray-500">{achievement.year}</span>
                </div>

                <p className="text-gray-600 mb-3 line-clamp-2">
                  {achievement.achievement}
                </p>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-1">
                    <Link
                      href={`/admin/achievements/academic/${achievement._id}`}
                      className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/achievements/academic/${achievement._id}/edit`}
                      className="p-1 rounded-full text-green-600 hover:bg-green-50"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(achievement._id)}
                      className="p-1 rounded-full text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      toggleAchievementStatus(achievement._id, achievement.active)
                    }
                    className={`${
                      achievement.active
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-100"
                    } p-1 rounded-full`}
                    title={achievement.active ? "Set Inactive" : "Set Active"}
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
        title="Are you sure you want to delete this academic achievement?"
        message="This action cannot be undone. The achievement and its associated photo will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}