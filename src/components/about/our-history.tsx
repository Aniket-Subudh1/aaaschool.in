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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);

  return (
    <div id="history" className="relative py-24 bg-[#f8f3e9] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-bg.png')] bg-repeat opacity-5"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#d4b483]/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#8b1a1a]/5 blur-3xl"></div>

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
            OUR HISTORY
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
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
            Founded in 1995, our journey of educational excellence continues
            with a commitment to holistic development
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div style={{ scale, rotate }} className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/5 rounded-2xl -translate-x-6 translate-y-6"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl border border-[#d4b483]/30">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iSWbKkRwpGYsLu6NR3yDrJaaNoGFlJ.png"
                  alt="School students and building"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                />

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-[#f0c808]/20 rounded-br-3xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-[#8b1a1a]/20 rounded-tl-3xl"></div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-8 -right-8 bg-[#8b1a1a] text-white px-6 py-3 rounded-full shadow-lg transform rotate-3"
              >
                <span className="font-bold">Since 1995</span>
              </motion.div>
            </motion.div>

            <motion.div style={{ y }} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#8b1a1a]"
              >
                <p className="text-[#5a3e36] leading-relaxed">
                  Located away from busy streets in the city, surrounded by lush
                  greenery AAA is cited in the lap of beauty of nature. AAA was
                  originally founded in 1995. AAA, a school of future, embraces
                  a holistic educational philosophy that celebrates
                  experimental, expressions, accessibility and discovering the
                  talents of the children.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#d4b483]"
              >
                <p className="text-[#5a3e36] leading-relaxed">
                  AAA is a path to innovative education with a blend of modern
                  and ancient pedagogy. We design our curriculum to make
                  today&apos;s child future ready, deeply connected to their
                  roots, values and cultures.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-[#8b1a1a]/5 p-8 rounded-2xl shadow-lg"
              >
                <p className="text-[#5a3e36] leading-relaxed font-medium italic">
                  &ldquo;The ethos of the school reflects the rich legacy of our
                  culture and helps to nurture to be a responsible
                  citizen.&rdquo;
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex justify-center md:justify-start"
              >
                <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md border border-[#d4b483]/30">
                  <div className="w-10 h-10 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-aaa-CpIW78OZFZG6FBpF9os3cxpWu7bmcN.png"
                      alt="Aryavart Ancient Academy Logo"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div>
                    <span className="text-[#8b1a1a] font-bold">35 acres</span>
                    <span className="text-[#5a3e36] ml-2">Green Campus</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
