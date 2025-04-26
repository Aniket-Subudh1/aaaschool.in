"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

export default function AddSportsAchievementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    event: "",
    award: "",
    year: new Date().getFullYear().toString(),
    active: true,
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.class.trim() ||
      !formData.event.trim() ||
      !formData.award.trim() ||
      !formData.year.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await authFetch("/api/achievements/sports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create sports achievement");
      }

      setSuccessMessage("Sports achievement created successfully!");

      // Clear form
      setFormData({
        name: "",
        class: "",
        event: "",
        award: "",
        year: new Date().getFullYear().toString(),
        active: true,
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/achievements/sports");
      }, 2000);
    } catch (err) {
      console.error("Error creating sports achievement:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create sports achievement"
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

  // Event suggestions
  const eventOptions = [
    "National Taekwondo Championship",
    "Inter-School Table Tennis",
    "District Chess Tournament",
    "State Swimming Competition",
    "Annual Sports Meet",
    "Badminton Championship",
    "Football Tournament",
    "Cricket Cup",
    "Volleyball Championship",
    "Basketball Tournament",
    "Karate Championship",
    "Athletics Meet",
  ];

  // Award options
  const awardOptions = [
    "Gold (POOMSAE)",
    "Silver (POOMSAE)",
    "Bronze (POOMSAE)",
    "Gold",
    "Silver",
    "Bronze",
    "First Position",
    "Second Position",
    "Third Position",
    "Participant",
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
          href="/admin/achievements/sports"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Sports Achievements
        </Link>
      </div>

      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-red-50 text-red-600 mr-3">
          <Trophy size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#8b1a1a]">
          Add New Sports Achievement
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
                htmlFor="event"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event <span className="text-red-500">*</span>
              </label>
              <select
                id="event"
                name="event"
                value={formData.event}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                required
              >
                <option value="">Select event</option>
                {eventOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="other">Other (enter manually)</option>
              </select>
            </div>

            {formData.event === "other" && (
              <div>
                <label
                  htmlFor="customEvent"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Custom Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customEvent"
                  name="event"
                  value={formData.event === "other" ? "" : formData.event}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter event name"
                  required
                />
              </div>
            )}

            <div>
              <label
                htmlFor="award"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Award <span className="text-red-500">*</span>
              </label>
              <select
                id="award"
                name="award"
                value={formData.award}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                required
              >
                <option value="">Select award</option>
                {awardOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value="other">Other (enter manually)</option>
              </select>
            </div>

            {formData.award === "other" && (
              <div>
                <label
                  htmlFor="customAward"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Custom Award <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customAward"
                  name="award"
                  value={formData.award === "other" ? "" : formData.award}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter award name"
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
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

            <div className="flex items-center mt-8">
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
