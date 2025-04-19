"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function TopSchool() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div ref={ref} className="relative py-24 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image src=" " alt="School background" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5a3e36]/90 to-[#5a3e36]/70"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-pattern.png')] bg-repeat opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#5a3e36] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#5a3e36] to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute inset-0 bg-[#f0c808]/30 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-[#f0c808]/20 backdrop-blur-sm rounded-full p-3 border-2 border-[#f0c808]/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight"
          >
            ONE OF THE TOP CBSE SCHOOLS IN BHUBANESWAR, KHORDHA
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "120px" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-1 bg-[#f0c808] mx-auto mb-8"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-white/90 text-xl md:text-2xl mb-12 font-serif"
          >
            At Aryavart, students learn to be tolerant, supportive and accepting
            of differences in abilities and beliefs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span className="text-white font-medium">
                Total Capacity: 1200 Students
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span className="text-white font-medium">
                Teacher : Student Ratio 1:20
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span className="text-white font-medium">
                35 acres Green Campus
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#f0c808] hover:bg-white text-[#5a3e36] font-bold rounded-full shadow-lg transition-all duration-300 text-lg"
            >
              JOIN AAA
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 border-2 border-[#f0c808]/30 rounded-full"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 border-2 border-[#f0c808]/30 rounded-full"></div>
    </div>
  );
}
