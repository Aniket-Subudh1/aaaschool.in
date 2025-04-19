"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface SectionContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  darkBg?: boolean;
  className?: string;
  id?: string;
  titleColor?: string;
  subtitleColor?: string;
  decorationPosition?: "left" | "right" | "center" | "none";
}

export default function SectionContainer({
  children,
  title,
  subtitle,
  darkBg = false,
  className = "",
  id,
  titleColor,
  subtitleColor,
  decorationPosition = "center",
}: SectionContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 md:py-24 relative ${
        darkBg ? "bg-[#5a3e36] text-white" : "bg-[#f8f3e9]"
      } ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          {/* Decorative Odisha temple-inspired element */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-16 h-8 opacity-20 hidden md:block">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              <path
                d="M50,0 L100,50 L0,50 Z"
                fill={darkBg ? "#f0c808" : "#8b1a1a"}
              />
            </svg>
          </div>

          {/* Odisha dance figure decoration */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 opacity-30 hidden md:block animate-odissi">
            <Image
              src="/images/odisha-dance.svg"
              alt="Dance figure"
              width={30}
              height={30}
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className={`text-3xl md:text-4xl font-bold ${
              titleColor ? titleColor : darkBg ? "text-white" : "text-[#8b1a1a]"
            } mb-4 font-serif relative inline-block`}
          >
            {title}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="absolute -bottom-1 left-0 h-0.5 bg-[#f0c808]"
            ></motion.div>
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${
                subtitleColor
                  ? subtitleColor
                  : darkBg
                  ? "text-white/80"
                  : "text-[#5a3e36]"
              } max-w-3xl mx-auto`}
            >
              {subtitle}
            </motion.p>
          )}

          {decorationPosition !== "none" && (
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "80px" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`h-1 bg-[#f0c808] mt-6 relative ${
                decorationPosition === "center"
                  ? "mx-auto"
                  : decorationPosition === "left"
                  ? "mr-auto"
                  : "ml-auto"
              }`}
            >
              {/* Decorative dots on the line */}
              <motion.div
                className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#f0c808]/50"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              />
              <motion.div
                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#f0c808]/50"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              />
            </motion.div>
          )}
        </div>

        {children}
      </div>

      {/* Odisha border pattern at top */}
      <div className="absolute top-0 left-0 w-full h-8 opacity-20 transform rotate-180">
        <Image
          src="/images/odisha-border.svg"
          alt="Decorative border"
          width={800}
          height={50}
          className="w-full"
        />
      </div>
    </section>
  );
}
