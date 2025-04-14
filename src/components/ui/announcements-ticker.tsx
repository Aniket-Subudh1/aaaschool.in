"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronRight, ChevronLeft } from "lucide-react";

export default function AnnouncementsTicker() {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (!autoplay || announcements.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, announcements.length]);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch('/api/announcements?active=true');
      if (!res.ok) throw new Error('Failed to fetch announcements');
      
      const data = await res.json();
      
      // Extract titles from announcements
      if (data && data.length > 0) {
        const announcementTitles = data.map((item: any) => item.title);
        setAnnouncements(announcementTitles);
      } else {
        // Fallback announcements if none are available
        setAnnouncements([
          "Admission for the new academic year 2025-26 is now open",
          "Parent-Teacher Meeting scheduled for next Friday",
          "Congratulations to our students for excellent board exam results",
        ]);
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError('Failed to load announcements');
      
      // Fallback announcements if fetch fails
      setAnnouncements([
        "Admission for the new academic year 2025-26 is now open",
        "Parent-Teacher Meeting scheduled for next Friday",
        "Congratulations to our students for excellent board exam results",
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const prev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + announcements.length) % announcements.length
    );
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  if (announcements.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="bg-[#8b1a1a]/5 border border-[#d4b483]/30 rounded-lg p-3 flex items-center">
      <div className="flex items-center bg-[#8b1a1a] text-[#f8f3e9] p-2 rounded-md mr-3">
        <Bell className="h-4 w-4 mr-1" />
        <span className="text-xs font-medium">ANNOUNCEMENTS</span>
      </div>

      <div className="flex-1 overflow-hidden relative h-6">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center">
            <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded"></div>
          </div>
        ) : (
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
        )}
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