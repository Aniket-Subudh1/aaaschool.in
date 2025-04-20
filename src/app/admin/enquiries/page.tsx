"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Phone,
  MapPin,
  Search,
  XCircle,
  Filter,
  Eye,
  Download,
  Calendar,
} from "lucide-react";
import NoData from "@/components/admin/NoData";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";

type Enquiry = {
  _id: string;
  studentName: string;
  parentName: string;
  classApplied: string;
  enquiryNumber?: string;
  mobileNumber: string;
  location: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    enquiryId: string | null;
  }>({
    isOpen: false,
    isDeleting: false,
    enquiryId: null,
  });

  useEffect(() => {
    fetchEnquiries();
  }, [filterStatus]);

  const fetchEnquiries = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const queryParams = filterStatus ? `?status=${filterStatus}` : "";
      const res = await authFetch(`/api/enquiries${queryParams}`);

      if (!res.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      const data = await res.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setError("Failed to load enquiries. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (enquiryId: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      enquiryId,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.enquiryId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const res = await authFetch(`/api/enquiries/${deleteModal.enquiryId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete enquiry");
      }

      // Remove deleted enquiry from the list
      setEnquiries((prev) =>
        prev.filter((item) => item._id !== deleteModal.enquiryId)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting enquiry:", err);
      setError("Failed to delete enquiry. Please try again.");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      enquiryId: null,
    });
  };

  const downloadEnquiryAsPDF = async (enquiryId: string) => {
    try {
      const res = await authFetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "enquiry",
          id: enquiryId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate PDF");
      }

      const data = await res.json();

      // In a real implementation, you would redirect to the PDF URL or use a download link
      alert(
        `PDF generated successfully. In a production environment, this would download: ${data.pdf.filename}`
      );
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate PDF");
    }
  };

  // Filter enquiries based on search query
  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.parentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.enquiryNumber
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      enquiry.mobileNumber?.includes(searchQuery)
  );

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">
            Admission Enquiries
          </h1>
          <p className="text-gray-600">
            Manage and process admission enquiries
          </p>
        </div>
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
              placeholder="Search by name, enquiry number or mobile"
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
            />
          </div>
          <div className="relative">
            <button
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} className="mr-2" />
              {filterStatus ? `Status: ${filterStatus}` : "Filter by Status"}
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setFilterStatus(null);
                    setIsFilterOpen(false);
                  }}
                >
                  Show All
                </button>
                {["pending", "approved", "rejected"].map((status) => (
                  <button
                    key={status}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      filterStatus === status
                        ? "bg-gray-100 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setFilterStatus(status);
                      setIsFilterOpen(false);
                    }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
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
        ) : filteredEnquiries.length === 0 ? (
          <NoData message="No enquiries found" buttonText="Refresh" href="#" />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Enquiry Details
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
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
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-[#8b1a1a]" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {enquiry.studentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Parent:</span>{" "}
                            {enquiry.parentName}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Class:</span>{" "}
                            {enquiry.classApplied}
                          </div>
                          {enquiry.enquiryNumber && (
                            <div className="text-sm text-blue-600 font-medium mt-1">
                              #{enquiry.enquiryNumber}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-gray-500" />
                        {enquiry.mobileNumber}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        {enquiry.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          enquiry.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : enquiry.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {enquiry.status.charAt(0).toUpperCase() +
                          enquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {formatDate(enquiry.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/admin/enquiries/${enquiry._id}`}
                          className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => downloadEnquiryAsPDF(enquiry._id)}
                          className="text-green-600 hover:text-green-900 px-2 py-1 rounded hover:bg-green-50"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(enquiry._id)}
                          className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                        >
                          <XCircle className="h-5 w-5" />
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
