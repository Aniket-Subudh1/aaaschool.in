"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TempleDecoration() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={`top-${i}`}
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.02,
                ease: "easeOut",
              }}
              className="w-6 h-8 bg-[#8b1a1a]/10 mx-0.5 rounded-b-lg"
            />
          ))}
        </div>
      </div>

      {/* Side temple-inspired pillars */}
      <div className="absolute top-1/4 left-0 bottom-1/4 w-6 hidden lg:block">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full w-full bg-[#8b1a1a]/5 rounded-r-lg"
        >
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#8b1a1a]/10 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#8b1a1a]/10 rounded-br-lg"></div>
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-[#d4b483]/30"></div>
          <div className="absolute top-2/4 left-0 right-0 h-1 bg-[#d4b483]/30"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-[#d4b483]/30"></div>
        </motion.div>
      </div>

      <div className="absolute top-1/4 right-0 bottom-1/4 w-6 hidden lg:block">
        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full w-full bg-[#8b1a1a]/5 rounded-l-lg"
        >
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#8b1a1a]/10 rounded-tl-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#8b1a1a]/10 rounded-bl-lg"></div>
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-[#d4b483]/30"></div>
          <div className="absolute top-2/4 left-0 right-0 h-1 bg-[#d4b483]/30"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-[#d4b483]/30"></div>
        </motion.div>
      </div>

      {/* Konark wheel inspired decorative elements */}
      <div className="absolute -top-16 -right-16 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b1a1a]">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            const x1 = 50 + 15 * Math.cos(angle);
            const y1 = 50 + 15 * Math.sin(angle);
            const x2 = 50 + 45 * Math.cos(angle);
            const y2 = 50 + 45 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      <div className="absolute -bottom-16 -left-16 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b1a1a]">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * Math.PI) / 8;
            const x1 = 50 + 15 * Math.cos(angle);
            const y1 = 50 + 15 * Math.sin(angle);
            const x2 = 50 + 45 * Math.cos(angle);
            const y2 = 50 + 45 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
