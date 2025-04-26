"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  ArrowLeft,
  Upload,
  XCircle,
  GraduationCap,
  Briefcase,
  Instagram,
} from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

export default function AdminAlumniProfileEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    graduationYear: "",
    currentPosition: "",
    company: "",
    achievement: "",
    instagramPostUrl: "",
    category: "",
    active: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Year options (last 50 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 50 }, (_, i) =>
    (currentYear - i).toString()
  );

  // Category suggestions
  const categoryOptions = [
    "Engineering",
    "Medicine",
    "Business",
    "Law",
    "Education",
    "Arts",
    "Sciences",
    "Technology",
    "Sports",
    "Government",
    "Entrepreneurship",
    "Other",
  ];

  useEffect(() => {
    const fetchAlumniProfileDetails = async () => {
      try {
        setIsLoading(true);
        const res = await authFetch(`/api/achievements/alumni/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch alumni profile details");
        }

        const data = await res.json();
        setFormData({
          name: data.name,
          graduationYear: data.graduationYear,
          currentPosition: data.currentPosition,
          company: data.company,
          achievement: data.achievement,
          instagramPostUrl: data.instagramPostUrl || "",
          category: data.category || "",
          active: data.active,
        });
        setCurrentImageUrl(data.imageUrl);
      } catch (err) {
        console.error("Error fetching alumni profile:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumniProfileDetails();
  }, [id]);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image file is too large. Maximum size is 5MB.");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Selected file is not an image.");
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const validateInstagramUrl = (url: string) => {
    if (!url) return true;
    const regex = /^https:\/\/(www\.)?instagram\.com\/p\/[\w-]+\/?/;
    return regex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.graduationYear ||
      !formData.currentPosition.trim() ||
      !formData.company.trim() ||
      !formData.achievement.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate Instagram URL if provided
    if (
      formData.instagramPostUrl &&
      !validateInstagramUrl(formData.instagramPostUrl)
    ) {
      setError(
        "Please enter a valid Instagram post URL (e.g., https://www.instagram.com/p/ABCDEF/)"
      );
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

      // Add image file if available
      if (imageFile) {
        submitFormData.append("image", imageFile);
      }

      const res = await authFetch(`/api/achievements/alumni/${id}`, {
        method: "PUT",
        body: submitFormData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update alumni profile");
      }

      // Redirect to alumni list
      router.push("/admin/achievements/alumni");
    } catch (err) {
      console.error("Error updating alumni profile:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update alumni profile"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="animate-pulse p-6">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/achievements/alumni"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Alumni
        </Link>
      </div>

      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
          <Users size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#8b1a1a]">
          Edit Alumni Profile
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6 flex items-center">
          <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Basic Info */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alumni Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter alumni name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="graduationYear"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Graduation Year <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap size={16} className="text-gray-400" />
                  </div>
                  <select
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    required
                  >
                    <option value="">Select graduation year</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="currentPosition"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Position <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="currentPosition"
                    name="currentPosition"
                    value={formData.currentPosition}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="E.g., Software Engineer, Doctor, etc."
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Company/Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter company or organization name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Field/Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                >
                  <option value="">Select a field (optional)</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="achievement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Achievement/Success Story{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="achievement"
                  name="achievement"
                  value={formData.achievement}
                  onChange={handleChange}
                  rows={5}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Describe their achievements, success story, or contribution to their field"
                  required
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="instagramPostUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instagram Post URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Instagram size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="instagramPostUrl"
                    name="instagramPostUrl"
                    value={formData.instagramPostUrl}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="https://www.instagram.com/p/ABCDEF/"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a public Instagram post URL to display on the website
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {imagePreview || currentImageUrl ? (
                    <div className="space-y-2 w-full text-center">
                      <div className="relative h-40 mx-auto">
                        <Image
                          src={imagePreview || currentImageUrl!}
                          alt="Profile Preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain rounded-md"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-[#8b1a1a] hover:text-[#8b1a1a]/80 focus-within:outline-none"
                        >
                          <span>Upload an image</span>
                          <input
                            id="image-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
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
            submitText="Update Alumni Profile"
          />
        </form>
      </div>
    </div>
  );
}
