"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, ChevronRight, ChevronLeft } from "lucide-react";

const SimpleAnnouncementsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAnnouncements();
    }
  }, [isOpen]);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/announcements?active=true");
      if (!res.ok) throw new Error("Failed to fetch announcements");

      const data = await res.json();
      if (data && data.length > 0) {
        setAnnouncements(data);
      } else {
        setAnnouncements([
          {
            title: "🎓 Admission for the new academic year 2025-26 is now open",
            date: "2025-06-01",
            createdAt: new Date(),
          },
          {
            title: "👥 Parent-Teacher Meeting scheduled for next Friday",
            date: "2025-06-15",
            createdAt: new Date(),
          },
          {
            title: "🏆 Congratulations to our students for excellent board exam results",
            date: "2025-06-10",
            createdAt: new Date(),
          },
          {
            title: "📚 New library books have arrived - Check out the latest collection",
            date: "2025-06-12",
            createdAt: new Date(),
          },
          {
            title: "🎨 Annual Art Exhibition will be held on March 15th",
            date: "2025-07-15",
            createdAt: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements");
      setAnnouncements([
        {
          title: "🎓 Admission for the new academic year 2025-26 is now open",
          date: "2025-06-01",
          createdAt: new Date(),
        },
        {
          title: "👥 Parent-Teacher Meeting scheduled for next Friday",
          date: "2025-06-15",
          createdAt: new Date(),
        },
        {
          title: "🏆 Congratulations to our students for excellent board exam results",
          date: "2025-06-10",
          createdAt: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white p-6 flex justify-between items-center">
          <div className="flex items-center">
            <Bell className="h-6 w-6 mr-3" />
            <h2 className="text-xl font-bold">All Announcements</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : announcements.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No announcements at the moment
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div
                  key={announcement._id || index}
                  className="bg-[#f8f3e9] p-4 rounded-lg border border-[#d4b483]/30 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-4 flex-shrink-0">
                      <Bell className="h-5 w-5 text-[#8b1a1a]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-[#8b1a1a] mb-1">
                        {announcement.title}
                      </h3>
                      {announcement.date && (
                        <div className="flex items-center text-sm text-[#5a3e36] mb-2">
                          <span className="mr-2">📅</span>
                          {new Date(announcement.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      )}
                      <p className="text-sm text-[#5a3e36] opacity-70">
                        Posted on{" "}
                        {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function AnnouncementsTicker() {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasRealData, setHasRealData] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (!autoplay || announcements.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoplay, announcements.length, isPaused]);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/announcements?active=true");
      if (!res.ok) throw new Error("Failed to fetch announcements");

      const data = await res.json();

      if (data && data.length > 0) {
        const announcementTitles = data.map((item: any) => item.title);
        setAnnouncements(announcementTitles);
        setHasRealData(true);
      } else {
        setAnnouncements([
          "🎓 Admission for the new academic year 2025-26 is now open - Apply today!",
          "👥 Parent-Teacher Meeting scheduled for next Friday at 2:00 PM",
          "🏆 Congratulations to our students for excellent board exam results - 98% pass rate!",
          "📚 New library books have arrived - Check out the latest collection",
          "🎨 Annual Art Exhibition will be held on March 15th - Submit your entries now",
        ]);
        setHasRealData(false);
      }
    } catch (err) {
      console.error("Error fetching announcements:", err);
      setError("Failed to load announcements");

      setAnnouncements([
        "🎓 Admission for the new academic year 2025-26 is now open - Apply today!",
        "👥 Parent-Teacher Meeting scheduled for next Friday at 2:00 PM",
        "🏆 Congratulations to our students for excellent board exam results - 98% pass rate!",
        "📚 New library books have arrived - Check out the latest collection",
        "🎨 Annual Art Exhibition will be held on March 15th - Submit your entries now",
      ]);
      setHasRealData(false);
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 2000);
  };

  const prev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + announcements.length) % announcements.length
    );
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 3000);
  };

  const handleAnnouncementClick = () => {
    console.log("Opening modal...");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal...");
    setIsModalOpen(false);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
  };

  if (announcements.length === 0 && !isLoading) {
    return null;
  }

  return (
    <>
      <div 
        className="bg-gradient-to-r from-[#8b1a1a]/10 via-[#8b1a1a]/5 to-[#8b1a1a]/10 border-2 border-[#d4b483]/40 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center">
          {/* Bell Icon Section */}
          <div className="flex items-center bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-[#f8f3e9] px-4 py-3 rounded-lg mr-4 shadow-md">
            <Bell className="h-6 w-6 mr-2 animate-pulse" />
            <span className="text-sm font-bold tracking-wide">ANNOUNCEMENTS</span>
          </div>

          {/* Announcement Display */}
          <div className="flex-1 overflow-hidden relative h-12 bg-white/50 rounded-lg border border-[#d4b483]/20">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center px-4">
                <div className="animate-pulse bg-gray-300 h-6 w-4/5 rounded"></div>
              </div>
            ) : (
              <div className="relative h-full w-full overflow-hidden">
                <motion.div
                  key={currentIndex}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 flex items-center px-4 cursor-pointer hover:bg-[#d4b483]/10 transition-colors duration-200"
                  onClick={handleAnnouncementClick}
                >
                  <p className="text-base font-medium text-[#5a3e36] hover:text-[#8b1a1a] transition-colors duration-200 truncate">
                    {announcements[currentIndex]}
                  </p>
                </motion.div>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={prev}
              className="p-2 rounded-full hover:bg-[#d4b483]/30 text-[#8b1a1a] transition-colors duration-200 shadow-sm hover:shadow-md"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {/* Play/Pause Button */}
            <button
              onClick={toggleAutoplay}
              className="p-2 rounded-full hover:bg-[#d4b483]/30 text-[#8b1a1a] transition-colors duration-200 shadow-sm hover:shadow-md"
              aria-label={autoplay ? "Pause" : "Play"}
            >
              {autoplay && !isPaused ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1 h-3 bg-current"></div>
                    <div className="w-1 h-3 bg-current"></div>
                  </div>
                </div>
              ) : (
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-current border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                </div>
              )}
            </button>

            <button
              onClick={next}
              className="p-2 rounded-full hover:bg-[#d4b483]/30 text-[#8b1a1a] transition-colors duration-200 shadow-sm hover:shadow-md"
              aria-label="Next announcement"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* View All Button */}
          <div className="ml-4">
            <button
              onClick={handleAnnouncementClick}
              className="bg-[#8b1a1a] hover:bg-[#a52a2a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              View All
            </button>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-3 space-x-1">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoplay(false);
                setTimeout(() => setAutoplay(true), 5000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#8b1a1a] w-6' 
                  : 'bg-[#d4b483]/40 hover:bg-[#d4b483]/60'
              }`}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center mt-2 items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            autoplay && !isPaused ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
          }`}></div>
          <span className="text-xs text-[#5a3e36]">
            {autoplay && !isPaused ? 'Auto-playing' : 'Paused'} • {announcements.length} announcements
            {!hasRealData && <span className="text-[#8b1a1a]"> (Demo)</span>}
          </span>
        </div>
      </div>

      {/* Modal Component */}
      <SimpleAnnouncementsModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
}