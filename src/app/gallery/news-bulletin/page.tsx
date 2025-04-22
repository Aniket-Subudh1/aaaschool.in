"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  CalendarDays,
  FileText,
  Search,
  ExternalLink,
  X,
} from "lucide-react";

type NewsBulletin = {
  _id: string;
  title: string;
  imageUrl: string;
  publishDate: string;
  active: boolean;
  createdAt: string;
};

export default function NewsBulletinPage() {
  const [bulletins, setBulletins] = useState<NewsBulletin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBulletin, setSelectedBulletin] = useState<NewsBulletin | null>(
    null
  );

  useEffect(() => {
    fetchBulletins();
  }, []);

  const fetchBulletins = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/news-bulletins?active=true");

      if (!res.ok) {
        throw new Error("Failed to fetch news bulletins");
      }

      const data = await res.json();
      setBulletins(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching news bulletins:", err);
      setError("Failed to load news bulletins. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Sort bulletins by publish date (newest first)
  const sortedBulletins = [...bulletins].sort((a, b) => {
    return (
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  });

  // Filter bulletins based on search query
  const filteredBulletins = sortedBulletins.filter((bulletin) =>
    bulletin.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const openBulletinModal = (bulletin: NewsBulletin) => {
    setSelectedBulletin(bulletin);
    document.body.style.overflow = "hidden";
  };

  const closeBulletinModal = () => {
    setSelectedBulletin(null);
    document.body.style.overflow = "auto";
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            News Bulletins
          </h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Stay updated with the latest news, announcements, and achievements
            at Aryavart Ancient Academy
          </p>
        </div>
      </section>

      {/* Bulletins Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">School Bulletins</h2>

          <div className="relative md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bulletins..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={48} className="animate-spin text-amber-600 mb-4" />
            <p className="text-gray-600">Loading news bulletins...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
            <p>{error}</p>
            <button
              onClick={fetchBulletins}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredBulletins.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No News Bulletins Found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No bulletins matching "${searchQuery}"`
                : "News bulletins will be added soon. Please check back later."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBulletins.map((bulletin) => (
              <div
                key={bulletin._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div
                  className="relative aspect-[3/2] cursor-pointer overflow-hidden"
                  onClick={() => openBulletinModal(bulletin)}
                >
                  <Image
                    src={bulletin.imageUrl}
                    alt={bulletin.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <p className="text-amber-700 font-medium">
                        View Bulletin
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="text-xl font-bold text-gray-800 mb-2 cursor-pointer hover:text-amber-600 transition-colors line-clamp-2"
                    onClick={() => openBulletinModal(bulletin)}
                  >
                    {bulletin.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDays size={16} className="mr-1" />
                    {formatDate(bulletin.publishDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bulletin Modal */}
      {selectedBulletin && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeBulletinModal}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 pr-8">
                {selectedBulletin.title}
              </h3>
              <button
                onClick={closeBulletinModal}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="relative w-full max-h-[70vh] overflow-hidden rounded-lg mb-4">
                <Image
                  src={selectedBulletin.imageUrl}
                  alt={selectedBulletin.title}
                  width={800}
                  height={1000}
                  className="mx-auto object-contain"
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  <CalendarDays size={16} className="inline mr-1" />
                  Published on {formatDate(selectedBulletin.publishDate)}
                </p>

                <a
                  href={selectedBulletin.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-600 hover:text-amber-700"
                >
                  <ExternalLink size={16} className="mr-1" />
                  View full image
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
            Explore Our School Gallery
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            Discover more about life at Aryavart Ancient Academy through our
            photo albums and videos that showcase our vibrant school community
            and activities.
          </p>
          <div className="space-x-4">
            <Link
              href="/gallery/photo"
              className="inline-block bg-amber-600 text-white px-6 py-3 rounded-md font-medium hover:bg-amber-700 transition-colors"
            >
              Photo Albums
            </Link>
            <Link
              href="/gallery/video"
              className="inline-block bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Video Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
