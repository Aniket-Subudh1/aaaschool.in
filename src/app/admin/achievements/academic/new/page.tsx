"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  GraduationCap,
  Upload,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

export default function AddAcademicAchievementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    marks: "",
    stream: "",
    achievement: "",
    year: new Date().getFullYear().toString(),
    active: true,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Photo file is too large. Maximum size is 5MB.");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Selected file is not an image.");
        return;
      }

      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.class ||
      !formData.marks ||
      !formData.stream.trim() ||
      !formData.achievement.trim() ||
      !formData.year
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate marks
    const marksNumber = parseFloat(formData.marks);
    if (isNaN(marksNumber) || marksNumber < 0 || marksNumber > 100) {
      setError("Marks must be a valid number between 0 and 100");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Create FormData object
      const submitFormData = new FormData();

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, String(value));
      });

      // Add photo file if available
      if (photoFile) {
        submitFormData.append("photo", photoFile);
      }

      const res = await authFetch("/api/achievements/academic", {
        method: "POST",
        body: submitFormData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create academic achievement");
      }

      setSuccessMessage("Academic achievement created successfully!");

      // Clear form
      setFormData({
        name: "",
        class: "",
        marks: "",
        stream: "",
        achievement: "",
        year: new Date().getFullYear().toString(),
        active: true,
      });
      setPhotoFile(null);
      setPhotoPreview(null);

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/achievements/academic");
      }, 2000);
    } catch (err) {
      console.error("Error creating academic achievement:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create academic achievement"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Class options
  const classOptions = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  // Stream options
  const streamOptions = [
    "Science",
    "Commerce",
    "Arts",
    "Mathematics",
    "Biology",
    "Physics",
    "Chemistry",
    "Computer Science",
    "English",
    "Hindi",
    "Social Science",
    "General",
  ];

  // Year options (last 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/achievements/academic"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Academic Achievements
        </Link>
      </div>

      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-green-50 text-green-600 mr-3">
          <GraduationCap size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#8b1a1a]">
          Add New Academic Achievement
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6 flex items-center">
          <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{successMessage}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="class"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  required
                >
                  <option value="">Select class</option>
                  {classOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="marks"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Marks (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="marks"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter marks percentage"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="stream"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Stream/Subject <span className="text-red-500">*</span>
                </label>
                <select
                  id="stream"
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  required
                >
                  <option value="">Select stream/subject</option>
                  {streamOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="other">Other (enter manually)</option>
                </select>
              </div>

              {formData.stream === "other" && (
                <div>
                  <label
                    htmlFor="customStream"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Custom Stream/Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customStream"
                    name="stream"
                    value={formData.stream === "other" ? "" : formData.stream}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="Enter stream/subject name"
                    required
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Year <span className="text-red-500">*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  required
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="achievement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Achievement Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="achievement"
                  name="achievement"
                  value={formData.achievement}
                  onChange={handleChange}
                  rows={5}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Describe the academic achievement (e.g., School Topper, Subject Excellence, Merit Certificate, etc.)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {photoPreview ? (
                    <div className="space-y-2 w-full text-center">
                      <div className="relative h-40 mx-auto">
                        <Image
                          src={photoPreview}
                          alt="Photo Preview"
                          fill
                          className="object-contain rounded-md"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoFile(null);
                          setPhotoPreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove photo
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="photo-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-[#8b1a1a] hover:text-[#8b1a1a]/80 focus-within:outline-none"
                        >
                          <span>Upload a photo</span>
                          <input
                            id="photo-upload"
                            name="photo"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB (optional)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300 rounded"
                />
                <label
                  htmlFor="active"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Active (display on website)
                </label>
              </div>
            </div>
          </div>

          <FormControls
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            submitText="Create Achievement"
          />
        </form>
      </div>
    </div>
  );
}