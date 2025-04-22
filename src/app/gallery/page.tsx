"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ImageIcon,
  Film,
  Newspaper,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const galleryCategories = [
  {
    id: "photos",
    title: "Photo Albums",
    description: "Browse photo collections from school events and activities",
    icon: <ImageIcon className="text-[#8b1a1a]" />,
    href: "/gallery/photo",
    bgImage: "/gallery-bg-photos.jpg",
  },
  {
    id: "videos",
    title: "Video Gallery",
    description:
      "Watch videos from school events, performances and celebrations",
    icon: <Film className="text-[#8b1a1a]" />,
    href: "/gallery/video",
    bgImage: "/gallery-bg-videos.jpg",
  },
  {
    id: "bulletins",
    title: "News Bulletins",
    description: "School newsletters, announcements and news updates",
    icon: <Newspaper className="text-[#8b1a1a]" />,
    href: "/gallery/news-bulletin",
    bgImage: "/gallery-bg-bulletins.jpg",
  },
];

export default function GalleryPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-[#fff9f0] min-h-screen">
      {/* Minimal Header */}
      <section className="relative bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-white/70 text-sm mb-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span>Gallery</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            School Gallery
          </h1>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryCategories.map((category, index) => (
              <div
                key={category.id}
                className={`transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Link
                  href={category.href}
                  className="group block h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    <Image
                      src={
                        category.bgImage ||
                        `/placeholder.svg?text=${category.title}`
                      }
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 p-4 z-20">
                      <h2 className="text-xl font-bold text-white mb-1">
                        {category.title}
                      </h2>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center mr-3">
                        {category.icon}
                      </div>
                      <p className="text-gray-600 flex-1">
                        {category.description}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-[#8b1a1a] text-sm font-medium group-hover:underline">
                        Explore
                        <ArrowRight
                          size={16}
                          className="ml-1 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-[#8b1a1a]">
                Featured Media
              </h2>
              <p className="text-gray-600 mt-1">
                Highlights from our recent events
              </p>
            </div>
            <Link
              href="/gallery/photo"
              className="mt-3 md:mt-0 inline-flex items-center text-[#8b1a1a] text-sm font-medium hover:underline"
            >
              View all
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(i + 3) * 100}ms` }}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group">
                  <Image
                    src={`/placeholder.svg?text=Featured+${i + 1}`}
                    alt={`Featured image ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-[#8b1a1a]/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-[#8b1a1a] mb-3">
            Stay Updated
          </h2>
          <p className="text-gray-700 mb-6">
            Our gallery is regularly updated with new photos, videos, and news
            bulletins to keep you informed about all the exciting events and
            achievements at Aryavart Ancient Academy.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#8b1a1a] text-white px-5 py-2 rounded-md font-medium hover:bg-[#8b1a1a]/90 transition-colors shadow-sm hover:shadow"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
