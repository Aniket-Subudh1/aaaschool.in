"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Loader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const letters = "AAA".split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#5a3e36] to-[#483028] z-50"
    >
      <div className="relative flex flex-col items-center justify-center space-y-6">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="w-28 h-28 relative flex items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full bg-[#f0c808]/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.2, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Image
              src="/aaa.png"
              alt="AAA Logo"
              width={112}
              height={112}
              className="w-full h-full relative z-10 drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Text with letter-by-letter animation */}
        <div className="text-2xl md:text-4xl font-bold text-transparent">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                y: index % 2 === 0 ? -20 : 20,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3 + index * 0.03,
                ease: "easeOut",
              }}
              className={`inline-block ${
                letter === " " ? "mr-2" : ""
              } text-[#f0c808]`}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Progress loader line */}
        <div className="relative mt-8 w-60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-1.5 bg-gradient-to-r from-[#f0c808]/70 via-[#f0c808] to-[#f0c808]/70 rounded-full overflow-hidden shadow-inner"
          >
            <motion.div
              animate={{
                x: ["-100%", "200%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="h-full w-1/2 bg-white/80 rounded-full blur-[2px]"
            />
          </motion.div>
        </div>

        {/* Subtitle with fade in */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="text-white/90 mt-2 font-serif tracking-wider text-lg"
        >
          <span className="font-light">Exploring</span>{" "}
          <span className="font-medium">Our Journey</span>
          <span className="animate-pulse">...</span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
