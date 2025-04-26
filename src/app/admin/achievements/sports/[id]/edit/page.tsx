"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Trophy, ArrowLeft, XCircle, Calendar } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";

export default function AdminSportsAchievementEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    event: "",
    award: "",
    year: "",
    active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    "Other",
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
    "Other",
  ];

  // Year options (last 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  useEffect(() => {
    const fetchAchievementDetails = async () => {
      try {
        setIsLoading(true);
        const res = await authFetch(`/api/achievements/sports/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch sports achievement details");
        }

        const data = await res.json();
        setFormData({
          name: data.name,
          class: data.class,
          event: data.event,
          award: data.award,
          year: data.year,
          active: data.active,
        });
      } catch (err) {
        console.error("Error fetching sports achievement:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievementDetails();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.class ||
      !formData.event.trim() ||
      !formData.award.trim() ||
      !formData.year
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await authFetch(`/api/achievements/sports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update sports achievement");
      }

      // Redirect to sports achievements list
      router.push("/admin/achievements/sports");
    } catch (err) {
      console.error("Error updating sports achievement:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update sports achievement"
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
          Edit Sports Achievement
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
              </select>
            </div>

            {formData.event === "Other" && (
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
                  value={formData.event === "Other" ? "" : formData.event}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter custom event name"
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
              </select>
            </div>

            {formData.award === "Other" && (
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
                  value={formData.award === "Other" ? "" : formData.award}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter custom award name"
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
                  <option value="">Select year</option>
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
            submitText="Update Achievement"
          />
        </form>
      </div>
    </div>
  );
}
