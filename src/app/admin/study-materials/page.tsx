"use client";

import { useState, useEffect } from "react";
import { Upload, File, XCircle, Eye, Trash2 } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import NoData from "@/components/admin/NoData";
import { authFetch } from "@/lib/authFetch";

interface StudyMaterial {
  _id: string;
  title: string;
  description?: string;
  category: string;
  class?: string;
  type?: string;
  active: boolean;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export default function StudyMaterialsPage() {
  // Study Materials State
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [active, setActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    materialId: string | null;
  }>({
    isOpen: false,
    isDeleting: false,
    materialId: null,
  });

  // Predefined Categories and Classes
  const categories = [
    "School Brochure",
    "Academic Calendar",
    "Prescribed Booklist",
    "Annual Report",
    "Magazine",
    "Admission Form",
    "Transfer Certificate",
    "Syllabus",
    "Other",
  ];

  const classes = [
    "Nursery",
    "KG",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];

  // Allowed file types
  const allowedFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "image/jpeg",
    "image/png",
  ];

  // Maximum file size (10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  // Fetch Study Materials
  useEffect(() => {
    fetchStudyMaterials();
  }, []);

  // Fetch Study Materials Function
  const fetchStudyMaterials = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching study materials...");

      // Important: Add active=true to match what the download page is doing
      // This is likely why the download page shows documents but admin doesn't
      const response = await authFetch("/api/study-materials?active=true");

      if (!response.ok) {
        throw new Error("Failed to fetch study materials");
      }

      const data = await response.json();
      console.log("Fetched study materials:", data);

      // Handle both array and object with materials property
      let materials = data;
      if (
        !Array.isArray(data) &&
        data.materials &&
        Array.isArray(data.materials)
      ) {
        materials = data.materials;
        console.log("Extracted materials from response object:", materials);
      }

      setStudyMaterials(Array.isArray(materials) ? materials : []);
    } catch (err) {
      console.error("Error fetching study materials:", err);
      setError("Failed to load study materials");
    } finally {
      setIsLoading(false);
    }
  };

  // File Change Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Reset previous file errors
      setFileError(null);

      // Validate file type
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setFileError(
          "Invalid file type. Only PDF, DOCX, DOC, JPG, and PNG are allowed."
        );
        setFile(null);
        return;
      }

      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setFileError("File size exceeds 10MB limit.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors and messages
    setError(null);
    setFileError(null);
    setSuccessMessage(null);

    // Validate form fields
    if (!title || !category || !classFilter || !file) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", title);
      if (description) formData.append("description", description);
      formData.append("category", category);
      formData.append("class", classFilter);
      if (type) formData.append("type", type);
      formData.append("active", active.toString());
      formData.append("file", file);

      console.log("Submitting form data...");
      const response = await authFetch("/api/study-materials", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload study material");
      }

      const responseData = await response.json();
      console.log("Upload response:", responseData);

      // Show success message
      setSuccessMessage(
        responseData.message || "Study material uploaded successfully"
      );

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setClassFilter("");
      setType("");
      setFile(null);
      setActive(true);
      (document.getElementById("file-upload") as HTMLInputElement).value = "";

      // Refresh materials list
      await fetchStudyMaterials();
    } catch (err) {
      console.error("Error uploading study material:", err);
      setError(
        err instanceof Error ? err.message : "Failed to upload study material"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handler
  const handleDeleteClick = (materialId: string) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      materialId,
    });
  };

  const confirmDelete = async () => {
    if (!deleteModal.materialId) return;

    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

      const response = await authFetch(
        `/api/study-materials/${deleteModal.materialId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete study material");
      }

      // Remove deleted material from the list
      setStudyMaterials((prev) =>
        prev.filter((item) => item._id !== deleteModal.materialId)
      );

      // Show success message
      setSuccessMessage("Study material deleted successfully");

      // Close delete modal
      setDeleteModal({
        isOpen: false,
        isDeleting: false,
        materialId: null,
      });
    } catch (err) {
      console.error("Error deleting study material:", err);
      setError("Failed to delete study material");
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      materialId: null,
    });
  };

  // Cancel Handler
  const handleCancel = () => {
    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setClassFilter("");
    setType("");
    setFile(null);
    setActive(true);
    setError(null);
    setFileError(null);
    setSuccessMessage(null);
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Helper function to get file icon based on type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "application/pdf":
        return <File className="h-8 w-8 text-red-500" />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        return <File className="h-8 w-8 text-blue-500" />;
      case "image/jpeg":
      case "image/png":
        return <File className="h-8 w-8 text-green-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#8b1a1a]">Study Materials</h1>
        <p className="text-gray-600">
          Upload and manage school documents and study materials
        </p>
      </div>

      {/* Error and Success Messages */}
      {(error || fileError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error || fileError}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload New Document
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                rows={3}
              />
            </div>

            {/* Category Select */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Class Select */}
            <div>
              <label
                htmlFor="class"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Class <span className="text-red-500">*</span>
              </label>
              <select
                id="class"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Input */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Type
              </label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Optional additional type information"
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a] border-gray-300 rounded"
              />
              <label
                htmlFor="active"
                className="ml-2 block text-sm text-gray-900"
              >
                Active
              </label>
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Upload Document <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {file ? (
                    <div className="flex items-center">
                      {getFileIcon(file.type)}
                      <div className="ml-2">
                        <span className="text-sm text-gray-600">
                          {file.name}
                        </span>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          setFileError(null);
                          (
                            document.getElementById(
                              "file-upload"
                            ) as HTMLInputElement
                          ).value = "";
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PDF, DOCX, DOC, JPG, PNG (MAX. 10MB)
                      </p>
                    </div>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>

            <FormControls
              isSubmitting={isSubmitting}
              onCancel={handleCancel}
              submitText="Upload Document"
            />
          </form>
        </div>

        {/* Documents List */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Uploaded Documents
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-md h-32"></div>
              ))}
            </div>
          ) : studyMaterials.length === 0 ? (
            <NoData
              message="No documents uploaded yet"
              buttonText="Upload Document"
              href="#"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyMaterials.map((material) => (
                <div
                  key={material._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start">
                      <div className="mr-3">
                        {getFileIcon(material.fileType)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                          {material.title}
                        </h3>
                        {material.type && (
                          <p className="text-xs text-gray-500 mt-1">
                            {material.type}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {formatFileSize(material.fileSize)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                        ${
                          material.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {material.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    <p>
                      {material.category} - {material.class}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <a
                      href={material.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center text-sm bg-blue-50 text-blue-600 py-2 rounded-md hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </a>
                    <button
                      onClick={() => handleDeleteClick(material._id)}
                      className="flex-1 inline-flex items-center justify-center text-sm bg-red-50 text-red-600 py-2 rounded-md hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmation
        title="Are you sure you want to delete this document?"
        message="This action cannot be undone. The document will be permanently removed."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
