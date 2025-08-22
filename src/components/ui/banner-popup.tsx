"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  order: number;
}

interface BannerPopupProps {
  banners: Banner[];
  onClose: () => void;
}

export default function BannerPopup({ banners, onClose }: BannerPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [imageDimensions, setImageDimensions] = useState<{[key: string]: {width: number, height: number}}>({});

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleBannerClick = () => {
    const currentBanner = banners[currentIndex];
    if (currentBanner.linkUrl) {
      window.open(currentBanner.linkUrl, '_blank');
    }
  };

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Load image dimensions for all banners
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: {[key: string]: {width: number, height: number}} = {};
      
      for (const banner of banners) {
        try {
          const img = new window.Image();
          await new Promise((resolve, reject) => {
            img.onload = () => {
              dimensions[banner._id] = {
                width: img.naturalWidth,
                height: img.naturalHeight
              };
              resolve(null);
            };
            img.onerror = reject;
            img.src = banner.imageUrl;
          });
        } catch (error) {
          console.error(`Failed to load image dimensions for banner ${banner._id}:`, error);
          // Fallback dimensions
          dimensions[banner._id] = { width: 1200, height: 600 };
        }
      }
      
      setImageDimensions(dimensions);
    };

    if (banners.length > 0) {
      loadImageDimensions();
    }
  }, [banners]);

  // Auto-advance for multiple banners
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      nextBanner();
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];
  const currentDimensions = imageDimensions[currentBanner._id];

  // Calculate responsive dimensions while maintaining aspect ratio
  const getResponsiveDimensions = () => {
    if (!currentDimensions) {
      return { width: '100%', height: 'auto', maxWidth: '90vw', maxHeight: '90vh' };
    }

    const { width: naturalWidth, height: naturalHeight } = currentDimensions;
    const aspectRatio = naturalWidth / naturalHeight;
    
    // Get viewport dimensions
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // Maximum dimensions (90% of viewport)
    const maxWidth = Math.min(viewportWidth * 0.9, 1400); // Cap at 1400px
    const maxHeight = Math.min(viewportHeight * 0.9, 900); // Cap at 900px
    
    // Calculate dimensions maintaining aspect ratio
    let finalWidth = Math.min(naturalWidth, maxWidth);
    let finalHeight = finalWidth / aspectRatio;
    
    // If height exceeds max height, recalculate based on height
    if (finalHeight > maxHeight) {
      finalHeight = maxHeight;
      finalWidth = finalHeight * aspectRatio;
    }
    
    return {
      width: finalWidth,
      height: finalHeight,
      maxWidth: 'none',
      maxHeight: 'none'
    };
  };

  const responsiveDimensions = getResponsiveDimensions();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        >
          {/* Backdrop - clicking it closes the popup */}
          <div 
            className="absolute inset-0" 
            onClick={handleClose}
            aria-label="Close banner"
          />
          
          {/* Banner Container with dynamic dimensions */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: responsiveDimensions.width,
              height: responsiveDimensions.height,
              maxWidth: responsiveDimensions.maxWidth,
              maxHeight: responsiveDimensions.maxHeight,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking banner
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors rounded-full p-2 shadow-lg"
              aria-label="Close banner"
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows for Multiple Banners */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={prevBanner}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors rounded-full p-2 shadow-lg"
                  aria-label="Previous banner"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextBanner}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors rounded-full p-2 shadow-lg"
                  aria-label="Next banner"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Banner Content */}
            <div 
              className={`relative w-full h-full ${currentBanner.linkUrl ? 'cursor-pointer' : ''}`}
              onClick={currentBanner.linkUrl ? handleBannerClick : undefined}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentBanner.imageUrl}
                    alt={currentBanner.title}
                    fill
                    className="object-contain" // Changed from object-cover to object-contain
                    sizes="90vw"
                    priority
                  />
                  
                  {/* Gradient Overlay for Title - only if there's a title */}
                  {currentBanner.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  )}
                  
                  {/* Banner Title */}
                  {currentBanner.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                      <AnimatePresence mode="wait">
                        <motion.h2
                          key={currentIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4 }}
                          className="text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                        >
                          {currentBanner.title}
                        </motion.h2>
                      </AnimatePresence>
                      
                      {currentBanner.linkUrl && (
                        <p className="text-sm md:text-base opacity-90">
                          Click to learn more →
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots for Multiple Banners */}
            {banners.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex space-x-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to banner ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Banner Counter for Multiple Banners */}
            {banners.length > 1 && (
              <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {banners.length}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}