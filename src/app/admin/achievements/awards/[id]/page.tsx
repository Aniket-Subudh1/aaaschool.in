"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  ArrowLeft,
  Calendar,
  Edit,
  Users,
  Eye,
  Tag,
} from "lucide-react";
import { authFetch } from "@/lib/authFetch";

interface Award {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category?: string;
  recipient?: string;
  active: boolean;
}

export default function AdminAwardViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [award, setAward] = useState<Award | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAward = async () => {
      try {
        setIsLoading(true);
        const res = await authFetch(`/api/achievements/awards/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch award details");
        }

        const data = await res.json();
        setAward(data);
      } catch (err) {
        console.error("Error fetching award:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAward();
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          onClick={() => router.push("/admin/achievements/awards")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Back to Awards
        </button>
      </div>
    );
  }

  if (!award) {
    return null;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/admin/achievements/awards"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Awards
        </Link>
        <Link
          href={`/admin/achievements/awards/${id}/edit`}
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Edit size={16} className="mr-2" />
          Edit Award
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={award.imageUrl}
                alt={award.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-50 p-2 rounded-md mr-3">
                  <Award size={24} className="text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {award.title}
                </h1>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {formatDate(award.date)}
                  </span>
                </div>

                {award.category && (
                  <div className="flex items-center">
                    <Tag size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{award.category}</span>
                  </div>
                )}

                {award.recipient && (
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{award.recipient}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Eye size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {award.active
                      ? "Visible on Website"
                      : "Hidden from Website"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {award.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
