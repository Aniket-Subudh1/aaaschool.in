"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, BookOpen, GraduationCap, Heart } from "lucide-react";

export default function OurApproach() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section className="py-16 bg-gradient-to-b from-[#f0e6d2] to-[#f8f3e9] relative overflow-hidden">
      {/* Temple-inspired decorative top border */}
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`top-${i}`}
              className="w-6 h-8 bg-[#8b1a1a]/10 mx-0.5 rounded-b-lg"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 relative"
          >
            <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
              <Lightbulb className="h-8 w-8 text-[#8b1a1a]" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif"
          >
            OUR APPROACH
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 bg-[#d4b483] mx-auto mb-6"
          ></motion.div>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#8b1a1a] text-center"
            >
              <div className="bg-[#f8f3e9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">
                Holistic Education
              </h3>
              <p className="text-[#5a3e36] text-sm">
                We focus on developing the whole child - intellectually,
                physically, emotionally, and spiritually.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#d4b483] text-center"
            >
              <div className="bg-[#f8f3e9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">
                Value-Based Learning
              </h3>
              <p className="text-[#5a3e36] text-sm">
                Our curriculum integrates traditional values with modern
                educational practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#8b1a1a] text-center"
            >
              <div className="bg-[#f8f3e9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#8b1a1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">
                Nurturing Environment
              </h3>
              <p className="text-[#5a3e36] text-sm">
                We create a supportive atmosphere where students feel safe to
                explore and grow.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg border border-[#d4b483]/20">
              <p className="text-[#5a3e36] text-lg leading-relaxed mb-6">
                At Aryavart, students learn to be tolerant, supportive and
                accepting of differences in abilities and beliefs. These values
                will take them beyond the narrow definitions of success and
                achievement.
              </p>

              <div className="w-32 h-1 bg-[#8b1a1a]/30 mx-auto mb-6"></div>

              <p className="text-[#8b1a1a] text-lg leading-relaxed italic font-medium">
                &ldquo;As the world moves towards unsafe and unsettled times, we
                will continue to provide to our students lessons in kindness,
                courage and generosity of the Indian culture and its ability to
                reconstruct and rebuild.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
