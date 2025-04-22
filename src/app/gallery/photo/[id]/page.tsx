"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Calendar,
  Camera,
  ImageOff,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
  Download,
  Grid2x2,
  Grid3x3,
} from "lucide-react";
import GalleryLayout from "../../GalleryLayout";

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
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [gridColumns, setGridColumns] = useState<2 | 3>(3);
  const [showShare, setShowShare] = useState(false);

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
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
    document.body.style.overflow = "auto";
  };

  const goToNextPhoto = useCallback(() => {
    if (activePhotoIndex === null || photos.length === 0) return;
    setActivePhotoIndex((prevIndex) =>
      prevIndex === null
        ? 0
        : prevIndex === photos.length - 1
        ? 0
        : prevIndex + 1
    );
  }, [activePhotoIndex, photos.length]);

  const goToPrevPhoto = useCallback(() => {
    if (activePhotoIndex === null || photos.length === 0) return;
    setActivePhotoIndex((prevIndex) =>
      prevIndex === null
        ? photos.length - 1
        : prevIndex === 0
        ? photos.length - 1
        : prevIndex - 1
    );
  }, [activePhotoIndex, photos.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;

      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        goToNextPhoto();
      } else if (e.key === "ArrowLeft") {
        goToPrevPhoto();
      }
    },
    [activePhotoIndex, goToNextPhoto, goToPrevPhoto]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [handleKeyDown]);

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

  // Share functions
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShare(false);
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <GalleryLayout
        title="Loading Album..."
        backgroundClass="from-indigo-600 to-blue-600"
      >
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
          <p className="text-gray-600">Loading album details...</p>
        </div>
      </GalleryLayout>
    );
  }

  if (error || !album) {
    return (
      <GalleryLayout
        title="Album Not Found"
        backgroundClass="from-indigo-600 to-blue-600"
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
            <p>{error || "Album not found"}</p>
            <Link
              href="/gallery/photo"
              className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <ChevronLeft size={16} className="mr-2" />
              Back to Albums
            </Link>
          </div>
        </div>
      </GalleryLayout>
    );
  }

  return (
    <GalleryLayout
      title={album.title}
      description={album.description}
      backgroundClass="from-indigo-600 to-blue-600"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Album Meta Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-64 h-full">
              <div className="relative h-40 md:h-full">
                <img
                  src={album.coverImageUrl}
                  alt={album.title}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-2 rounded-md mr-3">
                  <Camera className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm text-indigo-600 font-medium">
                  Photo Album
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mt-2">
                {album.title}
              </h1>
              {album.description && (
                <p className="mt-2 text-gray-600">{album.description}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1 text-gray-400" />
                  {formatDate(album.createdAt)}
                </div>
                <div className="flex items-center">
                  <Camera size={16} className="mr-1 text-gray-400" />
                  {album.imageCount} photos
                </div>
              </div>
              <div className="mt-5 flex space-x-3">
                <div className="relative">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  >
                    <Share2 size={14} className="mr-1.5" />
                    Share
                  </button>
                  <AnimatePresence>
                    {showShare && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md p-2 z-10 w-48 border border-gray-200"
                      >
                        <button
                          onClick={copyToClipboard}
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center text-sm"
                        >
                          Copy link
                        </button>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md block text-sm"
                        >
                          Share on Facebook
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            window.location.href
                          )}&text=${encodeURIComponent(album.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md block text-sm"
                        >
                          Share on Twitter
                        </a>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            album.title + ": " + window.location.href
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md block text-sm"
                        >
                          Share on WhatsApp
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => setGridColumns(gridColumns === 3 ? 2 : 3)}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm transition-colors"
                >
                  {gridColumns === 3 ? (
                    <Grid3x3 size={14} className="mr-1.5" />
                  ) : (
                    <Grid2x2 size={14} className="mr-1.5" />
                  )}
                  {gridColumns === 3 ? "3 columns" : "2 columns"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Photos Grid */}
        {photos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
            <div className="inline-block bg-indigo-100 p-6 rounded-full mb-4">
              <ImageOff className="h-10 w-10 text-indigo-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Photos in This Album
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This album doesn&apos;t contain any photos yet. Please check back
              later.
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
            } gap-4`}
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo._id}
                variants={photoVariants}
                layoutId={`photo-${photo._id}`}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer border border-gray-100"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption || `Photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white/90 backdrop-blur-sm text-indigo-600 p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Eye size={20} />
                  </button>
                </div>
                {/* Caption if exists */}
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm">{photo.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {activePhotoIndex !== null && activePhotoIndex < photos.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 z-10"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevPhoto();
                }}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70"
                aria-label="Previous photo"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextPhoto();
                }}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70"
                aria-label="Next photo"
              >
                <ChevronRight size={24} />
              </motion.button>

              <div
                className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center">
                  <Image
                    src={photos[activePhotoIndex].imageUrl}
                    alt={
                      photos[activePhotoIndex].caption ||
                      `Photo ${activePhotoIndex + 1}`
                    }
                    fill
                    sizes="100vw"
                    className="object-contain pointer-events-none"
                  />
                </div>

                {/* Photo information */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-6 md:px-12"
                >
                  <div className="bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg max-w-lg">
                    {photos[activePhotoIndex].caption && (
                      <p className="text-white/90 text-sm md:text-base">
                        {photos[activePhotoIndex].caption}
                      </p>
                    )}
                    <p className="text-white/70 text-xs mt-1">
                      Photo {activePhotoIndex + 1} of {photos.length}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <a
                      href={photos[activePhotoIndex].imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={20} />
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GalleryLayout>
  );
}
