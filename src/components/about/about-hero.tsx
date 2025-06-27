"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { memo } from "react";

const galleryImages = [
  {
    title: "School Campus",
    alt: "Our beautiful school campus",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/cul.jpg",
  },
  {
    title: "Cultural Programs",
    alt: "Students performing in cultural program",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/LIB.jpg",
  },
  {
    title: "Science Labs",
    alt: "Modern science laboratory",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/tk.jpg",
  },
  {
    title: "Library",
    alt: "Our well-stocked library",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/tb.jpg",
  },
  {
    title: "Sports Facilities",
    alt: "Sports ground and facilities",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/gui.jpg",
  },
  {
    title: "Meditation Center",
    alt: "Peaceful meditation space",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/il.jpg",
  },
  {
    title: "Art Studio",
    alt: "Creative art space",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/sc.jpg",
  },
  {
    title: "Computer Lab",
    alt: "Modern computer laboratory",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/dr.jpg",
  },
  {
    title: "School Events",
    alt: "Annual school function",
    src: "https://aaaschool.s3.ap-south-1.amazonaws.com/ncc.jpg",
  },
];

// Simplified SVG patterns
const konarkWheelSvg = `
  <circle cx="100" cy="100" r="90" fill="none" stroke="#8b1a1a" stroke-width="2" />
  <circle cx="100" cy="100" r="50" fill="none" stroke="#8b1a1a" stroke-width="2" />
`;

const tempeSilhouetteSvg = `
  <path d="M0,200 L1200,200 L1200,180 L1000,180 L1000,160 L900,160 L900,140 L850,140 L850,120 L800,120 L800,100 L750,100 C750,100 750,60 700,60 C650,60 650,100 650,100 L600,100 C600,100 600,40 550,40 C500,40 500,100 500,100 L450,100 C450,100 450,60 400,60 C350,60 350,100 350,100 L300,100 L300,120 L250,120 L250,140 L200,140 L200,160 L100,160 L100,180 L0,180 Z" fill="#8b1a1a" />
`;

