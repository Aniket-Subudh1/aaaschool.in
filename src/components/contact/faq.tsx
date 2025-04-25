"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import NavBar from "../ui/nav-bar";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What are the school's admission requirements?",
      answer:
        "Admission requirements vary by grade level. Generally, we require previous academic records, an entrance assessment, and an interview. For detailed information specific to your child's grade level, please contact our admissions office.",
    },
    {
      question: "What is the fee structure for the current academic year?",
      answer:
        "Our fee structure includes tuition fees, development fees, and other charges that vary by grade level. We offer various payment plans to accommodate different family needs. Please contact our administrative office for the current fee structure document.",
    },
    {
      question: "Does the school provide transportation services?",
      answer:
        "Yes, we provide transportation services covering major areas around Khorda. Bus routes are designed for maximum convenience while ensuring safety. Transportation fees vary based on distance from the school.",
    },
    {
      question: "What extracurricular activities are offered?",
      answer:
        "We offer a wide range of extracurricular activities including sports (cricket, basketball, volleyball), performing arts (music, dance, drama), visual arts, robotics, coding, debate, and various clubs. These activities are designed to develop students' talents, interests, and social skills beyond the academic curriculum.",
    },
    {
      question: "How can I schedule a campus visit?",
      answer:
        "Campus visits can be scheduled by contacting our administrative office via phone or email. We offer guided tours on weekdays between 9:00 AM and 2:00 PM. We recommend scheduling your visit at least 3-4 days in advance to ensure proper arrangements.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main>
      <NavBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-center mb-6 mt-20">
          <HelpCircle className="w-6 h-6 text-[#8b1a1a] mr-2" />
          <h2 className="text-2xl font-bold text-[#8b1a1a]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#f8f3e9] transition-colors"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#8b1a1a]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#8b1a1a]" />
                  )}
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-[#f8f3e9]/50"
                    >
                      <div className="px-6 py-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
