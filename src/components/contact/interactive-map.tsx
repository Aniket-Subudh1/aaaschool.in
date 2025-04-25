"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Maximize2, Minimize2 } from "lucide-react";

export default function InteractiveMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!mapContainerRef.current) return;

    if (!isFullscreen) {
      if (mapContainerRef.current.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#8b1a1a]">Find Us</h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
            className="flex items-center px-3 py-1 bg-[#8b1a1a] text-white rounded-lg text-sm"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 mr-1" />
            ) : (
              <Maximize2 className="w-4 h-4 mr-1" />
            )}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://maps.google.com/?q=Aryavart+Ancient+Academy+Khorda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1 bg-[#f0e6d2] text-[#8b1a1a] rounded-lg text-sm"
          >
            <Navigation className="w-4 h-4 mr-1" />
            Get Directions
          </motion.a>
        </div>
      </div>

      <div
        ref={mapContainerRef}
        className="relative bg-[#f0e6d2] rounded-2xl overflow-hidden h-[400px] shadow-xl"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f8f3e9]">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-[#8b1a1a] border-[#f0e6d2] rounded-full animate-spin mb-4"></div>
              <p className="text-[#8b1a1a]">Loading map...</p>
            </div>
          </div>
        )}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14980.362792280448!2d85.5823066!3d20.1719488!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x22407c4dbf0b1549!2sAryavart%20Ancient%20Academy%20Haladipada!5e0!3m2!1sen!2sin!4v1671109703941!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
        ></iframe>

        {/* Map pin animation */}
        {isLoaded && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              delay: 0.5,
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
          >
            <div className="relative bottom-8 right-14">
              <MapPin className="h-10 w-10 text-[#8b1a1a]" />
              <motion.div
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#8b1a1a] rounded-full"
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
