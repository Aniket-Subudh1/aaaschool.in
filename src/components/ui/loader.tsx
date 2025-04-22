"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles } from 'lucide-react';

export const Loader = () => {
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState(0);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 - prev) * 0.1;
        return newProgress > 99 ? 100 : newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  // Create particle effect
  useEffect(() => {
    if (!particlesRef.current || !isClient) return;
    
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-[#f0c808]/30";
      
      // Random size between 4px and 10px
      const size = Math.random() * 6 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Animation
      particle.animate(
        [
          { opacity: 0, transform: "translateY(0) scale(0.5)" },
          { opacity: 0.8, transform: "translateY(-20px) scale(1)" },
          { opacity: 0, transform: "translateY(-40px) scale(0.5)" }
        ],
        {
          duration: 1500 + Math.random() * 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)"
        }
      );
      
      particlesRef.current?.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 2500);
    };
    
    const interval = setInterval(createParticle, 200);
    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) return null;

  const letters = "AAA".split("");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#5a3e36] to-[#483028] z-50 overflow-hidden"
      >
        {/* Particles container */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#3a2820]/70" />
        
        <div className="relative flex flex-col items-center justify-center space-y-6 px-4">
          {/* Logo with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 relative"
          >
            <div className="w-28 h-28 relative flex items-center justify-center">
              {/* Multiple pulsing rings */}
              {[1, 1.15, 1.3].map((scale, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full bg-[#f0c808]/20"
                  animate={{
                    scale: [scale, scale + 0.2, scale],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
              
              {/* Rotating glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f0c808]/30 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              <Image
                src="/aaa.png"
                alt="AAA Logo"
                width={112}
                height={112}
                className="w-full h-full relative z-10 drop-shadow-lg"
              />
              
              {/* Sparkle effect */}
              <motion.div
                className="absolute -right-2 -top-2 text-[#f0c808]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles size={16} />
              </motion.div>
            </div>
          </motion.div>

          {/* Text with enhanced letter animation */}
          <div className="text-2xl md:text-4xl font-bold text-transparent relative">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  y: index % 2 === 0 ? -20 : 20,
                  rotateY: 90,
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateY: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut",
                }}
                className={`inline-block ${
                  letter === " " ? "mr-2" : ""
                } text-[#f0c808] drop-shadow-md`}
              >
                {letter}
              </motion.span>
            ))}
            
            {/* Text shadow/glow effect */}
            <motion.div
              className="absolute inset-0 blur-md text-[#f0c808]/30 flex"
              aria-hidden="true"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {letters.map((letter, index) => (
                <span key={index} className="inline-block">
                  {letter}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Enhanced progress loader */}
          <div className="relative mt-8 w-60 md:w-72">
            <div className="h-1.5 bg-[#3a2820] rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#f0c808]/70 via-[#f0c808] to-[#f0c808]/70 rounded-full"
              >
                <motion.div
                  animate={{
                    x: ["-100%", "200%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/2 bg-white/80 rounded-full blur-[2px]"
                />
              </motion.div>
            </div>
            
            {/* Percentage indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-8 -top-6 text-xs text-[#f0c808]/80"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Enhanced subtitle with typewriter effect */}
          <div className="text-white/90 mt-2 font-serif tracking-wider text-lg relative overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="flex items-center"
            >
              <motion.span 
                className="font-light"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Exploring
              </motion.span>{" "}
              <motion.span 
                className="font-medium mx-1"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                Our Journey
              </motion.span>
              
              {/* Animated dots */}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop" }}
                className="inline-flex"
              >
                <span className="mx-0.5">.</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                >
                  .
                </motion.span>
              </motion.span>
            </motion.p>
            
            {/* Subtle line decoration */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-[#f0c808]/40 to-transparent mt-2"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;
