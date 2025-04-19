"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function AboutHero() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#f8f3e9]"
    >
      {/* Temple-inspired background pattern */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" className="opacity-5">
          <pattern
            id="konarkPattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#8b1a1a"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="#8b1a1a"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="20"
              stroke="#8b1a1a"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22"
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
      </div>

      {/* Decorative temple silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 opacity-10 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,200 L1200,200 L1200,180 L1000,180 L1000,160 L900,160 L900,140 L850,140 L850,120 L800,120 L800,100 L750,100 C750,100 750,60 700,60 C650,60 650,100 650,100 L600,100 C600,100 600,40 550,40 C500,40 500,100 500,100 L450,100 C450,100 450,60 400,60 C350,60 350,100 350,100 L300,100 L300,120 L250,120 L250,140 L200,140 L200,160 L100,160 L100,180 L0,180 Z"
            fill="#8b1a1a"
          />
        </svg>
      </div>

      {/* Konark wheel decorative elements */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 opacity-10 pointer-events-none"
        style={{ transform: `rotate(${scrollY * 0.05}deg)` }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * Math.PI) / 12;
            const x1 = 100 + 30 * Math.cos(angle);
            const y1 = 100 + 30 * Math.sin(angle);
            const x2 = 100 + 90 * Math.cos(angle);
            const y2 = 100 + 90 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8b1a1a"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      <div
        className="absolute -bottom-20 -left-20 w-80 h-80 opacity-10 pointer-events-none"
        style={{ transform: `rotate(${-scrollY * 0.05}deg)` }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="#8b1a1a"
            strokeWidth="2"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * Math.PI) / 12;
            const x1 = 100 + 30 * Math.cos(angle);
            const y1 = 100 + 30 * Math.sin(angle);
            const x2 = 100 + 90 * Math.cos(angle);
            const y2 = 100 + 90 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#8b1a1a"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-24">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Decorative temple-inspired header */}
          <div className="relative mb-12">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-40 h-32">
              <svg viewBox="0 0 160 120" className="w-full h-full">
                <path
                  d="M80,0 L160,60 L160,120 L0,120 L0,60 Z"
                  fill="none"
                  stroke="#8b1a1a"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="opacity-20"
                />
                <path
                  d="M80,10 L140,60 L140,110 L20,110 L20,60 Z"
                  fill="none"
                  stroke="#8b1a1a"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="opacity-20"
                />
              </svg>
            </div>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-lg"></div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-aaa-CpIW78OZFZG6FBpF9os3cxpWu7bmcN.png"
                alt="Aryavart Ancient Academy Logo"
                width={120}
                height={120}
                className="relative z-10"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-6"
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
            className="text-xl md:text-2xl text-[#5a3e36] max-w-3xl mx-auto mb-12 font-serif"
          >
            Discover our journey of educational excellence since 1995, blending
            ancient wisdom with modern learning approaches
          </motion.p>

          {/* Circular image gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative w-full max-w-4xl mx-auto h-[400px] mb-16"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-4 border-dashed border-[#8b1a1a]/30"></div>

            {/* Center image */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-[#8b1a1a]/20 rounded-full blur-md"></div>
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#f8f3e9]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iSWbKkRwpGYsLu6NR3yDrJaaNoGFlJ.png"
                    alt="School building"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Orbiting images */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i * Math.PI) / 3;
              const x = 150 * Math.cos(angle);
              const y = 150 * Math.sin(angle);
              const delay = 0.9 + i * 0.1;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay }}
                  className="absolute top-1/2 left-1/2 z-10"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#f8f3e9]">
                    <Image
                      src={`/placeholder.svg?height=100&width=100`}
                      alt={`School image ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

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
        </div>
      </div>
    </section>
  );
}
