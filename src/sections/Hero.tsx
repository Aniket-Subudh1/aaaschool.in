"use client";
import type React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Award, BookOpen } from "lucide-react";

import KonarkWheel from "@/components/ui/konark-wheel";
import CulturalPattern from "@/components/ui/cultural-pattern";
import TempleDecoration from "@/components/ui/temple-decoration";
import TempleSilhouette from "@/components/ui/temple-silhouette";
import UserPortals from "@/components/ui/user-portals";
import AnnouncementsTicker from "@/components/ui/announcements-ticker";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <main className="min-h-screen bg-[#f8f3e9] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative  overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CulturalPattern />
        </div>

        <TempleDecoration />
        <TempleSilhouette />

        <div className="relative z-10 container lg:-top-16 mx-auto px-4 py-16 md:py-24 lg:py-28 hero-content">
          {/* Announcements Ticker */}
          <div className="mb-8">
            <AnnouncementsTicker />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center hero-grid">
            <div className="space-y-6 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-[#8b1a1a] text-[#f8f3e9] px-4 py-2 rounded-lg text-sm font-medium"
              >
                <span className="font-serif">ESTD - 1995</span> | CBSE
                Affiliated (1530380)
              </motion.div>

              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 logo-heading">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-3xl lg:text-5xl font-bold text-[#8b1a1a] leading-tight font-serif hero-heading"
                >
                  <span className="block">Aryavart Ancient</span>
                  <span className="block">Academy</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mt-4 md:mt-0 relative animate-spin-slow logo-container"
                >
                  <div className="absolute inset-0 bg-[#f8f3e9] rounded-full shadow-lg opacity-75 blur-md"></div>
                  <div className="relative z-10 transform transition-transform duration-500 hover:scale-110 logo-pulse">
                    <Image
                      src="./aaa.png"
                      alt="Aryavart Ancient Academy Logo"
                      width={120}
                      height={120}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg md:text-xl text-[#5a3e36] hero-description"
              >
                Cultivate their talents and creativity for a promising tomorrow
                through enriching activities designed to stimulate imagination
                and foster growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 cta-buttons"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#8b1a1a] text-[#f8f3e9] rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md cta-button"
                >
                  Admission Inquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#f8f3e9] text-[#8b1a1a] border-2 border-[#8b1a1a] rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#8b1a1a]/10 shadow-md cta-button"
                >
                  Explore Programs
                </a>
              </motion.div>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
              >
                <FeatureCard
                  icon={<Calendar className="h-5 w-5 text-[#8b1a1a]" />}
                  title="Established 1995"
                  description="Decades of academic excellence"
                />
                <FeatureCard
                  icon={<Award className="h-5 w-5 text-[#8b1a1a]" />}
                  title="CBSE Affiliated"
                  description="Quality education standards"
                />
                <FeatureCard
                  icon={<BookOpen className="h-5 w-5 text-[#8b1a1a]" />}
                  title="Vedic Principles"
                  description="Traditional values with modern education"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#8b1a1a] opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#d4b483] opacity-20 rounded-full blur-3xl"></div>

              <div className="relative">
                {/* Temple-inspired frame */}
                <div className="absolute inset-0 bg-[#8b1a1a]/5 rounded-2xl -translate-x-4 translate-y-4"></div>
                <div className="absolute inset-0 border-8 border-[#8b1a1a]/10 rounded-2xl translate-x-2 -translate-y-2"></div>

                <div className="relative bg-[#f8f3e9] p-6 rounded-2xl shadow-2xl border border-[#d4b483]/30 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4b483] opacity-20 rounded-full translate-x-16 -translate-y-16"></div>

                  {/* Temple-inspired decorative elements */}
                  <div className="absolute top-0 left-0 right-0 h-4 flex justify-center space-x-1 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-4 bg-[#8b1a1a]/10 rounded-b-sm"
                      ></div>
                    ))}
                  </div>

                  <div className="relative z-10 flex items-center justify-center pt-4">
                    <Image
                      src="/placeholder.svg?height=400&width=500"
                      alt="Students learning"
                      width={500}
                      height={400}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>

                  {/* Decorative Konark wheel inspired element */}
                  <div className="absolute bottom-6 right-6 bg-[#f8f3e9] p-3 rounded-full shadow-lg border border-[#d4b483]/30 animate-pulse">
                    <div className="relative">
                      <KonarkWheel />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-[#f8f3e9] p-2 rounded-lg shadow-lg border border-[#d4b483]/30 transform rotate-3 animate-float animation-delay-200 floating-card">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div className="w-3 h-3 rounded-full bg-[#8b1a1a]"></div>
                  <span className="text-sm font-medium text-[#5a3e36]">
                    Modern 21st-century skills
                  </span>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-[#f8f3e9] p-2 rounded-lg shadow-lg border border-[#d4b483]/30 transform -rotate-3 animate-float animation-delay-300 floating-card">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div className="w-3 h-3 rounded-full bg-[#8b1a1a]"></div>
                  <span className="text-sm font-medium text-[#5a3e36]">
                    Timeless Vedic principles
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* User portals section */}
          <UserPortals />
        </div>
      </section>
    </main>
  );
};

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-[#d4b483]/20 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/80 group">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-[#f8f3e9] rounded-md shadow-sm group-hover:bg-[#8b1a1a]/10 transition-colors duration-300">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-[#8b1a1a]">{title}</h3>
          <p className="text-xs text-[#5a3e36]">{description}</p>
        </div>
      </div>
    </div>
  );
}
