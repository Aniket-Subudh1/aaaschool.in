"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  Camera,
  ImageOff,
  Eye,
  X,
} from "lucide-react";

type Album = {
  _id: string;
  title: string;
  description?: string;
  coverImageUrl: string;
  imageCount: number;
  active: boolean;
  createdAt: string;
};

type Photo = {
  _id: string;
  albumId: string;
  imageUrl: string;
  caption?: string;
  order: number;
  createdAt: string;
};

export default function AlbumDetailPage() {
  const { id } = useParams();

  const [album, setAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    fetchAlbumDetails();
  }, [id]);

  const fetchAlbumDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`/api/albums/${id}`);

      if (!res.ok) {
        if (res.status === 404) {
          return notFound();
        }
        throw new Error("Failed to fetch album");
      }

      const data = await res.json();
      setAlbum(data.album);
      setPhotos(data.photos || []);
    } catch (err) {
      console.error("Error fetching album details:", err);
      setError("Failed to load album. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextPhoto = () => {
    setActivePhotoIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setActivePhotoIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!lightboxOpen) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      nextPhoto();
    } else if (e.key === "ArrowLeft") {
      prevPhoto();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen, photos.length]);

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
        <p className="text-gray-600">Loading album...</p>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
          <p>{error || "Album not found"}</p>
          <Link
            href="/gallery/photo"
            className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Albums
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Album Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/gallery/photo"
            className="inline-flex items-center text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all albums
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{album.title}</h1>
          {album.description && (
            <p className="text-lg max-w-3xl opacity-90 mb-4">
              {album.description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 text-sm opacity-80">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {formatDate(album.createdAt)}
            </div>
            <div className="flex items-center">
              <Camera size={16} className="mr-1" />
              {album.imageCount} photos
            </div>
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {photos.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <ImageOff size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Photos in This Album
            </h3>
            <p className="text-gray-600">
              This album doesn&apos;t contain any photos yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.caption || `Photo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={24} className="text-white" />
                  </div>
                </div>
                {photo.caption && (
                  <div className="p-3">
                    <p className="text-gray-700">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && photos.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Previous photo"
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            aria-label="Next photo"
          >
            <ArrowLeft size={24} className="rotate-180" />
          </button>

          <div className="relative w-[90vw] max-w-5xl h-[80vh]">
            <Image
              src={photos[activePhotoIndex].imageUrl}
              alt={
                photos[activePhotoIndex].caption ||
                `Photo ${activePhotoIndex + 1}`
              }
              fill
              sizes="90vw"
              className="object-contain"
            />

            {photos[activePhotoIndex].caption && (
              <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-sm text-white p-4 text-center">
                <p>{photos[activePhotoIndex].caption}</p>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            <p>
              {activePhotoIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
