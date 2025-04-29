"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Brain,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface SchoolLevel {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  image: string;
}

export default function SchoolLevels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const levels: SchoolLevel[] = [
    {
      id: "pratham",
      title: "Pratham Sopan",
      subtitle: "Elementary School",
      icon: <BookOpen className="h-6 w-6" />,
      color: "#8b1a1a",
      description:
        "Covering Nursery to K.G. II, the elementary school adopts an informal approach towards learning. Children here are encouraged to explore their environment while also being taught basic concepts in language, mathematics, computers, art and craft, dance and music.",
      image: "/ps.jfif",
    },
    {
      id: "dwitiya",
      title: "Dwitiya Sopan",
      subtitle: "Junior School",
      icon: <Users className="h-6 w-6" />,
      color: "#a52a2a",
      description:
        "Spanning classes I - V, the junior school is the child's introduction to full day school. This stage of school aims to build on the child's growing spirit of discovery and exploration. Emphasis is placed on the acquisition of sound language skills, mathematical concepts and scientific fundamentals.",
      image: "/dw.jpeg",
    },
    {
      id: "tritya",
      title: "Tritya Sopan",
      subtitle: "Middle School",
      icon: <Brain className="h-6 w-6" />,
      color: "#b33939",
      description:
        "Comprising classes VI to VIII, this stage sees the introduction of a third language, Sanskrit, as well the detailing of history, geography, physics, chemistry and biology as separate subjects and all the excitement of their first examination.",
      image: "/tr.jpg",
    },
    {
      id: "chaturtha",
      title: "Chaturtha Sopan",
      subtitle: "Secondary School",
      icon: <GraduationCap className="h-6 w-6" />,
      color: "#c0392b",
      description:
        "Comprising classes IX to XII, the senior school is where early life's lessons are put to test. Rigorous practice and study techniques with special emphasis on analysis and conceptualization are woven into the curriculum, as students prepare to appear for their board examinations.",
      image: "/lb.jpg",
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === levels.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? levels.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 relative overflow-hidden bg-[#f0e6d2]">
      {/* Temple-inspired decorative elements */}
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

      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
            Our School Levels
          </h2>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            Our educational journey is divided into four progressive levels,
            each designed to nurture different aspects of a child&apos;s
            development.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="flex justify-between absolute top-1/2 left-0 right-0 z-10 transform -translate-y-1/2 px-4">
            <button
              onClick={prevSlide}
              className="bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: -activeIndex * containerWidth }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: `${levels.length * 100}%` }}
            >
              {levels.map((level) => (
                <div
                  key={level.id}
                  className="relative"
                  style={{ width: `${100 / levels.length}%` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4">
                    <div className="order-2 md:order-1">
                      <div className="flex items-center mb-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                          style={{ backgroundColor: `${level.color}20` }}
                        >
                          <div className="text-[#8b1a1a]">{level.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#8b1a1a] font-serif">
                            {level.title}
                          </h3>
                          <p className="text-[#5a3e36]">{level.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-[#5a3e36] mb-6">{level.description}</p>
                      <a
                        href="#academic-programs"
                        className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 transition-colors"
                      >
                        Learn More <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                    <div className="order-1 md:order-2 relative">
                      <div className="absolute inset-0 bg-[#8b1a1a]/5 rounded-2xl -translate-x-4 translate-y-4"></div>
                      <div className="relative bg-white p-4 rounded-2xl shadow-lg border border-[#d4b483]/30 h-96 w-full">
                        <div className="relative w-full h-full">
                          <Image
                            src={level.image || "/placeholder.svg"}
                            alt={level.title}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-lg border border-[#d4b483]/30">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${level.color}20` }}
                          >
                            <div className="text-[#8b1a1a]">{level.icon}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {levels.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-[#8b1a1a]" : "bg-[#8b1a1a]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
