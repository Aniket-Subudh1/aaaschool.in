"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface SectionConnectorProps {
  type: "curve" | "wave" | "zigzag" | "temple";
  inverted?: boolean;
}

export default function SectionConnector({
  type,
  inverted = false,
}: SectionConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  // SVG paths for different connector types
  const paths = {
    curve: "M0,0 C300,80 500,0 800,0 L800,0 L0,0 Z",
    wave: "M0,0 C200,40 250,-40 400,0 C550,40 600,-40 800,0 L800,0 L0,0 Z",
    zigzag: "M0,0 L200,50 L400,0 L600,50 L800,0 L800,0 L0,0 Z",
    temple: "M0,0 L350,0 L400,40 L450,0 L800,0 L800,0 L0,0 Z",
  };

  return (
    <div
      ref={ref}
      className="relative h-16 md:h-24 w-full overflow-hidden z-10"
    >
      <motion.div
        initial={{ y: inverted ? -100 : 100, opacity: 0 }}
        animate={
          isInView
            ? { y: 0, opacity: 1 }
            : { y: inverted ? -100 : 100, opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        style={{ transform: inverted ? "rotate(180deg)" : "rotate(0deg)" }}
        className="absolute inset-0"
      >
        <svg
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#f8f3e9] dark:fill-[#f8f3e9]"
        >
          <path d={paths[type]} />
        </svg>

        {/* Decorative Odisha pattern on the connector */}
        {type === "temple" && (
          <div
            className={`absolute ${
              inverted ? "bottom-0" : "top-0"
            } left-1/2 transform -translate-x-1/2 ${
              inverted ? "translate-y-2" : "-translate-y-2"
            } w-24 h-8 opacity-40`}
          >
            <Image
              src="/images/odisha-border.svg"
              alt="Decorative border"
              width={100}
              height={20}
              className={`w-full ${inverted ? "rotate-180" : ""}`}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
