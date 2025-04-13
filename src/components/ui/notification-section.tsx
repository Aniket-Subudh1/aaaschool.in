"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, ChevronRight, ChevronLeft, Calendar, Award, Flag, Dumbbell, BookOpen, AlertCircle } from "lucide-react"

interface Notification {
  id: number
  title: string
  icon: React.ReactNode
  date?: string
}

export default function NotificationSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Integrated Classes for UPSC NDA Exam Sep 2024",
      icon: <BookOpen className="h-5 w-5" />,
      date: "Starting June 15, 2024",
    },
    {
      id: 2,
      title: "Celebration of Independence Day 2024",
      icon: <Flag className="h-5 w-5" />,
      date: "August 15, 2024",
    },
    {
      id: 3,
      title: "National De worming Day",
      icon: <AlertCircle className="h-5 w-5" />,
      date: "August 10, 2024",
    },
    {
      id: 4,
      title: "Evening session games and sports activities compulsory for all (boys and girls)",
      icon: <Dumbbell className="h-5 w-5" />,
      date: "Effective immediately",
    },
    {
      id: 5,
      title: "Notification for Change of Subject in Class X & XII",
      icon: <BookOpen className="h-5 w-5" />,
      date: "Last date: July 30, 2024",
    },
    {
      id: 6,
      title: 'Exhibition "Nerdnia-2.0" on the Eve of Foundation Day on 7 August 24',
      icon: <Award className="h-5 w-5" />,
      date: "August 7, 2024",
    },
  ]

  const nextNotification = () => {
    setActiveIndex((prev) => (prev === notifications.length - 1 ? 0 : prev + 1))
  }

  const prevNotification = () => {
    setActiveIndex((prev) => (prev === 0 ? notifications.length - 1 : prev - 1))
  }

  return (
    <section className="py-12 bg-[#f8f3e9] relative overflow-hidden">
      <div className="absolute inset-0 bg-cultural-pattern opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-[#8b1a1a] text-white p-2 rounded-full mr-3">
              <Bell className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#8b1a1a] font-serif">AAA NOTIFICATION</h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevNotification}
              className="p-2 rounded-full hover:bg-[#d4b483]/20 text-[#8b1a1a] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextNotification}
              className="p-2 rounded-full hover:bg-[#d4b483]/20 text-[#8b1a1a] transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-[#d4b483]/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#8b1a1a]/10"></div>
          <div className="p-6 min-h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <div className="bg-[#8b1a1a]/10 p-3 rounded-full mr-4">
                  <div className="text-[#8b1a1a]">{notifications[activeIndex].icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#8b1a1a] mb-2">{notifications[activeIndex].title}</h3>
                  {notifications[activeIndex].date && (
                    <div className="flex items-center text-[#5a3e36] text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{notifications[activeIndex].date}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-[#f8f3e9] px-6 py-3 border-t border-[#d4b483]/20">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1">
                {notifications.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      activeIndex === index ? "bg-[#8b1a1a]" : "bg-[#8b1a1a]/30"
                    }`}
                  />
                ))}
              </div>
              <a href="#" className="text-sm font-medium text-[#8b1a1a] hover:underline flex items-center">
                View All Notifications <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
