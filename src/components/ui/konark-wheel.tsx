"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function KonarkWheel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative">
        <div className="w-12 h-12 opacity-20"></div>
        <Image
          src="https://aaaschool.s3.ap-south-1.amazonaws.com/aaa.png"
          alt="Aryavart Ancient Academy Logo"
          width={60}
          height={60}
          className="relative z-10"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <svg
        viewBox="0 0 100 100"
        className="w-12 h-12 text-[#8b1a1a] absolute inset-0 animate-spin-slow opacity-20"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const x1 = 50 + 20 * Math.cos(angle);
          const y1 = 50 + 20 * Math.sin(angle);
          const x2 = 50 + 45 * Math.cos(angle);
          const y2 = 50 + 45 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      <Image
        src="https://aaaschool.s3.ap-south-1.amazonaws.com/aaa.png"
        alt="Aryavart Ancient Academy Logo"
        width={60}
        height={60}
        className="relative z-10"
      />
    </div>
  );
}
