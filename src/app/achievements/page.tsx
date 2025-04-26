"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Trophy, Users, ArrowRight, Star } from "lucide-react";

export default function AchievementsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    {
      id: "awards",
      title: "Awards & Recognition",
      description: "Explore our achievements and accolades in various fields",
      icon: <Award size={32} />,
      color: "from-purple-600 to-indigo-600",
      href: "/achievements/awards",
    },
    {
      id: "sports",
      title: "Sports Achievements",
      description:
        "Celebrating our students' excellence in sports competitions",
      icon: <Trophy size={32} />,
      color: "from-red-600 to-orange-600",
      href: "/achievements/sports",
    },
    {
      id: "alumni",
      title: "Alumni Network",
      description: "Connect with our successful graduates making a difference",
      icon: <Users size={32} />,
      color: "from-blue-600 to-cyan-600",
      href: "/achievements/alumni",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-[#f8f3e9] min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4">
            Our Achievements
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Celebrating excellence and recognizing the accomplishments of our
            students, faculty, and alumni in various fields.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeInUp}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative overflow-hidden rounded-xl shadow-lg"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`}
              ></div>
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-white/90 mb-6 flex-grow">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center text-white font-medium mt-auto group"
                >
                  Explore{" "}
                  <ArrowRight
                    size={16}
                    className={`ml-2 transition-transform duration-300 ${
                      hoveredCard === card.id ? "translate-x-1" : ""
                    }`}
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 bg-white rounded-xl shadow-md p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Star size={32} className="text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold text-[#8b1a1a]">
              Excellence at Aryavart Ancient Academy
            </h2>
          </div>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            At Aryavart Ancient Academy, we believe in nurturing talent and
            recognizing excellence. Our students consistently excel in
            academics, sports, cultural activities, and more. We take pride in
            their achievements and continue to provide a platform for them to
            showcase their abilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-[#8b1a1a] mb-2">100+</h3>
              <p className="text-gray-700">Academic Awards</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-[#8b1a1a] mb-2">50+</h3>
              <p className="text-gray-700">Sports Championships</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-4xl font-bold text-[#8b1a1a] mb-2">200+</h3>
              <p className="text-gray-700">Distinguished Alumni</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
