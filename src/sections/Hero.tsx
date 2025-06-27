"use client";
import type React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Award, BookOpen, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import KonarkWheel from "@/components/ui/konark-wheel";
import CulturalPattern from "@/components/ui/cultural-pattern";
import TempleDecoration from "@/components/ui/temple-decoration";
import TempleSilhouette from "@/components/ui/temple-silhouette";
import AcademicPrograms from "@/components/ui/academic-programs";
import SchoolLevels from "@/components/ui/school-levels";
import NotificationSection from "@/components/ui/notification-section";
import AnnouncementsTicker from "@/components/ui/announcements-ticker";
import ImageSlider from "@/components/ui/image-slider";
import SchoolCalendar from "@/components/ui/school-calendar";
import SchoolActivities from "@/components/ui/school-activities";
import AryavartHouses from "@/components/ui/aryavart-houses";
import FeedbackSection from "@/components/ui/feedback-section";
import PrincipalMessage from "@/components/ui/principal-message";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";
import StudentTestimonials from "@/components/ui/student-testimonials";
import HeaderAcademyLogo from "@/components/ui/header-academylogo";

// Feature images data
const featureImages = [
  {
    id: 1,
    image: "https://aaaschool.s3.ap-south-1.amazonaws.com/sch.jpeg",
    title: "Modern Learning Environment",
    description: "State-of-the-art classrooms with interactive technology"
  },
  {
    id: 2,
    image: "https://aaaschool.s3.ap-south-1.amazonaws.com/sc.jpg",
    title: "Beautiful Green Campus",
    description: "35 acres of lush green environment for holistic learning"
  },
  {
    id: 3,
    image: "https://aaaschool.s3.ap-south-1.amazonaws.com/il.jpg",
    title: "Interactive Learning",
    description: "Engaging students with hands-on learning experiences"
  },
  {
    id: 4,
    image: "https://aaaschool.s3.ap-south-1.amazonaws.com/sp.jpg",
    title: "Sports Excellence",
    description: "Comprehensive sports facilities for physical development"
  }
];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % featureImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + featureImages.length) % featureImages.length);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextImage();
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isPlaying, nextImage]);

  const currentImage = featureImages[currentImageIndex];

  return (
    <main className="min-h-screen bg-[#f8f3e9] overflow-x-hidden">
      <NavBar />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CulturalPattern />
        </div>

        <TempleDecoration />
        <TempleSilhouette />

        <div className="relative z-10 container lg:-top-16 mx-auto px-4 py-8 md:py-16 lg:py-20 hero-content">
          {/* Announcements Ticker */}
          <div className="mb-6 md:mb-8">
           
          </div>

          {/* Hero Grid - Adjusted for larger image */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center hero-grid min-h-[70vh] md:min-h-[80vh]">
            
            {/* Left Content - Takes 2/5 on desktop */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6 max-w-xl lg:max-w-none order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-[#8b1a1a] text-[#f8f3e9] px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium"
              >
                <span className="font-serif">ESTD - 1995</span> | CBSE
                Affiliated (1530380)
              </motion.div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 md:space-x-6 logo-heading">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#8b1a1a] leading-tight font-serif hero-heading"
                >
                  <span className="block">Aryavart Ancient</span>
                  <span className="block">Academy</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mt-3 sm:mt-0 relative animate-spin-slow logo-container flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-[#f8f3e9] rounded-full shadow-lg opacity-75 blur-md"></div>
                  <div className="relative z-10 transform transition-transform duration-500 hover:scale-110 logo-pulse">
                    <Image
                      src="https://aaaschool.s3.ap-south-1.amazonaws.com/aaa.png"
                      alt="Aryavart Ancient Academy Logo"
                      width={80}
                      height={80}
                      className="md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm md:text-lg lg:text-xl text-[#5a3e36] hero-description leading-relaxed"
              >
                Cultivate their talents and creativity for a promising tomorrow
                through enriching activities designed to stimulate imagination
                and foster growth.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 cta-buttons"
              >
                <a
                  href="/admission"
                  className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-[#8b1a1a] text-[#f8f3e9] rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md cta-button text-sm md:text-base"
                >
                  Admission Inquiry
                  <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-[#f8f3e9] text-[#8b1a1a] border-2 border-[#8b1a1a] rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#8b1a1a]/10 shadow-md cta-button text-sm md:text-base"
                >
                  Contact Us
                </a>
              </motion.div>

              {/* Feature highlights - Stacked on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-3 md:gap-4 pt-2 md:pt-4"
              >
                <FeatureCard
                  icon={<Calendar className="h-4 w-4 md:h-5 md:w-5 text-[#8b1a1a]" />}
                  title="Established 1995"
                  description="Decades of academic excellence"
                />
                <FeatureCard
                  icon={<Award className="h-4 w-4 md:h-5 md:w-5 text-[#8b1a1a]" />}
                  title="CBSE Affiliated"
                  description="Quality education standards"
                />
                <FeatureCard
                  icon={<BookOpen className="h-4 w-4 md:h-5 md:w-5 text-[#8b1a1a]" />}
                  title="Vedic Principles"
                  description="Traditional values with modern education"
                />
              </motion.div>
            </div>

            {/* Right Content - Image Slider Takes 3/5 on desktop, full width on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-3 relative order-1 lg:order-2 w-full"
            >
              {/* Background decorative elements */}
              <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-32 h-32 md:w-64 md:h-64 bg-[#8b1a1a] opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-32 h-32 md:w-64 md:h-64 bg-[#d4b483] opacity-20 rounded-full blur-3xl"></div>

              <div className="relative">
                {/* Temple-inspired frame */}
                <div className="absolute inset-0 bg-[#8b1a1a]/5 rounded-2xl -translate-x-2 translate-y-2 md:-translate-x-4 md:translate-y-4"></div>
                <div className="absolute inset-0 border-4 md:border-8 border-[#8b1a1a]/10 rounded-2xl translate-x-1 -translate-y-1 md:translate-x-2 md:-translate-y-2"></div>

                <div className="relative bg-[#f8f3e9] p-3 md:p-6 rounded-2xl shadow-2xl border border-[#d4b483]/30 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-[#d4b483] opacity-20 rounded-full translate-x-10 -translate-y-10 md:translate-x-16 md:-translate-y-16"></div>

                  {/* Temple-inspired decorative elements */}
                  <div className="absolute top-0 left-0 right-0 h-3 md:h-4 flex justify-center space-x-1 overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-3 md:w-3 md:h-4 bg-[#8b1a1a]/10 rounded-b-sm"
                      ></div>
                    ))}
                  </div>

                  {/* Large Image Slider Container */}
                  <div className="relative pt-3 md:pt-4">
                    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={currentImage.image}
                            alt={currentImage.title}
                            fill
                            className="object-cover shadow-md"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Controls */}
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 flex space-x-2 z-20">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="bg-white/20 backdrop-blur-sm text-white p-1.5 md:p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          {isPlaying ? <Pause className="h-3 w-3 md:h-4 md:w-4" /> : <Play className="h-3 w-3 md:h-4 md:w-4" />}
                        </button>
                      </div>

                      <div className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 z-20">
                        <button
                          onClick={prevImage}
                          className="bg-white/20 backdrop-blur-sm text-white p-1.5 md:p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                      </div>

                      <div className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-20">
                        <button
                          onClick={nextImage}
                          className="bg-white/20 backdrop-blur-sm text-white p-1.5 md:p-2 rounded-full hover:bg-white/30 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                      </div>

                      {/* Image Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white z-20">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                          >
                            <h3 className="text-base md:text-lg lg:text-xl font-bold mb-1">{currentImage.title}</h3>
                            <p className="text-xs md:text-sm opacity-90 leading-relaxed">{currentImage.description}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center mt-3 md:mt-4 space-x-2">
                      {featureImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-[#8b1a1a] w-6 md:w-8' 
                              : 'bg-[#8b1a1a]/30 hover:bg-[#8b1a1a]/50 w-2'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Decorative Konark wheel inspired element - Hidden on small mobile */}
                  <div className="hidden sm:block absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-[#f8f3e9] p-2 md:p-3 rounded-full shadow-lg border border-[#d4b483]/30 animate-pulse">
                    <div className="relative">
                      <div className="scale-75 md:scale-100">
                        <KonarkWheel />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards - Adjusted for mobile */}
              <div className="absolute z-50 -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-[#f8f3e9] p-1.5 md:p-2 rounded-lg shadow-lg border border-[#d4b483]/30 transform rotate-3 animate-float animation-delay-200 floating-card">
                <div className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#8b1a1a]"></div>
                  <span className="text-xs md:text-sm font-medium text-[#5a3e36]">
                    Modern 21st-century skills
                  </span>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-[#f8f3e9] p-1.5 md:p-2 rounded-lg shadow-lg border border-[#d4b483]/30 transform -rotate-3 animate-float animation-delay-300 floating-card">
                <div className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#8b1a1a]"></div>
                  <span className="text-xs md:text-sm font-medium text-[#5a3e36]">
                    Timeless Vedic principles
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-3 right-3 md:left-6 md:right-6 h-0.5 md:h-1 bg-[#8b1a1a]/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#8b1a1a] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  key={currentImageIndex}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
       <div className="mb-6 px-4 md:mb-8">
            <AnnouncementsTicker />
          </div>
      
      <HeaderAcademyLogo />
       <NotificationSection />
      <ImageSlider />

      <SchoolLevels />

      {/* Academic Programs Section */}
      <div id="academic-programs">
        <AcademicPrograms />
      </div>

      {/* Notification Section */}
     
      <SchoolCalendar />
      <SchoolActivities />
      <AryavartHouses />
      <PrincipalMessage />
      <StudentTestimonials />
      <FeedbackSection />
      <Footer />
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
    <div className="bg-white/60 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-md border border-[#d4b483]/20 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/80 group">
      <div className="flex items-start space-x-2 md:space-x-3">
        <div className="p-1.5 md:p-2 bg-[#f8f3e9] rounded-md shadow-sm group-hover:bg-[#8b1a1a]/10 transition-colors duration-300 flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-[#8b1a1a] text-sm md:text-base">{title}</h3>
          <p className="text-xs md:text-sm text-[#5a3e36] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}