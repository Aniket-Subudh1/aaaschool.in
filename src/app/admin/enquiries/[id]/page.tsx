"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  Download,
  Check,
  X,
} from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";
import { use } from "react";

type Enquiry = {
  studentName: string;
  parentName: string;
  classApplied: string;
  mobileNumber: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
  notes?: string;
  enquiryNumber?: string;
};

export default function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [isLoading, setIsLoading] = useState(true);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  });

  useEffect(() => {
    fetchEnquiry();
  }, [id]);

  const fetchEnquiry = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/enquiries/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch enquiry");
      }

      const data = await res.json();
      setEnquiry(data);
      setStatus(data.status || "pending");
      setNotes(data.notes || "");
    } catch (err) {
      console.error("Error fetching enquiry:", err);
      setError("Failed to load enquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await authFetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update enquiry");
      }

      const updatedEnquiry = await res.json();
      setEnquiry(updatedEnquiry);

      // Show success message or redirect
      alert("Enquiry updated successfully");
    } catch (err) {
      console.error("Error updating enquiry:", err);
      setError("Failed to update enquiry. Please try again.");
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

      const res = await authFetch(`/api/enquiries/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete enquiry");
      }

      router.push("/admin/enquiries");
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      setError("Failed to delete enquiry. Please try again.");
    }
  };

  const downloadEnquiryAsPDF = async () => {
    try {
      const res = await authFetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "admission",
          id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }

      const data = await res.json();

      if (!data.pdfData) {
        throw new Error("No PDF data received");
      }

      // Create a link element to download the PDF
      const link = document.createElement("a");
      link.href = data.pdfData; // data URI string
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert(
        "Failed to generate PDF: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  };
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  if (!enquiry) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>Enquiry not found or could not be loaded.</p>
        <button
          onClick={handleCancel}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Enquiries
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
          Back to Enquiries List
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#8b1a1a]">Enquiry Details</h1>
        <div className="flex space-x-2">
          <button
            onClick={downloadEnquiryAsPDF}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Download size={16} className="mr-2" />
            Download PDF
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
              Enquiry Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Student Name
                </h3>
                <p className="mt-1 text-lg">{enquiry.studentName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Parent Name
                </h3>
                <p className="mt-1 text-lg">{enquiry.parentName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Class Applied For
                </h3>
                <p className="mt-1 text-lg">{enquiry.classApplied}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Mobile Number
                </h3>
                <p className="mt-1 text-lg flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-gray-400" />
                  {enquiry.mobileNumber}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-lg flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                  {enquiry.location}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Enquiry Date
                </h3>
                <p className="mt-1 text-lg flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  {formatDate(enquiry.createdAt)}
                </p>
              </div>

              {enquiry.enquiryNumber && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Enquiry Number
                  </h3>
                  <p className="mt-1 text-xl font-semibold text-blue-600">
                    #{enquiry.enquiryNumber}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Status</h2>

            <div className="mb-4">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                ${
                  enquiry.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : enquiry.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {enquiry.status === "approved" && (
                  <Check size={14} className="mr-1" />
                )}
                {enquiry.status === "rejected" && (
                  <X size={14} className="mr-1" />
                )}
                {enquiry.status === "pending" && (
                  <Calendar size={14} className="mr-1" />
                )}
                {enquiry.status.charAt(0).toUpperCase() +
                  enquiry.status.slice(1)}
              </span>
            </div>

            {enquiry.enquiryNumber && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="text-sm font-medium text-blue-700">
                  Approved with Enquiry Number:
                </h3>
                <p className="mt-1 text-lg font-semibold text-blue-800">
                  {enquiry.enquiryNumber}
                </p>
              </div>
            )}

            <div className="mt-4">
              <p className="text-sm text-gray-500">Last Updated:</p>
              <p className="text-sm font-medium">
                {formatDate(enquiry.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Process Enquiry
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
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

              {status === "approved" && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Note:</span> Approving this
                    enquiry will generate an enquiry number and notify the
                    parent. The student will be able to proceed with the
                    admission form using this enquiry number.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-6">
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
                rows={3}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Add any notes or comments about this enquiry"
              ></textarea>
            </div>

            <FormControls
              isSubmitting={isSubmitting}
              onCancel={handleCancel}
              submitText="Update Enquiry"
            />
          </form>
        </div>
      </div>

      <DeleteConfirmation
        title="Are you sure you want to delete this enquiry?"
        message="This action cannot be undone. All data associated with this enquiry will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
