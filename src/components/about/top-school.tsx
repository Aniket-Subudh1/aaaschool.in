"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import {
  Award,
  BookOpen,
  Users,
  PenTool,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function TopSchool() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );

  return (
    <div ref={ref} className="relative py-28 overflow-hidden">
      {/* Improved background image with parallax effect */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <Image
          src="https://aaaschool.s3.ap-south-1.amazonaws.com/cp.jpg"
          alt="School campus aerial view"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5a3e36]/95 to-[#5a3e36]/80"></div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-pattern.png')] bg-repeat opacity-5 mix-blend-overlay"></div>

      {/* Top and bottom gradients */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#5a3e36] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#5a3e36] to-transparent"></div>

      {/* Decorative shapes */}
      <div className="absolute -top-20 -left-20 w-48 h-48 border-2 border-[#f0c808]/20 rounded-full"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 border border-[#f0c808]/15 rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/3 w-16 h-16 border border-[#f0c808]/10 rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-48 h-48 border-2 border-[#f0c808]/20 rounded-full"></div>

      {/* Floating accent dots */}
      <div className="absolute top-1/3 right-10 w-3 h-3 bg-[#f0c808]/40 rounded-full"></div>
      <div className="absolute bottom-1/4 left-16 w-5 h-5 bg-[#f0c808]/30 rounded-full"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity }} className="max-w-5xl mx-auto">
          {/* Top section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block mb-6 relative"
            >
              <div className="absolute inset-0 bg-[#f0c808]/40 rounded-full blur-xl"></div>
              <div className="relative z-10 bg-[#f0c808]/30 backdrop-blur-sm rounded-full p-4 border-2 border-[#f0c808]/50 shadow-xl">
                <PenTool size={32} className="text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight"
            >
              ONE OF THE TOP CBSE SCHOOLS IN BHUBANESWAR, KHORDHA
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: "150px" } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="h-1.5 bg-gradient-to-r from-[#f0c808]/70 via-[#f0c808] to-[#f0c808]/70 mx-auto mb-8 rounded-full"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="text-white/90 text-xl md:text-2xl mb-14 font-serif leading-relaxed max-w-3xl mx-auto"
            >
              At Aryavart, students learn to be tolerant, supportive and
              accepting of differences in abilities and beliefs while excelling
              in academics and character.
            </motion.p>
          </div>

          {/* Key stats section - Redesigned as feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg group hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#f0c808]/20 rounded-lg">
                  <Users size={24} className="text-[#f0c808]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    1200 Students
                  </h3>
                  <p className="text-white/80">
                    Total capacity with personalized attention for each student
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg group hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#f0c808]/20 rounded-lg">
                  <BookOpen size={24} className="text-[#f0c808]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    1:20 Ratio
                  </h3>
                  <p className="text-white/80">
                    Teacher to student ratio ensuring focused education
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg group hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#f0c808]/20 rounded-lg">
                  <Award size={24} className="text-[#f0c808]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    35 Acre Campus
                  </h3>
                  <p className="text-white/80">
                    Expansive green campus promoting holistic development
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements section - New addition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto mb-16"
          >
            <div className="flex flex-col sm:flex-row justify-center items-center bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="mb-6 sm:mb-0 sm:mr-10">
                <div className="w-20 h-20 rounded-full bg-[#f0c808]/20 flex items-center justify-center mx-auto">
                  <CheckCircle size={40} className="text-[#f0c808]" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4 text-center sm:text-left">
                  Our Achievements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-[#f0c808]"></div>
                    </div>
                    <p className="text-white/90">
                      Consistently ranked among top CBSE schools in Odisha
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-[#f0c808]"></div>
                    </div>
                    <p className="text-white/90">
                      100% Results record for admissions
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1">
                      <div className="w-3 h-3 rounded-full bg-[#f0c808]"></div>
                    </div>
                    <p className="text-white/90">
                      Excellence in academics, sports and cultural activities
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA Section - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.a
              href="/admission"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#f0c808] hover:bg-white text-[#5a3e36] font-bold rounded-full shadow-xl transition-all duration-300 text-lg group"
            >
              <span>JOIN AAA TODAY</span>
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.a>

            <p className="text-white/70 mt-6">
              Applications open for the 2025-26 academic year
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
