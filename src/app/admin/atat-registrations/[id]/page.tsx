"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Calendar, Download, Check, X, Award } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

interface ATATRegistration {
  _id: string;
  registrationNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  photoUrl: string;
  photoPublicId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  currentSchool: string;
  currentClass: string;
  applyingForClass: string;
  howDidYouHear: string;
  status: "pending" | "approved" | "rejected";
  testDate: string;
  testVenue?: string;
  testTime?: string;
  admitCardUrl?: string;
  admitCardPublicId?: string;
  rank?: number;
  scholarshipPercentage?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ATATRegistrationDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const router = useRouter();

  const id = params instanceof Promise ? use(params).id : params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [registration, setRegistration] = useState<ATATRegistration | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [testVenue, setTestVenue] = useState("");
  const [testTime, setTestTime] = useState("");
  const [scholarshipPercentage, setScholarshipPercentage] = useState("");
  const [rank, setRank] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  });

  useEffect(() => {
    fetchRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchRegistration = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/atat-registrations/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch registration");
      }

      const data = await res.json();
      setRegistration(data);
      setStatus(data.status || "pending");
      setNotes(data.notes || "");
      setTestVenue(data.testVenue || "");
      setTestTime(data.testTime || "");
      setScholarshipPercentage(data.scholarshipPercentage?.toString() || "");
      setRank(data.rank?.toString() || "");
    } catch (err) {
      console.error("Error fetching registration:", err);
      setError("Failed to load registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  interface ATATRegistrationUpdateData {
    status: "pending" | "approved" | "rejected";
    notes: string;
    testVenue: string;
    testTime: string;
    scholarshipPercentage?: number;
    rank?: number;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const updateData: ATATRegistrationUpdateData = {
        status,
        notes,
        testVenue,
        testTime,
      };

      if (status === "approved" && scholarshipPercentage) {
        updateData.scholarshipPercentage = parseInt(scholarshipPercentage);
      }

      if (rank) {
        updateData.rank = parseInt(rank);
      }

      const res = await authFetch(`/api/atat-registrations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        throw new Error("Failed to update registration");
      }

      const updatedRegistration = await res.json();
      setRegistration(updatedRegistration);

      alert("Registration updated successfully");
    } catch (err) {
      console.error("Error updating registration:", err);
      setError("Failed to update registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
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

      const res = await authFetch(`/api/atat-registrations/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete registration");
      }

      router.push("/admin/atat-registrations");
    } catch (err) {
      console.error("Error deleting registration:", err);
      setError("Failed to delete registration. Please try again.");
    }
  };

  const generateAdmitCard = async () => {
    try {
      setIsLoading(true);

      const res = await authFetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "atat-admit-card",
          id,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate admit card");
      }

      const data = await res.json();

      if (!data.pdfData) {
        throw new Error("No PDF data received");
      }

      const link = document.createElement("a");
      link.href = data.pdfData;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Admit card downloaded successfully");
    } catch (err) {
      console.error("Error generating admit card:", err);
      alert(
        `Failed to generate admit card: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | undefined) => {
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
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-32 bg-gray-200 rounded mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>Registration not found or could not be loaded.</p>
        <button
          onClick={handleCancel}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Registrations
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Registrations List
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#8b1a1a]">
          ATAT Registration Details
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={generateAdmitCard}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <Download size={16} className="mr-2" />
            )}
            Download Admit Card
          </button>
          <button
            onClick={openDeleteModal}
            className="inline-flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
          >
            <X size={16} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Registration Information
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-700 flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  ATAT Information
                </h3>
              </div>
              <p className="text-blue-800 font-medium">
                Registration #: {registration.registrationNumber}
              </p>
              <p className="text-blue-800">
                Test Date: {formatDate(registration.testDate)}
              </p>
              {registration.testTime && (
                <p className="text-blue-800">
                  Test Time: {registration.testTime}
                </p>
              )}
              {registration.testVenue && (
                <p className="text-blue-800">
                  Test Venue: {registration.testVenue}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Student Name
                </h3>
                <p className="mt-1 text-lg">{registration.studentName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Applying For Class
                </h3>
                <p className="mt-1 text-lg">{registration.applyingForClass}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <p className="mt-1 text-lg">{registration.gender}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Date of Birth
                </h3>
                <p className="mt-1 text-lg">
                  {formatDate(registration.dateOfBirth)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Current School
                </h3>
                <p className="mt-1 text-lg">{registration.currentSchool}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Current Class
                </h3>
                <p className="mt-1 text-lg">{registration.currentClass}</p>
              </div>
            </div>

            <hr className="my-6" />

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Parent Details
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-500">Name:</span>{" "}
                    {registration.parentName}
                  </p>
                  <p>
                    <span className="text-gray-500">Email:</span>{" "}
                    {registration.parentEmail}
                  </p>
                  <p>
                    <span className="text-gray-500">Phone:</span>{" "}
                    {registration.parentPhone}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-6" />

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Address Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700 mb-2">{registration.address}</p>
                <p className="text-gray-700">
                  {registration.city}, {registration.state},{" "}
                  {registration.pincode}
                </p>
              </div>
            </div>

            {registration.photoUrl && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Student Photo
                </h3>
                <div className="relative h-48 w-40 border border-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={registration.photoUrl}
                    alt={`Photo of ${registration.studentName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Application Metadata */}
            <hr className="my-6" />

            <div className="flex justify-between text-sm text-gray-500">
              <p>Registration Date: {formatDate(registration.createdAt)}</p>
              <p>Last Updated: {formatDate(registration.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Registration Status
            </h2>

            <div className="mb-4">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                ${
                  status === "approved"
                    ? "bg-green-100 text-green-800"
                    : status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {status === "approved" && <Check size={14} className="mr-1" />}
                {status === "rejected" && <X size={14} className="mr-1" />}
                {status === "pending" && (
                  <Calendar size={14} className="mr-1" />
                )}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>

            {registration.scholarshipPercentage && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-sm font-medium text-green-700">
                  Scholarship Awarded:
                </h3>
                <p className="mt-1 text-lg font-semibold text-green-800">
                  {registration.scholarshipPercentage}% Scholarship
                </p>
              </div>
            )}

            {registration.rank && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="text-sm font-medium text-blue-700">
                  ATAT Rank:
                </h3>
                <p className="mt-1 text-lg font-semibold text-blue-800">
                  Rank {registration.rank}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label
                      className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                        status === "pending"
                          ? "bg-yellow-50 border-2 border-yellow-400"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="pending"
                        checked={status === "pending"}
                        onChange={() => setStatus("pending")}
                        className="sr-only"
                      />
                      <span className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-yellow-500" />
                        <span>Pending</span>
                      </span>
                    </label>

                    <label
                      className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                        status === "approved"
                          ? "bg-green-50 border-2 border-green-400"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="approved"
                        checked={status === "approved"}
                        onChange={() => setStatus("approved")}
                        className="sr-only"
                      />
                      <span className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>Approve</span>
                      </span>
                    </label>

                    <label
                      className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                        status === "rejected"
                          ? "bg-red-50 border-2 border-red-400"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="rejected"
                        checked={status === "rejected"}
                        onChange={() => setStatus("rejected")}
                        className="sr-only"
                      />
                      <span className="flex items-center">
                        <X className="h-5 w-5 mr-2 text-red-500" />
                        <span>Reject</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="testTime"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Test Time
                  </label>
                  <input
                    type="text"
                    id="testTime"
                    name="testTime"
                    value={testTime}
                    onChange={(e) => setTestTime(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="e.g., 9:00 AM - 11:00 AM"
                  />
                </div>

                <div>
                  <label
                    htmlFor="testVenue"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Test Venue
                  </label>
                  <input
                    type="text"
                    id="testVenue"
                    name="testVenue"
                    value={testVenue}
                    onChange={(e) => setTestVenue(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="e.g., Aryavart Ancient Academy, Main Hall"
                  />
                </div>

                {status === "approved" && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <h3 className="text-sm font-medium text-green-700 mb-2">
                      Scholarship Details
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="rank"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Rank
                        </label>
                        <input
                          type="number"
                          id="rank"
                          value={rank}
                          onChange={(e) => setRank(e.target.value)}
                          placeholder="e.g., 1"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="scholarshipPercentage"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Scholarship Percentage
                        </label>
                        <input
                          type="number"
                          id="scholarshipPercentage"
                          value={scholarshipPercentage}
                          onChange={(e) =>
                            setScholarshipPercentage(e.target.value)
                          }
                          placeholder="e.g., 50"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="Add internal notes about this registration"
                  ></textarea>
                </div>

                <FormControls
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText="Update Registration"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        title="Are you sure you want to delete this registration?"
        message="This action cannot be undone. All data associated with this registration will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
