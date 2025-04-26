"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Trash2,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

interface SportAchievement {
  _id: string;
  name: string;
  class: string;
  event: string;
  award: string;
  year: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSportsPage() {
  const [achievements, setAchievements] = useState<SportAchievement[]>([]);
  const [filteredAchievements, setFilteredAchievements] = useState<
    SportAchievement[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
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

      const res = await authFetch("/api/achievements/sports");

      if (!res.ok) {
        throw new Error("Failed to fetch sports achievements");
      }

      const data = await res.json();
      const achievementsData = Array.isArray(data) ? data : [];
      setAchievements(achievementsData);
      setFilteredAchievements(achievementsData);

      // Extract unique years and events
      const uniqueYears = Array.from(
        new Set(achievementsData.map((achievement) => achievement.year))
      )
        .filter(Boolean)
        .sort((a, b) => parseInt(b) - parseInt(a)) as string[];

      const uniqueEvents = Array.from(
        new Set(achievementsData.map((achievement) => achievement.event))
      )
        .filter(Boolean)
        .sort() as string[];

      setYears(uniqueYears);
      setEvents(uniqueEvents);
    } catch (err) {
      console.error("Error fetching sports achievements:", err);
      setError("Failed to load sports achievements. Please try again later.");
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
          achievement.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.award.toLowerCase().includes(searchQuery.toLowerCase()) ||
          achievement.class.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply year filter
    if (selectedYear) {
      results = results.filter(
        (achievement) => achievement.year === selectedYear
      );
    }

    // Apply event filter
    if (selectedEvent) {
      results = results.filter(
        (achievement) => achievement.event === selectedEvent
      );
    }

    setFilteredAchievements(results);
  }, [searchQuery, selectedYear, selectedEvent, achievements]);

  // Toggle achievement active status
  const toggleAchievementStatus = async (
    id: string,
    currentActive: boolean
  ) => {
    try {
      const res = await authFetch(`/api/achievements/sports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: !currentActive }),
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
        `/api/achievements/sports/${deleteModal.achievementId}`,
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
    setSelectedEvent(null);
  };

  // Get award class for styling
  const getAwardClass = (award: string) => {
    if (award.toLowerCase().includes("gold")) {
      return "bg-yellow-100 text-yellow-800";
    } else if (award.toLowerCase().includes("silver")) {
      return "bg-gray-100 text-gray-800";
    } else if (award.toLowerCase().includes("bronze")) {
      return "bg-amber-100 text-amber-800";
    } else if (award.toLowerCase().includes("participant")) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-green-100 text-green-800";
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
            Sports Achievements
          </h1>
          <p className="text-gray-600">
            Manage student sports achievements and competitions
          </p>
        </div>
        <Link
          href="/admin/achievements/sports/new"
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
              placeholder="Search by student name, event, or award..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white shadow-sm"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter size={16} className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
            {(selectedYear || selectedEvent) && (
              <span className="ml-2 bg-[#8b1a1a] text-white text-xs px-2 py-0.5 rounded-full">
                {(selectedYear ? 1 : 0) + (selectedEvent ? 1 : 0)}
              </span>
            )}
          </button>

          {(searchQuery || selectedYear || selectedEvent) && (
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
                Filter by Event
              </h3>
              <div className="flex flex-wrap gap-2">
                {events.map((event) => (
                  <button
                    key={event}
                    onClick={() =>
                      setSelectedEvent(selectedEvent === event ? null : event)
                    }
                    className={`${
                      selectedEvent === event
                        ? "bg-[#8b1a1a] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } px-3 py-1 rounded-md text-sm font-medium transition-colors`}
                  >
                    {event}
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
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : filteredAchievements.length === 0 ? (
        <NoData
          message="No sports achievements found"
          buttonText="Add Achievement"
          href="/admin/achievements/sports/new"
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Student Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Class
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Event
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Award
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Year
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAchievements.map((achievement, index) => (
                  <tr
                    key={achievement._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {achievement.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {achievement.class}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {achievement.event}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAwardClass(
                          achievement.award
                        )}`}
                      >
                        {achievement.award}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {achievement.year}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          toggleAchievementStatus(
                            achievement._id,
                            achievement.active
                          )
                        }
                        className={`${
                          achievement.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        } inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
                      >
                        {achievement.active ? (
                          <>
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <XCircle size={12} className="mr-1" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/achievements/sports/${achievement._id}/edit`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={16} className="hover:text-blue-700" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(achievement._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} className="hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="py-4 px-6 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredAchievements.length}</span>{" "}
              achievements
              {(searchQuery || selectedYear || selectedEvent) &&
                " with applied filters"}
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmation
        title="Are you sure you want to delete this sports achievement?"
        message="This action cannot be undone. The achievement record will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
