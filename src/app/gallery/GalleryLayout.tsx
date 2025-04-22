"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Newspaper,
  ChevronRight,
  Home,
  Menu,
  X,
  Eye,
  ArrowUp,
  Clock,
  Star,
} from "lucide-react";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";

type GalleryLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
  backgroundClass?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export default function GalleryLayout({
  children,
  title,
  description,
  backgroundClass = "from-[#8b1a1a] to-[#a52a2a]",
}: GalleryLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isClient) {
    return null;
  }

  const categories = [
    {
      title: "Photo Albums",
      href: "/gallery/photo",
      icon: <Camera className="h-5 w-5" />,
      color: "bg-indigo-600/80 hover:bg-indigo-600",
    },
    {
      title: "Video Gallery",
      href: "/gallery/video",
      icon: <Video className="h-5 w-5" />,
      color: "bg-rose-600/80 hover:bg-rose-600",
    },
    {
      title: "News Bulletins",
      href: "/gallery/news-bulletin",
      icon: <Newspaper className="h-5 w-5" />,
      color: "bg-amber-600/80 hover:bg-amber-600",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Floating shapes animation for background
  const floatingShapes = [
    { delay: 0, duration: 15, size: 300, top: "10%", left: "5%" },
    { delay: 2, duration: 20, size: 200, top: "60%", left: "85%" },
    { delay: 1, duration: 18, size: 150, top: "20%", left: "90%" },
    { delay: 3, duration: 25, size: 250, top: "70%", left: "15%" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow ">
        {/* Header Section */}
        <div
          className={`bg-gradient-to-r ${backgroundClass} text-white py-16 px-4 relative overflow-hidden`}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute inset-0 overflow-hidden">
              {floatingShapes.map((shape, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20"
                  style={{
                    width: `${shape.size}px`,
                    height: `${shape.size}px`,
                    top: shape.top,
                    left: shape.left,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: shape.duration,
                    delay: shape.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
            <div className="flex justify-center w-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={`top-${i}`}
                  className="w-6 h-8 bg-white/10 mx-0.5 rounded-b-lg"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.01,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center text-sm mb-4 text-white/80">
              <Link
                href="/"
                className="hover:text-white transition-colors flex items-center"
              >
                <Home size={14} className="mr-1" />
                Home
              </Link>
              <ChevronRight size={14} className="mx-1" />
              <Link
                href="/gallery"
                className="hover:text-white transition-colors"
              >
                Gallery
              </Link>
              {title !== "Gallery" && (
                <>
                  <ChevronRight size={14} className="mx-1" />
                  <span>{title}</span>
                </>
              )}
            </div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
              {description && (
                <p className="text-lg max-w-3xl opacity-90">{description}</p>
              )}

              <div className="flex flex-wrap gap-3 mt-6">
                {title === "Gallery" ? (
                  <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                    <Clock size={14} className="mr-1.5" />
                    Updated {new Date().toLocaleDateString()}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                      <Eye size={14} className="mr-1.5" />
                      Gallery Section
                    </div>
                    <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                      <Star size={14} className="mr-1.5" />
                      {title}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-[#f8f3e9] py-4 shadow-sm border-b border-[#d4b483]/20 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="hidden md:flex overflow-x-auto space-x-2 py-1 no-scrollbar">
                <Link
                  href="/gallery"
                  className={`px-4 py-2 rounded-full transition-colors flex items-center whitespace-nowrap text-sm ${
                    title === "Gallery"
                      ? "bg-[#8b1a1a] text-white"
                      : "bg-[#8b1a1a]/10 text-[#8b1a1a] hover:bg-[#8b1a1a]/20"
                  }`}
                >
                  All Collections
                </Link>

                {categories.map((category) => (
                  <Link
                    key={category.title}
                    href={category.href}
                    className={`px-4 py-2 rounded-full transition-colors flex items-center whitespace-nowrap text-sm ${
                      title === category.title
                        ? category.color + " text-white"
                        : "bg-[#8b1a1a]/10 text-[#8b1a1a] hover:bg-[#8b1a1a]/20"
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2">{category.title}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`px-4 py-2 rounded-full transition-colors flex items-center whitespace-nowrap text-sm ${
                    mobileMenuOpen
                      ? "bg-[#8b1a1a] text-white"
                      : "bg-[#8b1a1a]/10 text-[#8b1a1a]"
                  }`}
                >
                  {mobileMenuOpen ? (
                    <X size={16} className="mr-1" />
                  ) : (
                    <Menu size={16} className="mr-1" />
                  )}
                  {mobileMenuOpen ? "Close" : "Menu"}
                </button>
              </div>

              <div className="hidden md:flex space-x-3">
                <Link
                  href="/"
                  className="flex items-center bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-1.5 rounded-full text-sm hover:bg-[#8b1a1a]/20"
                >
                  <Home size={14} className="mr-1.5" />
                  Home
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden pt-3"
                >
                  <div className="space-y-2">
                    <Link
                      href="/gallery"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-md transition-colors ${
                        title === "Gallery"
                          ? "bg-[#8b1a1a] text-white"
                          : "bg-[#8b1a1a]/10 text-[#8b1a1a]"
                      }`}
                    >
                      All Collections
                    </Link>

                    {categories.map((category) => (
                      <Link
                        key={category.title}
                        href={category.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-md transition-colors flex items-center ${
                          title === category.title
                            ? category.color.replace("hover:", "") +
                              " text-white"
                            : "bg-[#8b1a1a]/10 text-[#8b1a1a]"
                        }`}
                      >
                        {category.icon}
                        <span className="ml-2">{category.title}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#f8f3e9]/30">{children}</div>
      </main>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-[#8b1a1a] text-white p-3 rounded-full shadow-lg z-40 hover:bg-[#8b1a1a]/90 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(20px, 20px) rotate(5deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
