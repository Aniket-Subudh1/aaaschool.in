"use client";

import { useCallback, useEffect, useRef, useState, memo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

// Optimized slide component to prevent unnecessary re-renders
const Slide = memo(
  ({
    image,
    index,
    isActive,
    position,
  }: {
    image: SliderImage;
    index: number;
    isActive: boolean;
    position: "center" | "left" | "right";
  }) => {
    // Calculate styling based on position
    const getPositionStyles = () => {
      if (position === "center") {
        return "z-20 scale-100 opacity-100";
      } else if (position === "left" || position === "right") {
        return "z-10 scale-90 opacity-70 hover:opacity-80";
      }
      return "";
    };

    return (
      <div
        className={`transition-all duration-300 ease-in-out ${getPositionStyles()}`}
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#d4b483]/20 h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative h-48 md:h-56 lg:h-64">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={isActive}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8b1a1a]/70 to-transparent opacity-60"></div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">
              {image.title}
            </h3>
            <p className="text-sm text-[#5a3e36]">{image.description}</p>
          </div>
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-[#8b1a1a] w-8 h-8 rounded-full flex items-center justify-center font-bold">
            {index + 1}
          </div>
        </div>
      </div>
    );
  }
);

Slide.displayName = "Slide";
const NavButton = memo(
  ({
    direction,
    onClick,
  }: {
    direction: "left" | "right";
    onClick: () => void;
  }) => {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;

    return (
      <button
        onClick={onClick}
        className="bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors transform active:scale-95"
        aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
      >
        <Icon className="h-6 w-6" />
      </button>
    );
  }
);

NavButton.displayName = "NavButton";

// Indicator dot component
const IndicatorDot = memo(
  ({
    index,
    currentIndex,
    onClick,
  }: {
    index: number;
    currentIndex: number;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`h-3 rounded-full transition-all duration-300 ${
        index === currentIndex ? "bg-[#8b1a1a] w-6" : "bg-[#8b1a1a]/30 w-3"
      }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  )
);

IndicatorDot.displayName = "IndicatorDot";

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sample images - replace with actual school images
  const images: SliderImage[] = [
    {
      src: "https://aaaschool.s3.ap-south-1.amazonaws.com/sc.jpg",
      alt: "School campus",
      title: "Our Beautiful Campus",
      description:
        "35 acres of lush green environment designed for holistic learning",
    },
    {
      src: "https://aaaschool.s3.ap-south-1.amazonaws.com/il.jpg",
      alt: "Students in classroom",
      title: "Interactive Learning",
      description:
        "Modern classrooms equipped with smart technology for enhanced learning",
    },
    {
      src: "https://aaaschool.s3.ap-south-1.amazonaws.com/dr.jpg",
      alt: "School activities",
      title: "Extracurricular Excellence",
      description:
        "A wide range of activities to nurture talents beyond academics",
    },
    {
      src: "https://aaaschool.s3.ap-south-1.amazonaws.com/sp.jpg",
      alt: "Sports day",
      title: "Sports & Athletics",
      description:
        "State-of-the-art facilities for physical development and sportsmanship",
    },
    {
      src: "https://aaaschool.s3.ap-south-1.amazonaws.com/cul.jpg",
      alt: "Cultural event",
      title: "Cultural Celebrations",
      description:
        "Preserving traditions while embracing diversity through cultural events",
    },
  ];

  // Reset autoplay timer
  const resetAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }

    if (autoplay) {
      autoplayTimerRef.current = setTimeout(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setTimeout(() => setIsTransitioning(false), 300);
        }
      }, 5000);
    }
  }, [autoplay, images.length, isTransitioning]);

  // Handle slide navigation
  const goToSlide = useCallback(
    (index: number) => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex(index);
        setAutoplay(false);

        // Re-enable autoplay after user interaction
        setTimeout(() => {
          setIsTransitioning(false);
          setAutoplay(true);
        }, 300);
      }
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, goToSlide, images.length]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, goToSlide, images.length]);

  // Setup autoplay
  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentIndex, autoplay, resetAutoplayTimer]);

  // Calculate visible indices for the three-card view
  const getPositionForIndex = useCallback(
    (index: number): "left" | "center" | "right" | null => {
      if (index === currentIndex) return "center";
      if (index === (currentIndex - 1 + images.length) % images.length)
        return "left";
      if (index === (currentIndex + 1) % images.length) return "right";
      return null;
    },
    [currentIndex, images.length]
  );

  return (
    <section className="py-8 md:py-12 bg-[#f8f3e9] relative overflow-hidden">
      {/* Temple-inspired decorative top border */}
      <div className="absolute top-0 left-0 w-full h-6 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`top-${i}`}
              className="w-6 h-6 bg-[#8b1a1a]/10 mx-0.5 rounded-b-lg"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 md:pt-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#8b1a1a] mb-3 font-serif">
            Campus Highlights
          </h2>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            Explore our vibrant campus life through these glimpses of our
            facilities, activities, and events.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
            <NavButton direction="left" onClick={prevSlide} />
          </div>

          <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2">
            <NavButton direction="right" onClick={nextSlide} />
          </div>

          {/* Desktop view (3 cards) */}
          <div className="hidden md:block overflow-hidden py-4 md:py-6">
            <div className="grid grid-cols-3 gap-4 md:gap-6 w-full">
              {/* Showing just 3 cards at a time */}
              {images.map((image, index) => {
                const position = getPositionForIndex(index);
                if (!position) return null;

                return (
                  <Slide
                    key={`desktop-${index}`}
                    image={image}
                    index={index}
                    isActive={position === "center"}
                    position={position}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile view (single card) */}
          <div className="md:hidden w-full flex justify-center py-4">
            <div className="w-full max-w-sm">
              <Slide
                image={images[currentIndex]}
                index={currentIndex}
                isActive={true}
                position="center"
              />
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <IndicatorDot
                key={index}
                index={index}
                currentIndex={currentIndex}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
