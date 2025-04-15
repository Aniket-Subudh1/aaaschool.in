"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, ChevronRight, ChevronLeft } from "lucide-react"
import NotificationsModal from "./notifications-modal"

interface Notification {
  _id?: string
  title: string
  icon: string
  date?: string
  createdAt?: string
}

export default function NotificationSection() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const res = await fetch('/api/notifications?active=true&format=raw')
      if (!res.ok) throw new Error('Failed to fetch notifications')
      
      const data = await res.json()
      
      if (data && Array.isArray(data) && data.length > 0) {
        setNotifications(data)
      } else {
        setNotifications([
          {
            _id: "1",
            title: "Integrated Classes for UPSC NDA Exam Sep 2024",
            icon: "BookOpen",
            date: "2024-06-15",
            createdAt: "2024-06-01",
          },
          {
            _id: "2",
            title: "Celebration of Independence Day 2024",
            icon: "Flag",
            date: "2024-08-15",
            createdAt: "2024-08-01",
          },
          {
            _id: "3",
            title: "National De-worming Day",
            icon: "AlertCircle",
            date: "2024-08-10",
            createdAt: "2024-08-01",
          },
        ])
      }
    } catch (err) {
      console.error('Error fetching notifications:', err)
      setError('Failed to load notifications')
      
      setNotifications([
        {
          _id: "1",
          title: "Integrated Classes for UPSC NDA Exam Sep 2024",
          icon: "BookOpen",
          date: "2024-06-15",
          createdAt: "2024-06-01",
        },
        {
          _id: "2",
          title: "Celebration of Independence Day 2024",
          icon: "Flag",
          date: "2024-08-15",
          createdAt: "2024-08-01",
        },
        {
          _id: "3",
          title: "National De-worming Day",
          icon: "AlertCircle",
          date: "2024-08-10",
          createdAt: "2024-08-01",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const nextNotification = () => {
    setActiveIndex((prev) => (prev === notifications.length - 1 ? 0 : prev + 1))
  }

  const prevNotification = () => {
    setActiveIndex((prev) => (prev === 0 ? notifications.length - 1 : prev - 1))
  }


  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .catch((err) => console.error("Error playing video:", err))
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.5 } 
    )

    observer.observe(video)

    return () => {
      observer.unobserve(video)
    }
  }, [])

  if (notifications.length === 0 && !isLoading) {
    return null
  }

  return (
    <section className="py-12 bg-[#f8f3e9] relative overflow-hidden">
      <div className="absolute inset-0 bg-cultural-pattern opacity-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Video Card */}
          <div className="w-full md:w-1/2">
  <div className="bg-white rounded-lg shadow-md border border-[#d4b483]/20 overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-2 bg-[#8b1a1a]/10"></div>
    <div className="p-6">
      <video
        ref={videoRef}
        src="./aaaschool_vdo.mp4"
        controls
        loop
        muted
        className="w-[800px] h-[400px] object-cover bg-black rounded-md"
      />
      <div className="mt-4 text-center text-[#8b1a1a] font-medium text-base">
        Introduction to AAA Culture & Campus Life
      </div>
    </div>
  </div>
</div>


          {/* Notification Card */}
          <div className="w-full md:w-1/2">
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
                {isLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="flex items-center">
                      <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                      <div className="ml-4 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start"
                    >
                      <h3 className="text-xl font-medium text-[#8b1a1a]">
                        {notifications[activeIndex].title}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                )}
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
                  <NotificationsModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
