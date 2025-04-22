"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Youtube } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

export default function NewVideoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);

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

      // Extract YouTube ID for preview
      if (name === "youtubeUrl") {
        const youtubeId = extractYouTubeId(value);
        setPreviewId(youtubeId);
      }
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (!formData.title.trim() || !formData.youtubeUrl.trim()) {
        throw new Error("Title and YouTube URL are required");
      }

      // Validate YouTube URL
      const youtubeId = extractYouTubeId(formData.youtubeUrl);
      if (!youtubeId) {
        throw new Error("Please enter a valid YouTube URL");
      }

      const res = await authFetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add video");
      }

      // Redirect to videos list
      router.push("/admin/gallery/videos");
    } catch (err) {
      console.error("Error adding video:", err);
      setError(err instanceof Error ? err.message : "Failed to add video");
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
          Back to Videos
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Add New Video</h1>
          <p className="text-gray-600">Add a YouTube video to the gallery</p>
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
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
              placeholder="Enter video description (optional)"
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="youtubeUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              YouTube URL <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Youtube size={18} className="text-gray-400" />
              </div>
              <input
                type="url"
                id="youtubeUrl"
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleChange}
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="e.g. https://www.youtube.com/watch?v=XXXXXXXX"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Enter a valid YouTube URL (e.g.,
              https://www.youtube.com/watch?v=XXXXXXXX)
            </p>
          </div>

          {previewId && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preview
              </label>
              <div className="w-full bg-gray-100 p-2 rounded-md">
                <div className="relative aspect-video w-full max-w-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${previewId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-md"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

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
                Make video visible on website
              </span>
            </label>
          </div>

          <FormControls
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            submitText={isSubmitting ? "Adding..." : "Add Video"}
          />
        </form>
      </div>
    </div>
  );
}
