"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ImageIcon,
  Film,
  Newspaper,
  ArrowRight,
  ChevronRight,
  Camera,
  Sparkles,
  PlayCircle,
  CalendarDays,
  Clock,
  Eye,
} from "lucide-react";
import GalleryLayout from "./GalleryLayout";

type Album = {
  _id: string;
  title: string;
  coverImageUrl: string;
  imageCount: number;
  createdAt: string;
};

type Video = {
  _id: string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
};

type NewsBulletin = {
  _id: string;
  title: string;
  imageUrl: string;
  publishDate: string;
};

export default function GalleryPage() {
  const [latestAlbums, setLatestAlbums] = useState<Album[]>([]);
  const [latestVideos, setLatestVideos] = useState<Video[]>([]);
  const [latestBulletins, setLatestBulletins] = useState<NewsBulletin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchGalleryData = async () => {
      setIsLoading(true);
      try {
        // Fetch albums
        const albumsRes = await fetch("/api/albums?active=true");
        if (albumsRes.ok) {
          const albumsData = await albumsRes.json();
          setLatestAlbums(
            Array.isArray(albumsData) ? albumsData.slice(0, 4) : []
          );
        }

        // Fetch videos
        const videosRes = await fetch("/api/videos?active=true");
        if (videosRes.ok) {
          const videosData = await videosRes.json();
          setLatestVideos(
            Array.isArray(videosData) ? videosData.slice(0, 4) : []
          );
        }

        // Fetch news bulletins
        const bulletinsRes = await fetch("/api/news-bulletins?active=true");
        if (bulletinsRes.ok) {
          const bulletinsData = await bulletinsRes.json();
          setLatestBulletins(
            Array.isArray(bulletinsData) ? bulletinsData.slice(0, 4) : []
          );
        }
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const shimmer = {
    hidden: { backgroundPosition: "-200px 0" },
    show: {
      backgroundPosition: "calc(200px + 100%) 0",
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  const categoryButtons = [
    { id: "all", label: "All", icon: <Sparkles className="w-4 h-4" /> },
    { id: "photos", label: "Photos", icon: <Camera className="w-4 h-4" /> },
    { id: "videos", label: "Videos", icon: <Film className="w-4 h-4" /> },
    {
      id: "bulletins",
      label: "Bulletins",
      icon: <Newspaper className="w-4 h-4" />,
    },
  ];

  const galleryCategories = [
    {
      id: "photos",
      title: "Photo Albums",
      description: "Browse photo collections from school events and activities",
      icon: <ImageIcon className="text-white w-6 h-6" />,
      href: "/gallery/photo",
      bgColor: "from-indigo-700 to-blue-600",
      btnColor: "bg-white/20 hover:bg-white/30 text-white",
      count: latestAlbums.length,
    },
    {
      id: "videos",
      title: "Video Gallery",
      description:
        "Watch videos from school events, performances and celebrations",
      icon: <Film className="text-white w-6 h-6" />,
      href: "/gallery/video",
      bgColor: "from-rose-600 to-pink-600",
      btnColor: "bg-white/20 hover:bg-white/30 text-white",
      count: latestVideos.length,
    },
    {
      id: "bulletins",
      title: "News Bulletins",
      description: "School newsletters, announcements and news updates",
      icon: <Newspaper className="text-white w-6 h-6" />,
      href: "/gallery/news-bulletin",
      bgColor: "from-amber-600 to-yellow-500",
      btnColor: "bg-white/20 hover:bg-white/30 text-white",
      count: latestBulletins.length,
    },
  ];

  return (
    <GalleryLayout
      title="Gallery"
      description="Explore the vibrant life at Aryavart Ancient Academy through our collection of photos, videos, and news bulletins."
    >
      {/* Category Cards Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {galleryCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={fadeInUp}
                className="group"
              >
                <Link
                  href={category.href}
                  className="block h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 group-hover:-translate-y-1 duration-300"
                >
                  <div
                    className={`relative h-40 overflow-hidden bg-gradient-to-r ${category.bgColor}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {category.icon}
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 z-10">
                      <h2 className="text-xl font-bold text-white">
                        {category.title}
                      </h2>
                      <p className="text-white/90 text-sm line-clamp-1">
                        {category.description}
                      </p>
                    </div>
                    <div className="absolute right-3 top-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center">
                      <Eye size={12} className="mr-1" />
                      <span>{category.count || 0} items</span>
                    </div>
                    {/* Decorative shapes */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                    <div className="absolute -top-6 -left-6 w-20 h-20 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">
                        {category.id === "photos" &&
                          `${latestAlbums.length} albums`}
                        {category.id === "videos" &&
                          `${latestVideos.length} videos`}
                        {category.id === "bulletins" &&
                          `${latestBulletins.length} bulletins`}
                      </span>
                      <div className="inline-flex items-center text-[#8b1a1a] text-sm font-medium group-hover:underline">
                        Explore
                        <ArrowRight
                          size={14}
                          className="ml-1 transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[#8b1a1a]">
                Featured Gallery
              </h2>
              <p className="text-gray-600 mt-1">
                Highlights from our recent school activities
              </p>
            </motion.div>

            <div className="mt-4 md:mt-0 flex space-x-2">
              {categoryButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setActiveCategory(button.id)}
                  className={`${
                    activeCategory === button.id
                      ? "bg-[#8b1a1a] text-white"
                      : "bg-[#8b1a1a]/10 text-[#8b1a1a] hover:bg-[#8b1a1a]/20"
                  } px-3 py-1.5 rounded-full text-sm flex items-center transition-colors`}
                >
                  {button.icon}
                  <span className="ml-1">{button.label}</span>
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerChildren}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={shimmer}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]"
                ></motion.div>
              ))}
            </motion.div>
          ) : (
            <>
              {/* Photo Albums */}
              {(activeCategory === "all" || activeCategory === "photos") &&
                latestAlbums.length > 0 && (
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Camera className="w-5 h-5 mr-2 text-indigo-600" />
                        Latest Photo Albums
                      </h3>
                      <Link
                        href="/gallery/photo"
                        className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                      >
                        View all albums
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={staggerChildren}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {latestAlbums.map((album) => (
                        <motion.div key={album._id} variants={fadeInUp}>
                          <Link
                            href={`/gallery/photo/${album._id}`}
                            className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={album.coverImageUrl}
                                alt={album.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-white font-medium line-clamp-1">
                                  {album.title}
                                </h3>
                              </div>
                              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                                <ImageIcon size={12} className="mr-1" />
                                {album.imageCount}
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="flex items-center text-xs text-gray-500">
                                <CalendarDays size={12} className="mr-1" />
                                {formatDate(album.createdAt)}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

              {/* Video Gallery */}
              {(activeCategory === "all" || activeCategory === "videos") &&
                latestVideos.length > 0 && (
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Film className="w-5 h-5 mr-2 text-rose-600" />
                        Latest Videos
                      </h3>
                      <Link
                        href="/gallery/video"
                        className="text-rose-600 hover:text-rose-800 text-sm flex items-center"
                      >
                        View all videos
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={staggerChildren}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {latestVideos.map((video) => (
                        <motion.div key={video._id} variants={fadeInUp}>
                          <Link
                            href={`/gallery/video/${video._id}`}
                            className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={video.thumbnailUrl}
                                alt={video.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-rose-600/80 rounded-full p-3 opacity-90 hover:opacity-100 transition-opacity">
                                  <PlayCircle
                                    size={24}
                                    className="text-white"
                                  />
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-white font-medium line-clamp-1">
                                  {video.title}
                                </h3>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="flex items-center text-xs text-gray-500">
                                <CalendarDays size={12} className="mr-1" />
                                {formatDate(video.createdAt)}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

              {/* News Bulletins */}
              {(activeCategory === "all" || activeCategory === "bulletins") &&
                latestBulletins.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Newspaper className="w-5 h-5 mr-2 text-amber-600" />
                        Latest News Bulletins
                      </h3>
                      <Link
                        href="/gallery/news-bulletin"
                        className="text-amber-600 hover:text-amber-800 text-sm flex items-center"
                      >
                        View all bulletins
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={staggerChildren}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      {latestBulletins.map((bulletin) => (
                        <motion.div key={bulletin._id} variants={fadeInUp}>
                          <Link
                            href={`/gallery/news-bulletin`}
                            className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100"
                          >
                            <div className="relative h-40 overflow-hidden">
                              <Image
                                src={bulletin.imageUrl}
                                alt={bulletin.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-white font-medium line-clamp-1">
                                  {bulletin.title}
                                </h3>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="flex items-center text-xs text-gray-500">
                                <CalendarDays size={12} className="mr-1" />
                                {formatDate(bulletin.publishDate)}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

              {activeCategory !== "all" &&
                ((activeCategory === "photos" && latestAlbums.length === 0) ||
                  (activeCategory === "videos" && latestVideos.length === 0) ||
                  (activeCategory === "bulletins" &&
                    latestBulletins.length === 0)) && (
                  <div className="text-center py-20">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block bg-gray-100 p-6 rounded-full mb-4"
                    >
                      {activeCategory === "photos" && (
                        <Camera className="h-10 w-10 text-gray-400" />
                      )}
                      {activeCategory === "videos" && (
                        <Film className="h-10 w-10 text-gray-400" />
                      )}
                      {activeCategory === "bulletins" && (
                        <Newspaper className="h-10 w-10 text-gray-400" />
                      )}
                    </motion.div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">
                      No content available
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      No {activeCategory} are currently available. Please check
                      back soon!
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-[#f8f3e9]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#8b1a1a] mb-3">
              Gallery Highlights
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Our gallery showcases the vibrant life and activities at Aryavart
              Ancient Academy, capturing the essence of our student&apos;s
              educational journey.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerChildren}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <motion.div
              variants={scaleUp}
              className="bg-white rounded-lg p-6 border border-[#d4b483]/20 text-center shadow-sm"
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#8b1a1a] mb-1">
                {latestAlbums.length}
              </h3>
              <p className="text-gray-600 text-sm">Photo Albums</p>
            </motion.div>

            <motion.div
              variants={scaleUp}
              className="bg-white rounded-lg p-6 border border-[#d4b483]/20 text-center shadow-sm"
            >
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#8b1a1a] mb-1">
                {latestVideos.length}
              </h3>
              <p className="text-gray-600 text-sm">Videos</p>
            </motion.div>

            <motion.div
              variants={scaleUp}
              className="bg-white rounded-lg p-6 border border-[#d4b483]/20 text-center shadow-sm"
            >
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Newspaper className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#8b1a1a] mb-1">
                {latestBulletins.length}
              </h3>
              <p className="text-gray-600 text-sm">News Bulletins</p>
            </motion.div>

            <motion.div
              variants={scaleUp}
              className="bg-white rounded-lg p-6 border border-[#d4b483]/20 text-center shadow-sm"
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#8b1a1a] mb-1">
                {formatDate(new Date().toISOString()).split(",")[0]}
              </h3>
              <p className="text-gray-600 text-sm">Last Updated</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Stay Connected
            </h2>
            <p className="text-white/90 mb-6 max-w-3xl mx-auto">
              Our gallery is regularly updated with new photos, videos, and news
              bulletins. Visit often to see the latest additions showcasing our
              vibrant school community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-white text-[#8b1a1a] rounded-md font-medium hover:bg-white/90 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-white/20 text-white border border-white/30 rounded-md font-medium hover:bg-white/30 transition-colors"
              >
                About the School
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </GalleryLayout>
  );
}
