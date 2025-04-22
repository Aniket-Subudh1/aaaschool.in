"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, ImageOff, Calendar } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

export default function NewNewsBulletinPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    publishDate: new Date().toISOString().split("T")[0], // Default to today
    active: true,
  });
  const [bulletinImage, setBulletinImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed"
      );
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 5MB");
      return;
    }

    setBulletinImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const removeImage = () => {
    setBulletinImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (!formData.title.trim()) {
        throw new Error("Bulletin title is required");
      }

      if (!bulletinImage) {
        throw new Error("Please upload an image for the news bulletin");
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("publishDate", formData.publishDate);
      submitData.append("active", formData.active.toString());
      submitData.append("image", bulletinImage);

      const res = await authFetch("/api/news-bulletins", {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create news bulletin");
      }

      // Redirect to news bulletins list
      router.push("/admin/gallery/news-bulletins");
    } catch (err) {
      console.error("Error creating news bulletin:", err);
      setError(
        err instanceof Error ? err.message : "Failed to create news bulletin"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to News Bulletins
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#8b1a1a]">
            Add News Bulletin
          </h1>
          <p className="text-gray-600">
            Add a new bulletin to the school news section
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mx-6 mt-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bulletin Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
              placeholder="Enter bulletin title"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="publishDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Publish Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Bulletin Image <span className="text-red-500">*</span>
            </p>

            {imagePreview ? (
              <div className="relative border border-gray-300 rounded-md p-2 mb-2 w-64">
                <Image
                  src={imagePreview}
                  alt="Bulletin image preview"
                  width={240}
                  height={160}
                  className="object-cover h-40 rounded-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 mb-2 text-center w-64">
                <ImageOff size={40} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No image selected</p>
              </div>
            )}

            <div>
              <input
                type="file"
                id="bulletinImage"
                name="bulletinImage"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <Upload size={16} className="mr-2" />
                {bulletinImage ? "Change Image" : "Upload Image"}
              </button>
              <p className="mt-1 text-xs text-gray-500">
                JPEG, PNG or WebP. Max 5MB.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="rounded border-gray-300 text-[#8b1a1a] shadow-sm focus:border-[#8b1a1a] focus:ring focus:ring-[#8b1a1a]/20"
              />
              <span className="ml-2 text-sm text-gray-700">
                Make bulletin visible on website
              </span>
            </label>
          </div>

          <FormControls
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            submitText={isSubmitting ? "Creating..." : "Create Bulletin"}
          />
        </form>
      </div>
    </div>
  );
}
