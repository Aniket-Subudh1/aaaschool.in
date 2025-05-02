"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function InfiniteLogoScroll() {
  const [scrollDirection, setScrollDirection] = useState("right");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const numberOfLogos = 10;
  const logoArray = Array.from({ length: numberOfLogos }).map((_, i) => i);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("left");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("right");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full py-3 overflow-hidden bg-gradient-to-r from-[#f8f3e9] via-[#f0e6d2] to-[#f8f3e9] border-y border-[#d4b483]/30">
      <div className="relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: scrollDirection === "left" ? "-50%" : "0%",
          }}
          initial={{ x: scrollDirection === "left" ? "0%" : "-50%" }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0,
          }}
        >
          {/* First set of logos */}
          {logoArray.map((index) => (
            <div
              key={`logo-${index}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 border border-[#d4b483]/30 shadow-sm mx-4"
            >
              <div className="relative w-5 h-5 overflow-hidden rounded-full border border-[#8b1a1a]/20 mr-2">
                <Image
                  src="/aaa.png"
                  alt="Aryavart Logo"
                  fill
                  sizes="20px"
                  className="object-cover"
                />
              </div>
              <h4 className="text-xs font-serif font-bold text-[#8b1a1a]">
                Aryavart Ancient Academy
              </h4>
              <span className="mx-1.5 text-[#8b1a1a]/40">•</span>
              <p className="text-[10px] text-[#f0c808] font-medium">
                Est. 1995
              </p>
            </div>
          ))}

          {/* Duplicate set for seamless looping */}
          {logoArray.map((index) => (
            <div
              key={`logo-dup-${index}`}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 border border-[#d4b483]/30 shadow-sm mx-4"
            >
              <div className="relative w-5 h-5 overflow-hidden rounded-full border border-[#8b1a1a]/20 mr-2">
                <Image
                  src="/aaa.png"
                  alt="Aryavart Logo"
                  fill
                  sizes="20px"
                  className="object-cover"
                />
              </div>
              <h4 className="text-xs font-serif font-bold text-[#8b1a1a]">
                Aryavart Ancient Academy
              </h4>
              <span className="mx-1.5 text-[#8b1a1a]/40">•</span>
              <p className="text-[10px] text-[#f0c808] font-medium">
                Est. 1995
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
