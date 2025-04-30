"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  BookOpen,
  Building,
  Award,
  Edit,
  Trash2,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
  updatedAt: string;
}

export default function FacultyDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  });

  useEffect(() => {
    fetchFaculty();
  }, [id]);

  const fetchFaculty = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/faculty/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch faculty member");
      }

      const data = await res.json();
      setFaculty(data);
    } catch (err) {
      console.error("Error fetching faculty:", err);
      setError("Failed to load faculty member. Please try again.");
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

      const res = await authFetch(`/api/faculty/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete faculty member");
      }

      router.push("/admin/faculty");
    } catch (err) {
      console.error("Error deleting faculty member:", err);
      setError("Failed to delete faculty member. Please try again.");
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
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="animate-spin text-[#8b1a1a]" />
      </div>
    );
  }

  if (error || !faculty) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>{error || "Faculty member not found or could not be loaded."}</p>
        <Link
          href="/admin/faculty"
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Faculty
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/faculty"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Faculty
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#8b1a1a]">
              {faculty.name}
            </h1>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Building className="h-4 w-4 mr-1" />
              <span>{faculty.department}</span>
              <span className="mx-2">•</span>
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{faculty.position}</span>
            </div>
            <div className="mt-2">
              {faculty.active ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <XCircle className="mr-1 h-3 w-3" />
                  Inactive
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/admin/faculty/${faculty._id}/edit`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit size={16} className="mr-2" />
              Edit
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
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="mx-auto w-40 h-40 relative rounded-lg overflow-hidden mb-4">
                  {faculty.photoUrl ? (
                    <Image
                      src={faculty.photoUrl}
                      alt={faculty.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm">{faculty.email}</p>
                    </div>
                  </div>

                  {faculty.joinDate && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Join Date
                        </p>
                        <p className="text-sm">
                          {formatDate(faculty.joinDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {faculty.qualifications &&
                    faculty.qualifications.length > 0 && (
                      <div className="flex items-start">
                        <Award className="h-5 w-5 text-gray-500 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Qualifications
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {faculty.qualifications.map(
                              (qualification, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-md"
                                >
                                  {qualification}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Bio/Description
                </h2>

                {faculty.bio ? (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {faculty.bio}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    No bio information available.
                  </p>
                )}
              </div>

              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Account Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-sm">{formatDate(faculty.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Last Updated
                    </p>
                    <p className="text-sm">{formatDate(faculty.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        title={`Are you sure you want to delete ${faculty.name}?`}
        message="This action cannot be undone. All data associated with this faculty member will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
