"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export default function OurHistory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <div id="history" className="relative py-24 bg-[#f8f3e9] overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-bg.png')] bg-repeat opacity-5"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#d4b483]/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#8b1a1a]/5 blur-3xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-12 h-12 border border-[#d4b483] rounded-full opacity-20"></div>
      <div className="absolute bottom-40 right-10 w-8 h-8 border border-[#8b1a1a] rounded-full opacity-20"></div>
      <div className="absolute top-1/3 right-20 w-5 h-5 bg-[#d4b483] rounded-full opacity-10"></div>
      <div className="absolute bottom-1/3 left-20 w-5 h-5 bg-[#8b1a1a] rounded-full opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 relative"
          >
            <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
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
                className="text-[#8b1a1a]"
              >
                <path d="M12 8v4l2 2"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif"
          >
            OUR JOURNEY
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-[#d4b483] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[#5a3e36] max-w-3xl mx-auto text-lg"
          >
            A rich heritage of academic excellence and holistic development that
            has shaped generations of students
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
            {/* First column */}
            <motion.div style={{ y }} className="md:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#8b1a1a] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8b1a1a]/5 rounded-bl-full"></div>
                <h3 className="text-xl font-semibold text-[#8b1a1a] mb-3 relative z-10">
                  Our Foundation
                </h3>
                <p className="text-[#5a3e36] relative z-10">
                  Located away from busy streets in the city, surrounded by lush
                  greenery, AAA is cited in the lap of nature&apos;s beauty. Our
                  school embraces a holistic educational philosophy that
                  celebrates experimentation, expressions, and discovering
                  talents.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-[#8b1a1a]/10 to-[#8b1a1a]/5 p-6 rounded-xl shadow-md"
              >
                <div className="flex mb-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Image
                      src="/aaa.png"
                      alt="Aryavart Ancient Academy Logo"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[#8b1a1a]">
                      Our Campus
                    </h3>
                    <p className="text-[#5a3e36] text-sm">
                      Nurturing environment
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-[#8b1a1a] font-bold text-xl">35</span>
                    <span className="text-[#5a3e36] ml-2 text-sm">acres</span>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-[#8b1a1a] font-bold text-xl">
                      5k+
                    </span>
                    <span className="text-[#5a3e36] ml-2 text-sm">alumni</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Center column - Main image */}
            <motion.div
              style={{ scale, rotate }}
              className="md:col-span-1 relative order-first md:order-none mb-8 md:mb-0"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#d4b483]/20 rounded-2xl -translate-x-6 translate-y-6"></div>
                <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-2xl translate-x-3 -translate-y-3"></div>
                <div className="relative bg-white p-3 rounded-2xl shadow-xl border border-[#d4b483]/30">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src="/ns.jpg"
                      alt="School students and building"
                      width={500}
                      height={380}
                      className="rounded-xl object-cover w-full h-[300px] md:h-[380px]"
                    />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-[#f0c808]/20 rounded-br-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#8b1a1a]/20 rounded-tl-3xl"></div>

                  {/* Corner accents */}
                  <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-white/50"></div>
                  <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-white/50"></div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-5 right-0 left-0 mx-auto w-40 bg-[#8b1a1a] text-white px-4 py-2 rounded-full shadow-lg text-center"
              >
                <span className="font-bold">Since 1995</span>
              </motion.div>
            </motion.div>

            {/* Third column */}
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]),
              }}
              className="md:col-span-1 space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#d4b483] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4b483]/5 rounded-bl-full"></div>
                <h3 className="text-xl font-semibold text-[#d4b483] mb-3 relative z-10">
                  Our Philosophy
                </h3>
                <p className="text-[#5a3e36] relative z-10">
                  AAA is a path to innovative education with a blend of modern
                  and ancient pedagogy. We design our curriculum to make
                  today&apos;s child future ready, deeply connected to their
                  roots, values and cultures.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#8b1a1a]/10 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#d4b483]/10 rounded-full"></div>
                <svg
                  className="w-8 h-8 text-[#8b1a1a]/20 mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-[#5a3e36] italic font-medium relative z-10">
                  &ldquo;The ethos of the school reflects the rich legacy of our
                  culture and helps to nurture to be a responsible
                  citizen.&rdquo;
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom feature section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
          >
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#d4b483]/20 flex">
              <div className="w-12 h-12 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#8b1a1a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#8b1a1a] mb-2">
                  Cultural Heritage
                </h3>
                <p className="text-[#5a3e36] text-sm">
                  Preserving traditional values while embracing modern education
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#d4b483]/20 flex">
              <div className="w-12 h-12 rounded-full bg-[#d4b483]/10 flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#d4b483]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#d4b483] mb-2">
                  Holistic Growth
                </h3>
                <p className="text-[#5a3e36] text-sm">
                  Developing intellectual, physical, emotional and spiritual
                  aspects
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-[#d4b483]/20 flex">
              <div className="w-12 h-12 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#8b1a1a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#8b1a1a] mb-2">
                  Global Perspective
                </h3>
                <p className="text-[#5a3e36] text-sm">
                  Preparing students for success in an interconnected world
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#8b1a1a] text-white rounded-full hover:bg-[#7a1717] transition-colors duration-300 shadow-lg"
            >
              <span>Discover More</span>
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
