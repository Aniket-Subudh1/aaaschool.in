"use client";

import Image from "next/image";

export default function PrincipalMessage() {
  return (
    <section className="py-16 bg-[#f0e6d2] relative overflow-hidden">
      {/* Decorative light pattern in background (optional) */}
      <div className="absolute inset-0 bg-cultural-pattern opacity-5"></div>

      {/* Optional top decorative bar */}
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`top-${i}`}
              className="w-6 h-8 bg-[#8b1a1a]/10 mx-0.5 rounded-b-lg"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-[#d4b483]/30 overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <Image
                src="/pric.jpg"
                alt="Principal"
                width={900}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 p-6 flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-[#8b1a1a] font-serif mb-2">
                PRINCIPAL&apos;S MESSAGE
              </h2>
              <p className="text-[#5a3e36] mb-4">
                As I believe that we are the means by which our children are
                coming into this world, but we did not design them. They are
                designed by <strong>GOD</strong>.
              </p>

              <div className="mt-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional bottom silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M600,0 Q750,60 750,60 L450,60 Q450,60 600,0 Z"
            fill="#8b1a1a"
          />
          <path
            d="M400,40 Q450,60 450,60 L350,60 Q350,60 400,40 Z"
            fill="#8b1a1a"
          />
          <path
            d="M800,40 Q850,60 850,60 L750,60 Q750,60 800,40 Z"
            fill="#8b1a1a"
          />
          <rect x="300" y="60" width="600" height="80" fill="#8b1a1a" />
          <rect x="0" y="140" width="1200" height="60" fill="#8b1a1a" />
        </svg>
      </div>
    </section>
  );
}
