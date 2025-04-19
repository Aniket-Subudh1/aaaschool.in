"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BookOpen,
  Clock,
  CheckCircle,
  HeartHandshake,
  Users,
  Shield,
} from "lucide-react";

interface Value {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export default function OurValues() {
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const values: Value[] = [
    {
      id: "integrity",
      title: "Integrity",
      icon: <Shield className="h-6 w-6" />,
      color: "#4C51BF",
      description:
        "Right is Right even if No One is doing it. Wrong is Wrong even if Everyone is doing it. Being on the Right Side, Imbues the power to achieve!",
    },
    {
      id: "open-mindedness",
      title: "Open Mindedness",
      icon: <BookOpen className="h-6 w-6" />,
      color: "#38A169",
      description:
        "Plurality and Diversity are the key nature of Existence. Expecting homogeneity in humanity is a narrow view of life. More open we are in life, more the Opportunities.",
    },
    {
      id: "discipline",
      title: "Discipline",
      icon: <Clock className="h-6 w-6" />,
      color: "#E53E3E",
      description:
        "Just as a tender sapling needs support for growth, young minds need systematic guidance for stability in life. No Strong winds can uproot a deep-Rooted Tree!",
    },
    {
      id: "effectiveness",
      title: "Effectiveness",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "#D69E2E",
      description:
        "The intuitive ability to take a right decision at the right time, to produce the most acceptable result arises from an Honest-Open minded-Empathetic-Creative individual.",
    },
    {
      id: "empathy",
      title: "Empathy",
      icon: <HeartHandshake className="h-6 w-6" />,
      color: "#805AD5",
      description:
        "The most important quality of a successful leader is the ability to Feel what others are Feeling. A Leader's Empathy touches & transforms the multitudes.",
    },
    {
      id: "teamwork",
      title: "Teamwork",
      icon: <Users className="h-6 w-6" />,
      color: "#3182CE",
      description:
        "A team can achieve much more than what an individual can. The world is not a peak that accommodates one winner! It is a plateau that can hold all the winners together!",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 bg-[#f8f3e9] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-pattern.png')] bg-repeat opacity-5"></div>

      {/* Konark wheel inspired decorative element */}
      <div className="absolute -top-20 -right-20 w-40 h-40 opacity-10">
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
              <Shield className="h-8 w-8 text-[#8b1a1a]" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif"
          >
            OUR VALUES
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 bg-[#d4b483] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-[#5a3e36] max-w-3xl mx-auto mb-8"
          >
            Our core values guide everything we do at Aryavart Ancient Academy
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {values.map((value) => (
              <motion.div
                key={value.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all duration-300 overflow-hidden ${
                  activeValue === value.id
                    ? "ring-2 ring-[#8b1a1a] shadow-xl"
                    : ""
                }`}
                onClick={() =>
                  setActiveValue(activeValue === value.id ? null : value.id)
                }
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 text-white"
                    style={{ backgroundColor: value.color }}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">
                    {value.title}
                  </h3>
                </div>

                <AnimatePresence>
                  {activeValue === value.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-[#5a3e36] overflow-hidden"
                    >
                      <div
                        className="w-12 h-1 mb-3"
                        style={{ backgroundColor: value.color }}
                      ></div>
                      <p>{value.description}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-[#5a3e36] line-clamp-2 overflow-hidden"
                    >
                      <p>{value.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Decorative corner */}
                <div
                  className="absolute bottom-0 right-0 w-8 h-8 opacity-10"
                  style={{
                    backgroundColor: value.color,
                    clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
                  }}
                ></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