export default function AboutHeroParallax() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgPatternY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const templeSilhouetteY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const konarkWheelRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const konarkWheelReverseRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -45]
  );
  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Use fewer images per row and memoize rows
  const { firstRow, secondRow, thirdRow } = useMemo(() => {
    return {
      firstRow: galleryImages.slice(0, 3),
      secondRow: galleryImages.slice(3, 6),
      thirdRow: galleryImages.slice(6, 9),
    };
  }, []);

  // Optimized parallax speeds
  const translateX = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const translateXReverse = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const translateXSlow = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#f8f3e9] will-change-transform"
    >
      {/* Simplified background pattern */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: bgPatternY }}
      >
        <svg width="100%" height="100%" className="opacity-5">
          <pattern
            id="konarkPattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <circle
              cx="100"
              cy="100"
              r="40"
              stroke="#8b1a1a"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M100,60 L100,140 M60,100 L140,100"
              stroke="#8b1a1a"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#konarkPattern)"
          />
        </svg>
      </motion.div>

      {/* Optimized temple silhouette */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-10 pointer-events-none will-change-transform"
        style={{ y: templeSilhouetteY }}
      >
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: tempeSilhouetteSvg }}
        />
      </motion.div>

      {/* Optimized Konark wheel */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 opacity-10 pointer-events-none will-change-transform"
        style={{ rotate: konarkWheelRotate }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: konarkWheelSvg }}
        />
      </motion.div>

      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 opacity-10 pointer-events-none will-change-transform"
        style={{ rotate: konarkWheelReverseRotate }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: konarkWheelSvg }}
        />
      </motion.div>

      {/* Header Content */}
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-8">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.div
            style={{ y: headerY }}
            className="relative mb-8 will-change-transform"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-lg"></div>
              <Image
                src="https://aaaschool.s3.ap-south-1.amazonaws.com/aaa.png"
                alt="Aryavart Ancient Academy Logo"
                width={120}
                height={120}
                className="relative z-10"
                priority // Load with priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ scale: titleScale }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-6 will-change-transform"
          >
            <div className="absolute -left-6 -top-6 w-12 h-12 border-t-2 border-l-2 border-[#8b1a1a]"></div>
            <div className="absolute -right-6 -top-6 w-12 h-12 border-t-2 border-r-2 border-[#8b1a1a]"></div>
            <div className="absolute -left-6 -bottom-6 w-12 h-12 border-b-2 border-l-2 border-[#8b1a1a]"></div>
            <div className="absolute -right-6 -bottom-6 w-12 h-12 border-b-2 border-r-2 border-[#8b1a1a]"></div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#8b1a1a] font-serif px-8 py-4">
              ABOUT US
            </h1>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-[#d4b483] mb-8"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl text-[#5a3e36] max-w-3xl mx-auto mb-8 font-serif"
          >
            Discover our journey of educational excellence since 1995, blending
            ancient wisdom with modern learning approaches
          </motion.p>
        </div>

        {/* Optimized Image Parallax Gallery */}
        <div className="relative overflow-hidden">
          {/* First row - moves left */}
          <motion.div
            className="flex space-x-6 mb-6"
            style={{ x: translateX }}
            transition={{ type: "tween" }}
          >
            {firstRow.map((image, index) => (
              <ElegantCard key={`first-${index}`} image={image} />
            ))}
            {/* Reduced duplicate images for better performance */}
            {firstRow.slice(0, 2).map((image, index) => (
              <ElegantCard key={`first-dup-${index}`} image={image} />
            ))}
          </motion.div>

          {/* Second row - moves right */}
          <motion.div
            className="flex space-x-6 mb-6"
            style={{ x: translateXReverse }}
            transition={{ type: "tween" }}
          >
            {secondRow.map((image, index) => (
              <ElegantCard key={`second-${index}`} image={image} />
            ))}
            {/* Reduced duplicate images for better performance */}
            {secondRow.slice(0, 2).map((image, index) => (
              <ElegantCard key={`second-dup-${index}`} image={image} />
            ))}
          </motion.div>

          {/* Third row - moves left slower */}
          <motion.div
            className="flex space-x-6"
            style={{ x: translateXSlow }}
            transition={{ type: "tween" }}
          >
            {thirdRow.map((image, index) => (
              <ElegantCard key={`third-${index}`} image={image} />
            ))}
            {/* Reduced duplicate images for better performance */}
            {thirdRow.slice(0, 2).map((image, index) => (
              <ElegantCard key={`third-dup-${index}`} image={image} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-[#8b1a1a] mb-2 text-sm">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <ChevronDown className="h-6 w-6 text-[#8b1a1a]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

interface OptimizedCardProps {
  image: {
    title: string;
    alt: string;
    src: string;
  };
}

// Elegant card design using CSS instead of SVG for better performance and aesthetics
const ElegantCard = memo(({ image }: OptimizedCardProps) => {
  return (
    <div className="group relative shrink-0 h-48 md:h-64 w-64 md:w-80 overflow-hidden will-change-transform">
      {/* Decorative outer border with traditional pattern */}
      <div className="absolute inset-0 rounded-md border-[3px] border-[#8b1a1a]/20 bg-transparent z-10 pointer-events-none">
        {/* Corner embellishments using pure CSS */}
        <div className="absolute top-[-2px] left-[-2px] w-5 h-5 border-t-[3px] border-l-[3px] border-[#8b1a1a]/60 rounded-tl-sm"></div>
        <div className="absolute top-[-2px] right-[-2px] w-5 h-5 border-t-[3px] border-r-[3px] border-[#8b1a1a]/60 rounded-tr-sm"></div>
        <div className="absolute bottom-[-2px] left-[-2px] w-5 h-5 border-b-[3px] border-l-[3px] border-[#8b1a1a]/60 rounded-bl-sm"></div>
        <div className="absolute bottom-[-2px] right-[-2px] w-5 h-5 border-b-[3px] border-r-[3px] border-[#8b1a1a]/60 rounded-br-sm"></div>

        {/* Decorative middle points on each side */}
        <div className="absolute top-[-2px] left-1/2 w-8 h-[3px] bg-[#8b1a1a]/40 transform -translate-x-1/2"></div>
        <div className="absolute bottom-[-2px] left-1/2 w-8 h-[3px] bg-[#8b1a1a]/40 transform -translate-x-1/2"></div>
        <div className="absolute left-[-2px] top-1/2 h-8 w-[3px] bg-[#8b1a1a]/40 transform -translate-y-1/2"></div>
        <div className="absolute right-[-2px] top-1/2 h-8 w-[3px] bg-[#8b1a1a]/40 transform -translate-y-1/2"></div>
      </div>

      {/* Inner card with image */}
      <div className="absolute inset-[6px] overflow-hidden rounded-sm shadow-md bg-white z-0 border border-[#8b1a1a]/10">
        <div className="absolute inset-0">
          <Image
            src={
              image.src ||
              `/placeholder.svg?height=300&width=400&text=${image.title}`
            }
            alt={image.alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 256px, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ transform: "translate3d(0,0,0)" }}
          />
        </div>
      </div>

      {/* Inner shadow for depth */}
      <div className="absolute inset-[6px] pointer-events-none shadow-inner rounded-sm z-20"></div>

      {/* Hover effects */}
      <div className="absolute inset-0 bg-[#8b1a1a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md z-20 pointer-events-none"></div>

      {/* Golden corner accents on hover */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
        <div className="absolute top-0 left-0 w-4 h-px bg-[#d4b483]"></div>
        <div className="absolute top-0 left-0 h-4 w-px bg-[#d4b483]"></div>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
        <div className="absolute top-0 right-0 w-4 h-px bg-[#d4b483]"></div>
        <div className="absolute top-0 right-0 h-4 w-px bg-[#d4b483]"></div>
      </div>
      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
        <div className="absolute bottom-0 left-0 w-4 h-px bg-[#d4b483]"></div>
        <div className="absolute bottom-0 left-0 h-4 w-px bg-[#d4b483]"></div>
      </div>
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
        <div className="absolute bottom-0 right-0 w-4 h-px bg-[#d4b483]"></div>
        <div className="absolute bottom-0 right-0 h-4 w-px bg-[#d4b483]"></div>
      </div>
    </div>
  );
});

// Add display name for debugging
ElegantCard.displayName = "ElegantCard";
