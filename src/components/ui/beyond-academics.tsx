"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Camera, Palette, Music, Trophy, GraduationCap, Users, Sparkles } from "lucide-react"

interface Club {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
}

export default function BeyondAcademics() {
  const [activeClub, setActiveClub] = useState<string | null>(null)

  const clubs: Club[] = [
    {
      id: "club-culture",
      name: "Club Culture",
      icon: <Sparkles className="h-8 w-8" />,
      color: "#f59e0b",
      description:
        "Our club culture fosters creativity, teamwork, and leadership skills through various extracurricular activities.",
    },
    {
      id: "book-club",
      name: "Book Club",
      icon: <BookOpen className="h-8 w-8" />,
      color: "#0ea5e9",
      description: "The Book Club encourages reading habits and literary discussions among students of all ages.",
    },
    {
      id: "photography-club",
      name: "Photography Club",
      icon: <Camera className="h-8 w-8" />,
      color: "#8b5cf6",
      description: "Students learn the art of photography, visual storytelling, and image editing techniques.",
    },
    {
      id: "art-club",
      name: "Art Club",
      icon: <Palette className="h-8 w-8" />,
      color: "#ec4899",
      description: "Explore various art forms including painting, sketching, pottery, and sculpture.",
    },
    {
      id: "dance-club",
      name: "Dance Club",
      icon: <Music className="h-8 w-8" />,
      color: "#10b981",
      description: "Students learn classical, folk, and contemporary dance forms under expert guidance.",
    },
    {
      id: "celebrations",
      name: "Celebrations",
      icon: <Sparkles className="h-8 w-8" />,
      color: "#f43f5e",
      description: "We celebrate various festivals and important days with cultural programs and activities.",
    },
    {
      id: "sports",
      name: "Sports",
      icon: <Trophy className="h-8 w-8" />,
      color: "#3b82f6",
      description: "Our sports program includes indoor and outdoor games, athletics, and yoga for physical fitness.",
    },
    {
      id: "service-unit",
      name: "Service Unit",
      icon: <Users className="h-8 w-8" />,
      color: "#14b8a6",
      description: "Students engage in community service activities to develop empathy and social responsibility.",
    },
  ]

  return (
    <section className="py-16 bg-[#f8f3e9] relative">
      <div className="absolute top-0 left-0 w-full h-8 bg-[#8b1a1a]/10"></div>

      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
              <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                <GraduationCap className="h-8 w-8 text-[#8b1a1a]" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">Beyond Academics</h2>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            We believe in holistic development through a variety of extracurricular activities that nurture talents and
            build character.
          </p>
          <div className="w-24 h-1 bg-[#8b1a1a]/30 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {clubs.map((club) => (
            <motion.div
              key={club.id}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-xl p-6 shadow-md border border-[#d4b483]/20 flex flex-col items-center text-center cursor-pointer transition-all duration-300"
              onClick={() => setActiveClub(club.id === activeClub ? null : club.id)}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${club.color}20` }}
              >
                <div style={{ color: club.color }}>{club.icon}</div>
              </div>
              <h3 className="font-medium text-[#8b1a1a] mb-2">{club.name}</h3>

              <AnimatePresence>
                {activeClub === club.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-sm text-[#5a3e36] overflow-hidden"
                  >
                    <p>{club.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center text-[#8b1a1a] hover:underline font-medium">
            View All Beyond ACADEMICS
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
