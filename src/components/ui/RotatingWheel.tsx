"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Smartphone } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

// Custom hook for detecting mobile devices
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkMobile();

    // Add event listener with debounce for better performance
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

type RotatingWheelProps = {
  rotation: number;
  activeTab: string;
  onToggle: () => void;
};

export const RotatingWheel = React.memo(
  ({ rotation, activeTab, onToggle }: RotatingWheelProps) => {
    const isMobile = useIsMobile();

    // Optimize the wheel circle rendering by pre-computing values
    const spokes = React.useMemo(() => {
      return Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * Math.PI) / 12;
        const x1 = 100 + 40 * Math.cos(angle);
        const y1 = 100 + 40 * Math.sin(angle);
        const x2 = 100 + 100 * Math.cos(angle);
        const y2 = 100 + 100 * Math.sin(angle);
        return { x1, y1, x2, y2 };
      });
    }, []);

    // Create a memoized handler for the click event
    const handleClick = useCallback(() => {
      onToggle();
    }, [onToggle]);

    return (
      <div className="relative w-full h-full">
        {/* The wheel component */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 70,
            damping: 15,
          }}
          className="relative w-full aspect-square cursor-pointer"
          onClick={handleClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full filter drop-shadow-lg"
            aria-label={`${activeTab} wheel`}
          >
            <defs>
              <linearGradient
                id="wheelGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b1a1a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#d4b483" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Main circle */}
            <circle cx="100" cy="100" r="100" fill="url(#wheelGradient)" />

            {/* Spoke lines - optimized rendering */}
            {spokes.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#8b1a1a"
                strokeOpacity="0.6"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke" // Prevents stroke scaling for better performance
              />
            ))}

            {/* Concentric circles - simplified for performance */}
            {[80, 60, 40].map((radius, i) => (
              <circle
                key={i}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="#8b1a1a"
                strokeOpacity="0.6"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Center circle */}
            <circle
              cx="100"
              cy="100"
              r="35"
              fill="#f8f3e9"
              stroke="#8b1a1a"
              strokeWidth="1.5"
            />
          </svg>

          {/* Central text that stays upright */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotate(${-rotation}deg)`,
              transition: "transform 0.5s",
            }}
          >
            <div className="text-center">
              <p className="text-[#8b1a1a] font-bold text-sm md:text-base">
                {activeTab.toUpperCase()}
              </p>
              <p className="text-[#8b1a1a] text-xs flex items-center justify-center">
                {isMobile ? (
                  <>
                    <Smartphone size={12} className="mr-1" /> Tap to rotate
                  </>
                ) : (
                  "Click to rotate"
                )}
              </p>
            </div>
          </div>

          {/* Arrow indicators - only show on desktop */}
          {!isMobile && (
            <>
              <motion.div
                animate={{ x: [-3, 3, -3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-[#8b1a1a]"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.div>

              <motion.div
                animate={{ x: [3, -3, 3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-[#8b1a1a]"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    );
  }
);

// Important for React DevTools and debugging
RotatingWheel.displayName = "RotatingWheel";
