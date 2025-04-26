"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Edit,
  Instagram,
  Tag,
  Eye,
} from "lucide-react";
import { authFetch } from "@/lib/authFetch";

interface AlumniProfile {
  id: string;
  name: string;
  imageUrl?: string;
  graduationYear: string;
  currentPosition: string;
  company: string;
  category?: string;
  instagramPostUrl?: string;
  active: boolean;
  achievement: string;
}

export default function AdminAlumniProfileViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<AlumniProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumniProfile = async () => {
      try {
        setIsLoading(true);
        const res = await authFetch(`/api/achievements/alumni/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch alumni profile details");
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching alumni profile:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlumniProfile();
  }, [id]);

  const getInstagramPostId = (url: string) => {
    const regex = /\/p\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
          onClick={() => router.push("/admin/achievements/alumni")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Back to Alumni
        </button>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/admin/achievements/alumni"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Alumni
        </Link>
        <Link
          href={`/admin/achievements/alumni/${id}/edit`}
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Edit size={16} className="mr-2" />
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="relative h-64 w-full">
              {profile.imageUrl ? (
                <Image
                  src={profile.imageUrl}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                  <Users size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 p-2 rounded-md mr-3">
                  <Users size={24} className="text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {profile.name}
                </h1>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <GraduationCap size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    Class of {profile.graduationYear}
                  </span>
                </div>

                <div className="flex items-center">
                  <Briefcase size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-800 font-medium">
                    {profile.currentPosition} at {profile.company}
                  </span>
                </div>

                {profile.category && (
                  <div className="flex items-center">
                    <Tag size={16} className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{profile.category}</span>
                  </div>
                )}

                {profile.instagramPostUrl && (
                  <div className="flex items-center">
                    <Instagram size={16} className="mr-2 text-gray-500" />
                    <a
                      href={profile.instagramPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Instagram Post
                    </a>
                  </div>
                )}

                <div className="flex items-center">
                  <Eye size={16} className="mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {profile.active
                      ? "Visible on Website"
                      : "Hidden from Website"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {profile.instagramPostUrl && (
            <div className="mt-6 bg-white rounded-lg shadow-md border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Instagram Post
              </h2>
              <div className="border rounded-md overflow-hidden">
                <iframe
                  src={`https://www.instagram.com/p/${getInstagramPostId(
                    profile.instagramPostUrl
                  )}/embed/`}
                  width="100%"
                  height="480"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  title="Instagram Post"
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Achievement
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {profile.achievement}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Additional Information
            </h2>
            <p className="text-gray-700">
              Alumni of Aryavart Ancient Academy, currently working as a{" "}
              {profile.currentPosition}
              at {profile.company}, making significant contributions in the{" "}
              {profile.category || "professional"} field.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
