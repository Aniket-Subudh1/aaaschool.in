"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronRight, ChevronLeft } from "lucide-react";

const announcements = [
  "Admission for the new academic year 2023-24 is now open",
  "Annual Sports Day will be held on December 15th",
  "Parent-Teacher Meeting scheduled for next Friday",
  "Congratulations to our students for excellent board exam results",
  "Cultural festival 'Kala Utsav' starts next month",
];

export default function AnnouncementsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + announcements.length) % announcements.length
    );
  };

  return (
    <div className="bg-[#8b1a1a]/5 border border-[#d4b483]/30 rounded-lg p-3 flex items-center">
      <div className="flex items-center bg-[#8b1a1a] text-[#f8f3e9] p-2 rounded-md mr-3">
        <Bell className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">ANNOUNCEMENTS</span>
      </div>

      <div className="flex-1 overflow-hidden relative h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center"
          >
            <p className="text-sm text-[#5a3e36] truncate">
              {announcements[currentIndex]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center space-x-1 ml-3">
        <button
          onClick={prev}
          className="p-1 rounded-full hover:bg-[#d4b483]/20 text-[#8b1a1a]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full hover:bg-[#d4b483]/20 text-[#8b1a1a]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
