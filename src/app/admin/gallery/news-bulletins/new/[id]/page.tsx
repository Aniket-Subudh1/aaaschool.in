"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

type NewsBulletin = {
  _id: string;
  title: string;
  imageUrl: string;
  publishDate: string;
  active: boolean;
  createdAt: string;
};

export default function NewsBulletinDetailPage() {
  const { id } = useParams();

  const [bulletin, setBulletin] = useState<NewsBulletin | null>(null);
  const [relatedBulletins, setRelatedBulletins] = useState<NewsBulletin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    fetchBulletinDetails();
  }, [id]);

  const fetchBulletinDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setShowShareOptions(false);

      // Fetch the specific bulletin
      const res = await fetch(`/api/news-bulletins/${id}`);

      if (!res.ok) {
        if (res.status === 404) {
          return notFound();
        }
        throw new Error("Failed to fetch news bulletin");
      }

      const bulletinData = await res.json();

      if (!bulletinData.active) {
        return notFound(); // Don't show inactive bulletins
      }

      setBulletin(bulletinData);

      // Fetch related bulletins
      const relatedRes = await fetch(`/api/news-bulletins?active=true`);

      if (relatedRes.ok) {
        const allBulletins = await relatedRes.json();
        // Filter out the current bulletin and get up to 3 related bulletins
        const filtered = Array.isArray(allBulletins)
          ? allBulletins
              .filter((b) => b._id !== id && b.active)
              .sort(
                (a, b) =>
                  new Date(b.publishDate).getTime() -
                  new Date(a.publishDate).getTime()
              )
              .slice(0, 3)
          : [];
        setRelatedBulletins(filtered);
      }
    } catch (err) {
      console.error("Error fetching news bulletin:", err);
      setError("Failed to load news bulletin. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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

  // Share functionality
  const shareContent = () => {
    setShowShareOptions(!showShareOptions);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShareOptions(false);
  };

  // Download image
  const downloadImage = () => {
    if (!bulletin) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = bulletin.imageUrl;
    link.download = `bulletin-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={48} className="animate-spin text-amber-600 mb-4" />
        <p className="text-gray-600">Loading news bulletin...</p>
      </div>
    );
  }

  if (error || !bulletin) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
          <p>{error || "News bulletin not found"}</p>
          <Link
            href="/gallery/news-bulletin"
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to News Bulletins
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/gallery/news-bulletin"
            className="inline-flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all bulletins
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {bulletin.title}
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center text-white/80">
              <Calendar size={16} className="mr-1" />
              Published on {formatDate(bulletin.publishDate)}
            </div>
            <div className="relative">
              <button
                onClick={shareContent}
                className="flex items-center text-white/80 hover:text-white"
              >
                <Share2 size={16} className="mr-1" />
                Share
              </button>
              {showShareOptions && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-4 z-10 w-64">
                  <button
                    onClick={copyToClipboard}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center"
                  >
                    <span>Copy link</span>
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md block"
                  >
                    Share on Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(bulletin.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md block"
                  >
                    Share on Twitter
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      bulletin.title + ": " + window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md block"
                  >
                    Share on WhatsApp
                  </a>
                </div>
              )}
            </div>
            <button
              onClick={downloadImage}
              className="flex items-center text-white/80 hover:text-white"
            >
              <Download size={16} className="mr-1" />
              Download
            </button>
          </div>
        </div>
      </section>

      {/* Bulletin Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-end mb-4">
                <a
                  href={bulletin.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 text-sm flex items-center"
                >
                  <ExternalLink size={14} className="mr-1" />
                  View full size
                </a>
              </div>

              <div className="relative">
                <Image
                  src={bulletin.imageUrl}
                  alt={bulletin.title}
                  width={900}
                  height={1200}
                  className="mx-auto max-h-[80vh] w-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              More News Bulletins
            </h2>

            {relatedBulletins.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">No related bulletins available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {relatedBulletins.map((related) => (
                  <Link
                    key={related._id}
                    href={`/gallery/news-bulletin/${related._id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={related.imageUrl}
                        alt={related.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(related.publishDate)}
                      </p>
                    </div>
                  </Link>
                ))}

                <Link
                  href="/gallery/news-bulletin"
                  className="block text-center py-3 bg-gray-50 text-amber-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  View All Bulletins
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/gallery/news-bulletin"
            className="inline-flex items-center text-gray-700 hover:text-amber-600 transition-colors font-medium"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Bulletins
          </Link>

          <div className="flex gap-4">
            <Link
              href="/gallery/photo"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Photo Albums
            </Link>
            <Link
              href="/gallery/video"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Videos
            </Link>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center text-gray-700 hover:text-amber-600 transition-colors font-medium"
          >
            Gallery Home
            <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
