"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield } from "lucide-react";

interface House {
  id: string;
  name: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

export default function AryavartHouses() {
  const houses: House[] = [
    {
      id: "dronacharya",
      name: "DRONACHARYA",
      title: "The Savior",
      description:
        "DRONA had divine sight. Being a great teacher he not only taught but also protected humanity from destruction.",
      color: "#1e3a8a",
      icon: "🏹",
    },
    {
      id: "sankaracharya",
      name: "SANKARACHARYA",
      title: "The Unifying",
      description:
        "SANKARACHARYA means teacher of the way of Sankar. He propagated the message of Vedic Wisdom, pure consciousness, to the world. The truth is individual is not different from Brahman.",
      color: "#b91c1c",
      icon: "🔱",
    },
    {
      id: "chanakya",
      name: "CHANAKYA",
      title: "The Diplomat",
      description:
        "Guru Chanakya stands even for the unity and oneness for the nation. A great minister who formulated the most ancient theories of politics and diplomacy. Arthashastra the timeless wisdom.",
      color: "#047857",
      icon: "📜",
    },
    {
      id: "kripacharya",
      name: "KRIPACHARYA",
      title: "The Divine",
      description:
        "KRIPACHARYA is known for his spirituality towards creating divine souls. He stands as an example of truth, law, ethics and standards.",
      color: "#f59e0b",
      icon: "✨",
    },
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hs.jpg"
          alt="Green campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8b1a1a]/60 to-[#8b1a1a]/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <div className="relative z-10 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full p-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
            The Aryavart Houses
          </h2>
          <p className="text-white/90 max-w-2xl text-center mx-auto">
            35 acres Campus with a green environment. Total Capacity on campus
            1200. Teacher : Student Ratio 1:20
          </p>
          <div className="w-24 h-1 bg-white/50 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {houses.map((house) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              layout
              className="relative"
            >
              <div
                className="rounded-xl shadow-lg border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: `${house.color}40`,
                  minHeight: "330px",
                }}
              >
                {/* House shield/emblem */}
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: house.color,
                    boxShadow: `0 0 20px ${house.color}80`,
                  }}
                >
                  {house.icon}
                </div>

                <div className="pt-10 px-6 pb-4">
                  <div className="text-center mb-4">
                    <h3 className="text-xl t font-bold text-white">
                      {house.name}
                    </h3>
                    <p className="text-white/80 italic text-sm">
                      {house.title}
                    </p>
                  </div>

                  {/* Always show the description */}
                  <p className="text-white/90 text-center text-sm mb-4">
                    {house.description}
                  </p>
                </div>

                {/* Decorative bottom border */}
                <div
                  className="h-6 "
                  style={{ backgroundColor: house.color }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 pointer-events-none">
          <svg
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,0 C300,95 900,95 1200,0 L1200,100 L0,100 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
