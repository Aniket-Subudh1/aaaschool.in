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
    name: "Ankita Lenka",
    stream: "SCIENCE",
    class: "12th Class",
    image:
      "https://aaaschool.s3.ap-south-1.amazonaws.com/Screenshot+2025-05-22+021544.png",
    text: "AAA has truly become a second home. The educators and peers are consistently supportive, and I have always felt a strong sense of inclusion and belonging.",
  },
  {
    id: "payal",
    name: "Asha Kiran",
    stream: "COMMERCE",
    class: "12th Class",
    image:
      "https://aaaschool.s3.ap-south-1.amazonaws.com/Screenshot+2025-05-22+021658.png",
    text: "The faculty members are approachable and genuinely committed to students’ growth. AAA offers an environment that fosters both academic and personal development.",
  },
  {
    id: "sahana",
    name: "Abhigyan Sahoo",
    stream: "SCIENCE",
    class: "12th Class",
    image:
      "https://aaaschool.s3.ap-south-1.amazonaws.com/Screenshot+2025-05-22+022428.png",
    text: "In a short span of two months, AAA has contributed significantly to my development. It provides an excellent platform for learning and self-improvement.",
  },
  {
    id: "atulya",
    name: "Rounak Prasad",
    stream: "SCIENCE",
    class: "12th Class",
    image:
      "https://aaaschool.s3.ap-south-1.amazonaws.com/Screenshot+2025-05-22+022525.png",
    text: "From the very first day, I experienced a warm and welcoming environment. The faculty is attentive and the overall atmosphere is highly motivating.",
  },
  {
    id: "sagun",
    name: "Arati Paikaray",
    stream: "SCIENCE",
    class: "12th Class",
    image:
      "https://aaaschool.s3.ap-south-1.amazonaws.com/Screenshot+2025-05-22+022614.png",
    text: "AAA has enabled me to identify and develop my potential in both academics and extracurriculars. It has been a fulfilling and enriching experience.",
  },
  {
    id: "deepika",
    name: "Pratikshya Nanda Tripathy",
    stream: "SCIENCE",
    class: "12th Class",
    image:
      "https://aaaschool.s3.ap-south-1.amazonaws.com/Screenshot+2025-05-22+022710.png",
    text: "Being a part of AAA has been truly rewarding. The institution fosters a culture of respect, excellence, and holistic growth for every student.",
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
