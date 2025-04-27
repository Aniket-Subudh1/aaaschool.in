"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Users,
  ArrowRight,
  Star,
  Calendar,
  Clock,
  Medal,
  Book,
} from "lucide-react";

export default function AchievementsPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const cards = [
    {
      id: "awards",
      title: "Awards & Recognition",
      description: "Explore our achievements and accolades in various fields",
      icon: <Award size={32} />,
      color: "from-[#8b1a1a]/90 to-[#c63030]/90",
      stats: [
        { icon: <Star size={12} />, text: "100+ Awards" },
        { icon: <Medal size={12} />, text: "Excellence" },
      ],
      href: "/achievements/awards",
    },
    {
      id: "sports",
      title: "Sports Achievements",
      description:
        "Celebrating our students' excellence in sports competitions",
      icon: <Trophy size={32} />,
      color: "from-amber-700/90 to-orange-600/90",
      stats: [
        { icon: <Trophy size={12} />, text: "50+ Championships" },
        { icon: <Medal size={12} />, text: "National Level" },
      ],
      href: "/achievements/sports",
    },
    {
      id: "alumni",
      title: "Alumni Network",
      description: "Connect with our successful graduates making a difference",
      icon: <Users size={32} />,
      color: "from-indigo-700/90 to-blue-600/90",
      stats: [
        { icon: <Users size={12} />, text: "Global Network" },
        { icon: <Star size={12} />, text: "Industry Leaders" },
      ],
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
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-[#8b1a1a] rounded-full mb-4"></div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#8b1a1a] mb-6 pt-8">
            Our Achievements
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Celebrating excellence and recognizing the accomplishments of our
            students, faculty, and alumni in various fields.
          </p>

          {/* Decorative elements */}
          <div className="absolute -top-4 -left-16 w-32 h-32 bg-[#8b1a1a]/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#8b1a1a]/5 rounded-full blur-3xl"></div>
        </div>

        {/* Enhanced Achievement Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 relative z-10"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeInUp}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Background with gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color}`}
              ></div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-28 h-28 bg-white/10 rounded-full"></div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {card.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-white/90 mb-6 flex-grow">
                  {card.description}
                </p>

                {/* Stats badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white flex items-center"
                    >
                      {stat.icon}
                      <span className="ml-1.5">{stat.text}</span>
                    </div>
                  ))}
                </div>

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

        {/* Enhanced Stats Section */}
        <div className="mt-24 bg-white rounded-xl shadow-md p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#8b1a1a]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#8b1a1a]/5 rounded-full blur-2xl"></div>

          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-[#8b1a1a] to-[#c63030] rounded-full">
              <Star size={32} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#8b1a1a] ml-4">
              Excellence at Aryavart Ancient Academy
            </h2>
          </div>

          <p className="text-gray-700 mb-12 max-w-3xl mx-auto text-lg">
            At Aryavart Ancient Academy, we believe in nurturing talent and
            recognizing excellence. Our students consistently excel in
            academics, sports, cultural activities, and more. We take pride in
            their achievements and continue to provide a platform for them to
            showcase their abilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-4xl font-bold text-[#8b1a1a] mb-2">100+</h3>
              <p className="text-gray-700 flex items-center justify-center">
                <Book size={16} className="mr-2" />
                Academic Awards
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-4xl font-bold text-[#8b1a1a] mb-2">50+</h3>
              <p className="text-gray-700 flex items-center justify-center">
                <Trophy size={16} className="mr-2" />
                Sports Championships
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-4xl font-bold text-[#8b1a1a] mb-2">200+</h3>
              <p className="text-gray-700 flex items-center justify-center">
                <Users size={16} className="mr-2" />
                Distinguished Alumni
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] p-8 rounded-lg text-center transform transition-transform hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-4xl font-bold text-[#8b1a1a] mb-2">25+</h3>
              <p className="text-gray-700 flex items-center justify-center">
                <Calendar size={16} className="mr-2" />
                Years of Excellence
              </p>
            </div>
          </div>

          {/* Timeline indicator */}
          <div className="mt-16 flex items-center justify-center">
            <div className="flex items-center text-[#8b1a1a] text-sm">
              <Clock size={16} className="mr-2" />
              Updated: April 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
