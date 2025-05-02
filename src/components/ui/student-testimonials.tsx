"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Star, Quote, Sparkles } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      className="relative min-w-[280px] sm:min-w-[320px] md:min-w-[350px] max-w-[350px] mx-4 h-full cursor-pointer overflow-hidden rounded-xl border border-[#d4b483]/30 bg-white shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#f0c808] via-[#8b1a1a] to-[#f0c808]"></div>

      <div className="absolute top-4 right-4 text-[#f0c808]/20 transform rotate-12">
        <Quote className="h-8 w-8" />
      </div>

      <div className="flex flex-row items-center gap-3 m-4">
        <div className="relative w-14 h-14 rounded-full border-2 border-[#8b1a1a]/20 overflow-hidden">
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-[#8b1a1a]">
            {testimonial.name}
          </h3>
          <div className="flex items-center text-xs text-[#5a3e36]/80">
            {testimonial.stream && <span>{testimonial.stream}</span>}
            {testimonial.stream && testimonial.class && (
              <span className="mx-1">•</span>
            )}
            {testimonial.class && <span>{testimonial.class}</span>}
          </div>
        </div>
      </div>

      <div className="flex justify-start mx-4 mb-3 space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="h-3 w-3 text-[#f0c808] fill-[#f0c808]" />
        ))}
      </div>

      <div className="relative mx-4 mb-4">
        <div className="absolute -left-1 -top-1 text-[#8b1a1a]/10 transform -scale-y-100">
          <Quote className="h-4 w-4" />
        </div>
        <p className="text-[#5a3e36] text-xs leading-relaxed line-clamp-5 mb-3">
          {testimonial.text}
        </p>
        <div className="absolute -right-1 -bottom-1 text-[#8b1a1a]/10">
          <Quote className="h-4 w-4" />
        </div>
      </div>

      <div className="absolute bottom-2 left-2">
        <Sparkles className="h-3 w-3 text-[#f0c808]/60" />
      </div>
    </motion.div>
  );
};

export default function StudentTestimonials() {
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [isHoveringBottom, setIsHoveringBottom] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // All testimonials data
  const testimonials = [
    {
      id: "jijnasa",
      name: "JIJNASA PATRA",
      stream: "SCIENCE",
      class: "11th Class",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rRTpPICcipUhMAldjLYJGvugK5G1xE.png",
      text: "AAA illuminates the path to success, instills the fundamental morals of life and molds us into more exemplary individuals. Since my very first day here, never once have I ever felt alienated. This school and it's community have become like a second home to me, a close-knit family that provides a sense of belonging and warmth.",
    },
    {
      id: "payal",
      name: "PAYAL PRADHAN",
      stream: "SCIENCE",
      class: "11th Class",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rRTpPICcipUhMAldjLYJGvugK5G1xE.png",
      text: "AAA stands as a paragon excellence among Educational institutions. I wish to extend my gratitude to the school administration for their unwavering dedication and tireless endeavors. Here, teachers are considerate, understanding, and commendable. It excuses a comforting ambience akin to a second home.",
    },
    {
      id: "sahana",
      name: "SAHANA JAGYONSENI BARIK",
      stream: "SCIENCE",
      class: "11th Class",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1k1Zv8qTH8LfP3W3weVX2Y68X7Psqf.png",
      text: "AAA has profoundly transformed my life. The institution offers an environment conducive to both academic and extracurricular growth. In just 2 months, my experience at AAA has already surpassed my expectations. The school boosts and shapes us in a way to tackle the hurdles.",
    },
    {
      id: "atulya",
      name: "ATULYA BALIARSINGH",
      stream: "",
      class: "11th Class",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u7jUGFj2deXM54s7xcTKjG3JIR6B4C.png",
      text: "Settled in the vibrant community of Khordha, AAA includes a spirit of inclusivity and excellence. For the moment, I stepped through its doors, I felt welcomed and supported by the teachers and the head of the school I.e the Principal too, nurturing each students potential.",
    },
    {
      id: "sagun",
      name: "SAGUN AGARWAL",
      stream: "COMMERCE",
      class: "11th Class",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u7jUGFj2deXM54s7xcTKjG3JIR6B4C.png",
      text: "Aryavart Ancient Academy the place where students poised on the precipice of triumph. My stay at this school heightened the depth of my experiential journey. It enabled me to enhance proficiency not only in academics but also in sports and extra curricular activities, thereby broadening my horizons.",
    },
    {
      id: "deepika",
      name: "DEEPIKA RAJAK",
      stream: "COMMERCE",
      class: "11th Class",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-u7jUGFj2deXM54s7xcTKjG3JIR6B4C.png",
      text: "I am deeply delighted and honored to be a member of AAA. AAA stands for Awesome Adorable, and Affordable. Aryavart has created an environment where students cab uncover and cultivate their innate qualities. Over the past three months, my experience at this institution has been both gratifying and extraordinary.",
    },
  ];

  // Create two different arrangements of testimonials to avoid same order in both rows
  const topRowTestimonials = [...testimonials, ...testimonials];
  const bottomRowTestimonials = [
    ...testimonials.slice(3, 6),
    ...testimonials.slice(0, 3),
    ...testimonials,
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="py-16 relative overflow-hidden bg-gradient-to-b from-[#f8f3e9] via-[#f0e6d2] to-[#f8f3e9]"></div>
    );
  }

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#f8f3e9] via-[#f0e6d2] to-[#f8f3e9]">
      {/* Decorative elements */}
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

      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#f0c808]/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#8b1a1a]/5 blur-3xl"></div>

      <div className="container mx-auto px-4 pt-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
              <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                <GraduationCap className="h-8 w-8 text-[#8b1a1a]" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
            What Our Students Say
          </h2>
          <div className="w-24 h-1 bg-[#d4b483] mx-auto mb-4"></div>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            Hear from our students about their experiences at Aryavart Ancient
            Academy and how our education has transformed their lives.
          </p>
        </div>

        <div className="relative mb-12">
          {/* Top row - left to right */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsHoveringTop(true)}
            onMouseLeave={() => setIsHoveringTop(false)}
          >
            <motion.div
              className="flex"
              initial={{ x: 0 }}
              animate={{
                x: isHoveringTop ? 0 : "-100%",
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                  repeatDelay: 0,
                },
              }}
            >
              {topRowTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`top-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays for top row */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-[#f8f3e9] to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-[#f8f3e9] to-transparent z-10"></div>
        </div>

        <div className="relative">
          {/* Bottom row - right to left */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsHoveringBottom(true)}
            onMouseLeave={() => setIsHoveringBottom(false)}
          >
            <motion.div
              className="flex"
              initial={{ x: "-100%" }}
              animate={{
                x: isHoveringBottom ? "-100%" : "0%",
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                  repeatDelay: 0,
                },
              }}
            >
              {bottomRowTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`bottom-${testimonial.id}-${index}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays for bottom row */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-[#f8f3e9] to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-[#f8f3e9] to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
}
