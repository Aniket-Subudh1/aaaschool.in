"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, Calendar, Loader2 } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

type NewsBulletin = {
  _id: string;
  title: string;
  imageUrl: string;
  imagePublicId: string;
  publishDate: string;
  active: boolean;
  createdAt: string;
};

export default function EditNewsBulletinPage() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bulletin, setBulletin] = useState<NewsBulletin | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    publishDate: new Date().toISOString().split("T")[0],
    active: true,
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBulletin();
  }, [id]);

  const fetchBulletin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/news-bulletins/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch news bulletin");
      }

      const data = await res.json();
      setBulletin(data);

      // Format date to YYYY-MM-DD
      const publishDate = new Date(data.publishDate);
      const formattedDate = publishDate.toISOString().split("T")[0];

      setFormData({
        title: data.title,
        publishDate: formattedDate,
        active: data.active,
      });

      setImagePreview(data.imageUrl);
    } catch (err) {
      console.error("Error fetching news bulletin:", err);
      setError("Failed to load news bulletin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

    setNewImage(file);

    // Revoke previous preview URL if exists
    if (imagePreview !== null && imagePreview !== bulletin?.imageUrl) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };

  const resetImage = () => {
    if (bulletin) {
      // If we have a new image preview, revoke it
      if (
        newImage &&
        imagePreview !== null &&
        imagePreview !== bulletin.imageUrl
      ) {
        URL.revokeObjectURL(imagePreview);
      }

      setNewImage(null);
      setImagePreview(bulletin.imageUrl);

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
        throw new Error("Bulletin title is required");
      }

      // Create FormData for submission
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("publishDate", formData.publishDate);
      submitData.append("active", formData.active.toString());

      // Only include image if there's a new one
      if (newImage) {
        submitData.append("image", newImage);
      }

      const res = await authFetch(`/api/news-bulletins/${id}`, {
        method: "PUT",
        body: submitData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update news bulletin");
      }

      // Redirect to news bulletins list
      router.push("/admin/gallery/news-bulletins");
    } catch (err) {
      console.error("Error updating news bulletin:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update news bulletin"
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="animate-spin text-[#8b1a1a]" />
      </div>
    );
  }

  if (!bulletin) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>News bulletin not found or could not be loaded.</p>
        <button
          onClick={handleCancel}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to News Bulletins
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
          <h1 className="text-2xl font-bold text-[#8b1a1a]">
            Edit News Bulletin
          </h1>
          <p className="text-gray-600">Update bulletin details</p>
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
              Bulletin Image
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
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 mb-2 text-center w-64">
                <p className="text-sm text-gray-500">
                  No image preview available
                </p>
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
                {newImage ? "Change Image" : "Upload New Image"}
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
            submitText={isSubmitting ? "Saving..." : "Save Changes"}
          />
        </form>
      </div>
    </div>
  );
}
