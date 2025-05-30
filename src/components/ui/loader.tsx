"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles } from 'lucide-react';

let hasLoadedOnce = false;

export const Loader = () => {
  const [showLoader, setShowLoader] = useState(!hasLoadedOnce);
  const [progress, setProgress] = useState(0);
  const particlesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  

  // Track first mount
  useEffect(() => {
    if (!hasLoadedOnce) {
      hasLoadedOnce = true;
      setShowLoader(true);
    }
  }, []);

  // Detect 404 route (or simulate it based on your app's setup)
  useEffect(() => {
    if (pathname?.includes("not-found") || pathname === "/404") {
      setShowLoader(true);
    }
  }, [pathname]);

  // Progress bar simulation
  useEffect(() => {
    if (!showLoader) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 - prev) * 0.1;
        return next > 99 ? 100 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [showLoader]);

  // Particles
  useEffect(() => {
    if (!particlesRef.current || !showLoader) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-[#f0c808]/30";
      const size = Math.random() * 6 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
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
      setTimeout(() => particle.remove(), 2500);
    };

    const interval = setInterval(createParticle, 200);
    return () => clearInterval(interval);
  }, [showLoader]);

  if (!showLoader) return null;

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
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#3a2820]/70" />

        <div className="relative flex flex-col items-center justify-center space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 relative"
          >
            <div className="w-28 h-28 relative flex items-center justify-center">
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

              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f0c808]/30 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <Image
                src="https://aaaschool.s3.ap-south-1.amazonaws.com/aaa.png"
                alt="AAA Logo"
                width={112}
                height={112}
                className="w-full h-full relative z-10 drop-shadow-lg"
              />

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
                className={`inline-block ${letter === " " ? "mr-2" : ""} text-[#f0c808] drop-shadow-md`}
              >
                {letter}
              </motion.span>
            ))}

            <motion.div
              className="absolute inset-0 blur-md text-[#f0c808]/30 flex"
              aria-hidden="true"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {letters.map((letter, index) => (
                <span key={index} className="inline-block">
                  {letter}
                </span>
              ))}
            </motion.div>
          </div>

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-8 -top-6 text-xs text-[#f0c808]/80"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

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
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="inline-flex"
              >
                <span className="mx-0.5">.</span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}>
                  .
                </motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}>
                  .
                </motion.span>
              </motion.span>
            </motion.p>

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
