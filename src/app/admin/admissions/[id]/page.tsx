"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  Calendar,
  Download,
  Check,
  X,
  Eye,
  Edit,
  BookOpen,
} from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { authFetch } from "@/lib/authFetch";
import { use } from "react";

interface Academic {
  subject: string;
  maxMarks: number;
  marksObtained: number;
  percentage: number;
  remarks?: string;
}

interface Sibling {
  name: string;
  age: number;
  school?: string;
}

interface Admission {
  id: string;
  studentName: string;
  class: string;
  session: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup?: string;
  fatherName: string;
  fatherOccupation?: string;
  fatherEducation?: string;
  fatherMobile?: string;
  fatherEmail?: string;
  motherName: string;
  motherOccupation?: string;
  motherEducation?: string;
  motherMobile?: string;
  motherEmail?: string;
  residentialAddress: string;
  permanentAddress?: string;
  lastSchoolName?: string;
  lastClassAttended?: string;
  lastSchoolBoard?: string;
  transferCertificateNo?: string;
  transferCertificateDate?: string;
  transferCertificateDetails?: string;
  academics?: Academic[];
  category: string;
  aadharNo?: string;
  photoUrl?: string;
  photoPublicId?: string;
  birthCertificateUrl?: string;
  birthCertificatePublicId?: string;
  isSingleGirlChild: boolean;
  isSpeciallyAbled: boolean;
  isEWS: boolean;
  siblings?: Sibling[];
  status: "pending" | "reviewing" | "approved" | "rejected";
  notes?: string;
  admissionNo?: string;
  slNo?: string;
  enquiryId: string;
  enquiryNumber: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [isLoading, setIsLoading] = useState(true);
  const [admission, setAdmission] = useState<Admission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<
    "pending" | "reviewing" | "approved" | "rejected"
  >("pending");
  const [admissionNo, setAdmissionNo] = useState("");
  const [slNo, setSlNo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  });

  useEffect(() => {
    fetchAdmission();
  }, [id]);

  const fetchAdmission = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/admissions/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch admission");
      }

      const data = await res.json();
      setAdmission(data);
      setStatus(data.status || "pending");
      setNotes(data.notes || "");
      setAdmissionNo(data.admissionNo || "");
      setSlNo(data.slNo || "");
    } catch (err) {
      console.error("Error fetching admission:", err);
      setError("Failed to load admission. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await authFetch(`/api/admissions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          notes,
          slNo,
          admissionNo,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update admission");
      }

      const updatedAdmission = await res.json();
      setAdmission(updatedAdmission);

      // Show success message
      alert("Admission updated successfully");
    } catch (err) {
      console.error("Error updating admission:", err);
      setError("Failed to update admission. Please try again.");
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

      const res = await authFetch(`/api/admissions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete admission");
      }

      router.push("/admin/admissions");
    } catch (err) {
      console.error("Error deleting admission:", err);
      setError("Failed to delete admission. Please try again.");
    }
  };

  const downloadAdmissionAsPDF = async () => {
    try {
      const res = await authFetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "enquiry",
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

  if (!admission) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>Admission not found or could not be loaded.</p>
        <button
          onClick={handleCancel}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Admissions
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
          Back to Admissions List
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#8b1a1a]">Admission Details</h1>
        <div className="flex space-x-2">
          <button
            onClick={downloadAdmissionAsPDF}
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
              Application Information
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-700 flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Enquiry Information
                </h3>
                <Link
                  href={`/admin/enquiries/${admission.enquiryId}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Enquiry
                </Link>
              </div>
              <p className="text-blue-800 font-medium">
                Enquiry #: {admission.enquiryNumber}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Student Name
                </h3>
                <p className="mt-1 text-lg">{admission.studentName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Class</h3>
                <p className="mt-1 text-lg">{admission.class}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Session</h3>
                <p className="mt-1 text-lg">{admission.session}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <p className="mt-1 text-lg">{admission.gender}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Date of Birth
                </h3>
                <p className="mt-1 text-lg">
                  {formatDate(admission.dateOfBirth)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Blood Group
                </h3>
                <p className="mt-1 text-lg">
                  {admission.bloodGroup || "Not specified"}
                </p>
              </div>
            </div>

            <hr className="my-6" />

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Parent Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Father&apos;s Information
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Name:</span>{" "}
                      {admission.fatherName}
                    </p>
                    <p>
                      <span className="text-gray-500">Occupation:</span>{" "}
                      {admission.fatherOccupation || "Not specified"}
                    </p>
                    <p>
                      <span className="text-gray-500">Education:</span>{" "}
                      {admission.fatherEducation || "Not specified"}
                    </p>
                    <p>
                      <span className="text-gray-500">Mobile:</span>{" "}
                      {admission.fatherMobile || "Not specified"}
                    </p>
                    <p>
                      <span className="text-gray-500">Email:</span>{" "}
                      {admission.fatherEmail || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Mother&apos;s Information
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Name:</span>{" "}
                      {admission.motherName}
                    </p>
                    <p>
                      <span className="text-gray-500">Occupation:</span>{" "}
                      {admission.motherOccupation || "Not specified"}
                    </p>
                    <p>
                      <span className="text-gray-500">Education:</span>{" "}
                      {admission.motherEducation || "Not specified"}
                    </p>
                    <p>
                      <span className="text-gray-500">Mobile:</span>{" "}
                      {admission.motherMobile || "Not specified"}
                    </p>
                    <p>
                      <span className="text-gray-500">Email:</span>{" "}
                      {admission.motherEmail || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-6" />

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Residential Address
                  </h4>
                  <p className="text-gray-700">
                    {admission.residentialAddress}
                  </p>
                </div>

                {admission.permanentAddress && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Permanent Address
                    </h4>
                    <p className="text-gray-700">
                      {admission.permanentAddress}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {admission.photoUrl && (
              <div className="col-span-2 mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Student Photo
                </h3>
                <div className="relative h-48 w-40 border border-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={admission.photoUrl}
                    alt={`Photo of ${admission.studentName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
            {admission.birthCertificateUrl && (
              <div className="col-span-2 mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Birth Certificate
                </h3>
                <div className="flex items-center space-x-2">
                  <a
                    href={admission.birthCertificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Document
                  </a>
                  <a
                    href={admission.birthCertificateUrl}
                    download
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 inline-flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </div>
              </div>
            )}
            {admission.lastSchoolName && (
              <>
                <hr className="my-6" />

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Previous School Information
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p>
                          <span className="text-gray-500">School Name:</span>{" "}
                          {admission.lastSchoolName}
                        </p>
                        <p>
                          <span className="text-gray-500">Class Attended:</span>{" "}
                          {admission.lastClassAttended || "Not specified"}
                        </p>
                        <p>
                          <span className="text-gray-500">Board:</span>{" "}
                          {admission.lastSchoolBoard || "Not specified"}
                        </p>
                      </div>

                      {admission.transferCertificateNo && (
                        <div>
                          <p>
                            <span className="text-gray-500">TC Number:</span>{" "}
                            {admission.transferCertificateNo}
                          </p>
                          <p>
                            <span className="text-gray-500">TC Date:</span>{" "}
                            {formatDate(admission.transferCertificateDate)}
                          </p>
                          <p>
                            <span className="text-gray-500">TC Details:</span>{" "}
                            {admission.transferCertificateDetails ||
                              "Not specified"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Academic Results */}
                    {admission.academics && admission.academics.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">
                          Previous Academic Results
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Subject
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Max Marks
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Marks Obtained
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Percentage
                                </th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                  Remarks
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {admission.academics.map(
                                (academic: Academic, index: number) => (
                                  <tr key={index}>
                                    <td className="px-4 py-2 text-sm">
                                      {academic.subject}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {academic.maxMarks}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {academic.marksObtained}
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {academic.percentage}%
                                    </td>
                                    <td className="px-4 py-2 text-sm">
                                      {academic.remarks || "-"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Additional Information */}
            <hr className="my-6" />

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-500">Category:</span>{" "}
                      {admission.category}
                    </p>
                    {admission.aadharNo && (
                      <p>
                        <span className="text-gray-500">Aadhar Number:</span>{" "}
                        {admission.aadharNo}
                      </p>
                    )}
                    <p>
                      <span className="text-gray-500">Single Girl Child:</span>{" "}
                      {admission.isSingleGirlChild ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="text-gray-500">Specially Abled:</span>{" "}
                      {admission.isSpeciallyAbled ? "Yes" : "No"}
                    </p>
                    <p>
                      <span className="text-gray-500">EWS Category:</span>{" "}
                      {admission.isEWS ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                {admission.siblings && admission.siblings.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Siblings Information
                    </h4>
                    {admission.siblings.map(
                      (
                        sibling: { name: string; age: number; school?: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="mb-2 pb-2 border-b border-gray-200 last:border-0"
                        >
                          <p>
                            <span className="text-gray-500">Name:</span>{" "}
                            {sibling.name}
                          </p>
                          <p>
                            <span className="text-gray-500">Age:</span>{" "}
                            {sibling.age}
                          </p>
                          <p>
                            <span className="text-gray-500">School:</span>{" "}
                            {sibling.school || "Not specified"}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Application Metadata */}
            <hr className="my-6" />

            <div className="flex justify-between text-sm text-gray-500">
              <p>Application Date: {formatDate(admission.createdAt)}</p>
              <p>Last Updated: {formatDate(admission.updatedAt)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Admission Status
            </h2>

            <div className="mb-4">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                ${
                  status === "approved"
                    ? "bg-green-100 text-green-800"
                    : status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : status === "reviewing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {status === "approved" && <Check size={14} className="mr-1" />}
                {status === "rejected" && <X size={14} className="mr-1" />}
                {status === "reviewing" && <Edit size={14} className="mr-1" />}
                {status === "pending" && (
                  <Calendar size={14} className="mr-1" />
                )}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>

            {admission.admissionNo && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-sm font-medium text-green-700">
                  Admission Number:
                </h3>
                <p className="mt-1 text-lg font-semibold text-green-800">
                  {admission.admissionNo}
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
                        status === "reviewing"
                          ? "bg-blue-50 border-2 border-blue-400"
                          : "bg-white border border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value="reviewing"
                        checked={status === "reviewing"}
                        onChange={() => setStatus("reviewing")}
                        className="sr-only"
                      />
                      <span className="flex items-center">
                        <Edit className="h-5 w-5 mr-2 text-blue-500" />
                        <span>Reviewing</span>
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

                {status === "approved" && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <h3 className="text-sm font-medium text-green-700 mb-2">
                      Admission Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="admissionNo"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Admission Number
                        </label>
                        <input
                          type="text"
                          id="admissionNo"
                          value={admissionNo}
                          onChange={(e) => setAdmissionNo(e.target.value)}
                          placeholder="e.g., ADM230001"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="slNo"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Serial Number
                        </label>
                        <input
                          type="text"
                          id="slNo"
                          value={slNo}
                          onChange={(e) => setSlNo(e.target.value)}
                          placeholder="e.g., 001"
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
                    placeholder="Add internal notes about this application"
                  ></textarea>
                </div>

                <FormControls
                  isSubmitting={isSubmitting}
                  onCancel={handleCancel}
                  submitText="Update Admission"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        title="Are you sure you want to delete this admission application?"
        message="This action cannot be undone. All data associated with this application will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
