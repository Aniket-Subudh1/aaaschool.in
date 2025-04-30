"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
  Mail,
  BookOpen,
  Building,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

interface Faculty {
  _id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  photoUrl: string;
  bio?: string;
  qualifications?: string[];
  joinDate?: string;
  active: boolean;
  createdAt: string;
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    facultyId: string | null;
    facultyName: string;
  }>({
    isOpen: false,
    isDeleting: false,
    facultyId: null,
    facultyName: "",
  });

  useEffect(() => {
    fetchFaculty();
  }, [filterDepartment]);

  const fetchFaculty = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const queryParams = filterDepartment
        ? `?department=${encodeURIComponent(filterDepartment)}`
        : "";
      const res = await authFetch(`/api/faculty${queryParams}`);

      if (!res.ok) {
        throw new Error("Failed to fetch faculty");
      }

      const data = await res.json();
      setFaculty(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching faculty:", err);
      setError("Failed to load faculty. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (facultyId: string, facultyName: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      facultyId,
      facultyName,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.facultyId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(`/api/faculty/${deleteModal.facultyId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete faculty member");
      }

      // Remove deleted faculty from the list
      setFaculty((prev) =>
        prev.filter((item) => item._id !== deleteModal.facultyId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting faculty member:", err);
      setError("Failed to delete faculty member. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      facultyId: null,
      facultyName: "",
    });
  };

  // Filter faculty based on search query
  const filteredFaculty = faculty.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique departments for filtering
  const departments = [...new Set(faculty.map((f) => f.department))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">
            Faculty Management
          </h1>
          <p className="text-gray-600">Manage faculty and staff members</p>
        </div>
        <Link
          href="/admin/faculty/new"
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <PlusCircle size={16} className="mr-2" />
          Add Faculty Member
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
              placeholder="Search by name, position, department, or email"
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
            />
          </div>
          <div className="relative">
            <button
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} className="mr-2" />
              {filterDepartment
                ? `Department: ${filterDepartment}`
                : "Filter by Department"}
            </button>

            {isFilterOpen && departments.length > 0 && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setFilterDepartment(null);
                    setIsFilterOpen(false);
                  }}
                >
                  Show All Departments
                </button>
                {departments.map((department) => (
                  <button
                    key={department}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      filterDepartment === department
                        ? "bg-gray-100 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setFilterDepartment(department);
                      setIsFilterOpen(false);
                    }}
                  >
                    {department}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <NoData
            message="No faculty members found"
            buttonText="Add Faculty Member"
            href="/admin/faculty/new"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Faculty Member
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Department & Position
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact
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
                {filteredFaculty.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                          {member.photoUrl ? (
                            <Image
                              src={member.photoUrl}
                              alt={member.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-10 w-10 text-gray-400 p-2" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Building className="h-4 w-4 mr-1 text-gray-500" />
                        {member.department}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-gray-400" />
                        {member.position}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-1 text-gray-500" />
                        {member.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {member.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/faculty/${member._id}`}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <Link
                          href={`/admin/faculty/${member._id}/edit`}
                          className="text-amber-600 hover:text-amber-900 px-2 py-1 rounded hover:bg-amber-50"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteClick(member._id, member.name)
                          }
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteConfirmation
        title={`Are you sure you want to delete ${deleteModal.facultyName}?`}
        message="This action cannot be undone. All data associated with this faculty member will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
