"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Film,
  Newspaper,
  PlusCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { authFetch } from "@/lib/authFetch";

type GalleryStats = {
  albums: number;
  photos: number;
  videos: number;
  bulletins: number;
  loading: boolean;
};

export default function AdminGalleryIndexPage() {
  const [stats, setStats] = useState<GalleryStats>({
    albums: 0,
    photos: 0,
    videos: 0,
    bulletins: 0,
    loading: true,
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setError(null);
      setStats((prev) => ({ ...prev, loading: true }));

      // Fetch albums
      const albumsRes = await authFetch("/api/albums");
      const albums = await albumsRes.json();

      // Calculate total photos from albums
      const photos = Array.isArray(albums)
        ? albums.reduce((total, album) => total + (album.imageCount || 0), 0)
        : 0;

      // Fetch videos
      const videosRes = await authFetch("/api/videos");
      const videos = await videosRes.json();

      // Fetch news bulletins
      const bulletinsRes = await authFetch("/api/news-bulletins");
      const bulletins = await bulletinsRes.json();

      setStats({
        albums: Array.isArray(albums) ? albums.length : 0,
        photos: photos,
        videos: Array.isArray(videos) ? videos.length : 0,
        bulletins: Array.isArray(bulletins) ? bulletins.length : 0,
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching gallery stats:", err);
      setError("Failed to load gallery statistics. Please refresh the page.");
      setStats((prev) => ({ ...prev, loading: false }));
    }
  };

  const galleryItems = [
    {
      title: "Photo Albums",
      description: "Manage photo collections and images",
      icon: <ImageIcon size={36} className="text-indigo-600" />,
      color: "bg-indigo-100 text-indigo-700 border-indigo-200",
      count: stats.albums,
      subtext: `${stats.photos} photos across ${stats.albums} albums`,
      href: "/admin/gallery/albums",
      createLink: "/admin/gallery/albums/new",
      createText: "New Album",
    },
    {
      title: "Videos",
      description: "Manage YouTube videos",
      icon: <Film size={36} className="text-rose-600" />,
      color: "bg-rose-100 text-rose-700 border-rose-200",
      count: stats.videos,
      subtext: `${stats.videos} videos in gallery`,
      href: "/admin/gallery/videos",
      createLink: "/admin/gallery/videos/new",
      createText: "Add Video",
    },
    {
      title: "News Bulletins",
      description: "Manage news and announcements",
      icon: <Newspaper size={36} className="text-amber-600" />,
      color: "bg-amber-100 text-amber-700 border-amber-200",
      count: stats.bulletins,
      subtext: `${stats.bulletins} bulletins published`,
      href: "/admin/gallery/news-bulletins",
      createLink: "/admin/gallery/news-bulletins/new",
      createText: "New Bulletin",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">
            Gallery Management
          </h1>
          <p className="text-gray-600">
            Manage school photo albums, videos, and news bulletins
          </p>
        </div>
        <a
          href="/gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#8b1a1a] hover:text-[#8b1a1a]/80"
        >
          View Gallery
          <ArrowRight size={16} className="ml-1" />
        </a>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {galleryItems.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            <div className={`p-6 ${item.color} border-b`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {item.icon}
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
                {stats.loading ? (
                  <Loader2 size={24} className="text-gray-400 animate-spin" />
                ) : (
                  <div className="text-3xl font-bold">{item.count}</div>
                )}
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{item.subtext}</p>
              <div className="flex justify-between">
                <Link
                  href={item.href}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Manage
                </Link>
                <Link
                  href={item.createLink}
                  className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 text-sm"
                >
                  <PlusCircle size={16} className="mr-2" />
                  {item.createText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/gallery/albums/new"
            className="flex items-center p-4 border border-indigo-200 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
          >
            <div className="bg-indigo-100 p-3 rounded-full">
              <ImageIcon size={24} className="text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-indigo-700">Create New Album</h3>
              <p className="text-sm text-indigo-600/70">
                Add a new photo album
              </p>
            </div>
          </Link>

          <Link
            href="/admin/gallery/videos/new"
            className="flex items-center p-4 border border-rose-200 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors"
          >
            <div className="bg-rose-100 p-3 rounded-full">
              <Film size={24} className="text-rose-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-rose-700">Add New Video</h3>
              <p className="text-sm text-rose-600/70">Add a YouTube video</p>
            </div>
          </Link>

          <Link
            href="/admin/gallery/news-bulletins/new"
            className="flex items-center p-4 border border-amber-200 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
          >
            <div className="bg-amber-100 p-3 rounded-full">
              <Newspaper size={24} className="text-amber-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-amber-700">
                Create News Bulletin
              </h3>
              <p className="text-sm text-amber-600/70">Add a news bulletin</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Gallery Tips</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Photo Albums</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>Each album can contain up to 10 photos</li>
                <li>
                  Use high-quality, landscape-oriented images for cover photos
                </li>
                <li>
                  For best results, use images with 16:9 or 4:3 aspect ratio
                </li>
                <li>Maximum file size: 5MB per image</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Videos</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>Only YouTube videos are supported</li>
                <li>
                  Enter the complete YouTube URL (e.g.,
                  https://www.youtube.com/watch?v=VIDEO_ID)
                </li>
                <li>Thumbnails are automatically fetched from YouTube</li>
                <li>Add detailed descriptions for better user engagement</li>
              </ul>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">News Bulletins</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>Upload clear, readable images of your bulletins</li>
                <li>
                  Set a specific publish date to organize bulletins
                  chronologically
                </li>
                <li>
                  Use consistent image sizes for a professional appearance
                </li>
                <li>Maximum file size: 5MB per bulletin</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Need Help?</h3>
            <p className="text-blue-700 text-sm">
              For assistance with gallery management or to report issues, please
              contact the website administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
