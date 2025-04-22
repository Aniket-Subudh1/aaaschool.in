"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Camera, Calendar, ImageOff, Search } from "lucide-react";

type Album = {
  _id: string;
  title: string;
  description?: string;
  coverImageUrl: string;
  imageCount: number;
  active: boolean;
  createdAt: string;
};

export default function PhotoGalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/albums?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch albums");
      }

      const data = await res.json();
      setAlbums(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching albums:", err);
      setError("Failed to load photo albums. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter albums based on search query
  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Browse through our collection of photos capturing the vibrant life
            and special moments at Aryavart Ancient Academy
          </p>
        </div>
      </section>

      {/* Albums Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Our Photo Albums</h2>

          <div className="relative md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search albums..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
            <p className="text-gray-600">Loading photo albums...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
            <p>{error}</p>
            <button
              onClick={fetchAlbums}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredAlbums.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <ImageOff size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Photo Albums Found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No albums matching "${searchQuery}"`
                : "Photo albums will be added soon. Please check back later."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map((album) => (
              <Link
                key={album._id}
                href={`/gallery/photo/${album._id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={album.coverImageUrl}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {album.title}
                  </h3>
                  {album.description && (
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {album.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Camera size={16} className="mr-1" />
                      {album.imageCount} photos
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(album.createdAt)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
            Want to See More?
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            We regularly update our photo gallery with new images from school
            events, activities, and celebrations. Check back often to see the
            latest additions.
          </p>
          <div className="space-x-4">
            <Link
              href="/gallery/video"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Explore Videos
            </Link>
            <Link
              href="/gallery/news-bulletin"
              className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              View News Bulletins
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
