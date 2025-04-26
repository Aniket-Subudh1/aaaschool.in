"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  ArrowLeft,
  Calendar,
  Edit,
  Tag,
  Users,
  Eye,
  GraduationCap,
} from "lucide-react";
import { authFetch } from "@/lib/authFetch";

interface SportsAchievement {
  name: string;
  class: string;
  event: string;
  award: string;
  year: string | number;
  active: boolean;
}

export default function AdminSportsAchievementViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [achievement, setAchievement] = useState<SportsAchievement | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        setIsLoading(true);
        const res = await authFetch(`/api/achievements/sports/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch sports achievement details");
        }

        const data = await res.json();
        setAchievement(data);
      } catch (err) {
        console.error("Error fetching sports achievement:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievement();
  }, [id]);

  const getAwardClass = (award: string) => {
    if (award.toLowerCase().includes("gold")) {
      return "bg-yellow-100 text-yellow-800";
    } else if (award.toLowerCase().includes("silver")) {
      return "bg-gray-100 text-gray-800";
    } else if (award.toLowerCase().includes("bronze")) {
      return "bg-amber-100 text-amber-800";
    } else if (award.toLowerCase().includes("participant")) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-green-100 text-green-800";
    }
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

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>{error}</p>
        <button
          onClick={() => router.push("/admin/achievements/sports")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Back to Sports Achievements
        </button>
      </div>
    );
  }

  if (!achievement) {
    return null;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/admin/achievements/sports"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Sports Achievements
        </Link>
        <Link
          href={`/admin/achievements/sports/${id}/edit`}
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Edit size={16} className="mr-2" />
          Edit Achievement
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <div className="bg-red-50 p-2 rounded-md mr-3">
            <Trophy size={24} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Sports Achievement Details
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name
                </label>
                <div className="flex items-center">
                  <Users size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-800 font-medium">
                    {achievement.name}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <div className="flex items-center">
                  <GraduationCap size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-800">{achievement.class}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event
                </label>
                <div className="flex items-center">
                  <Tag size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-800">{achievement.event}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Award
                </label>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getAwardClass(
                    achievement.award
                  )}`}
                >
                  {achievement.award}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-800">{achievement.year}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visibility
                </label>
                <div className="flex items-center">
                  <Eye size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-800">
                    {achievement.active
                      ? "Visible on Website"
                      : "Hidden from Website"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Additional Information
              </h2>
              <p className="text-gray-700">
                This sports achievement highlights the student&apos;s
                outstanding performance in the {achievement.event} event,
                earning a {achievement.award} in the year {achievement.year}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
