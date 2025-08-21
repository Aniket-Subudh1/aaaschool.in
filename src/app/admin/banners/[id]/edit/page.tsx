"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Calendar, Link as LinkIcon, Loader2 } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

type Banner = {
  _id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  order: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
};

export default function EditBannerPage() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [banner, setBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    linkUrl: "",
    order: 0,
    active: true,
    startDate: "",
    endDate: "",
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanner();
  }, [id]);

  const fetchBanner = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/banners/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch banner");
      }

      const data = await res.json();
      setBanner(data);

      // Format dates for input fields
      const startDate = data.startDate ? new Date(data.startDate).toISOString().split("T")[0] : "";
      const endDate = data.endDate ? new Date(data.endDate).toISOString().split("T")[0] : "";

      setFormData({
        title: data.title,
        linkUrl: data.linkUrl || "",
        order: data.order || 0,
        active: data.active,
        startDate: startDate,
        endDate: endDate,
      });

      setImagePreview(data.imageUrl);
    } catch (err) {
      console.error("Error fetching banner:", err);
      setError("Failed to load banner. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
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
      setError("Invalid file type. Only JPEG, PNG, and WebP images are allowed");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 5MB");
      return;
    }

    setNewImage(file);

    // Revoke previous preview URL if exists
    if (imagePreview !== null && imagePreview !== banner?.imageUrl) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const resetImage = () => {
    if (banner) {
      // If we have a new image preview, revoke it
      if (newImage && imagePreview !== null && imagePreview !== banner.imageUrl) {
        URL.revokeObjectURL(imagePreview);
      }

      setNewImage(null);
      setImagePreview(banner.imageUrl);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (!formData.title.trim()) {
        throw new Error("Banner title is required");
      }

      // Create FormData for submission
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("linkUrl", formData.linkUrl);
      submitData.append("order", formData.order.toString());
      submitData.append("active", formData.active.toString());
      if (formData.startDate) submitData.append("startDate", formData.startDate);
      if (formData.endDate) submitData.append("endDate", formData.endDate);

      // Only include image if there's a new one
      if (newImage) {
        submitData.append("image", newImage);
      }

      const res = await authFetch(`/api/banners/${id}`, {
        method: "PUT",
        body: submitData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update banner");
      }

      // Redirect to banners list
      router.push("/admin/banners");
    } catch (err) {
      console.error("Error updating banner:", err);
      setError(err instanceof Error ? err.message : "Failed to update banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="animate-spin text-[#8b1a1a]" />
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>Banner not found or could not be loaded.</p>
        <button
          onClick={handleCancel}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Banners
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
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Edit Banner</h1>
          <p className="text-gray-600">Update banner details</p>
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
              Banner Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
              placeholder="Enter banner title"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="linkUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Link URL (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon size={18} className="text-gray-400" />
              </div>
              <input
                type="url"
                id="linkUrl"
                name="linkUrl"
                value={formData.linkUrl}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="https://example.com"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Optional link when banner is clicked
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="order"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Display Order
              </label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleChange}
                min="0"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="0"
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers appear first in slider
              </p>
            </div>

            <div className="flex items-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-[#8b1a1a] shadow-sm focus:border-[#8b1a1a] focus:ring focus:ring-[#8b1a1a]/20"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Make banner active
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image
            </p>

            {imagePreview ? (
              <div className="relative border border-gray-300 rounded-md p-2 mb-2 w-full max-w-lg">
                <Image
                  src={imagePreview}
                  alt="Banner preview"
                  width={500}
                  height={250}
                  className="object-cover h-64 rounded-md w-full"
                />
                {newImage && (
                  <button
                    type="button"
                    onClick={resetImage}
                    className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 mb-2 text-center w-full max-w-lg">
                <p className="text-sm text-gray-500">No image preview available</p>
              </div>
            )}

            <div>
              <input
                type="file"
                id="bannerImage"
                name="bannerImage"
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
                {newImage ? "Change Image" : "Upload New Image"}
              </button>
              <p className="mt-1 text-xs text-gray-500">
                JPEG, PNG or WebP. Max 5MB. Recommended: 1200x600px
              </p>
            </div>
          </div>

          <FormControls
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            submitText={isSubmitting ? "Saving..." : "Save Changes"}
          />
        </form>
      </div>
    </div>
  );
}