"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, ChevronRight, ChevronLeft, Calendar, Award, Flag, Dumbbell, BookOpen, AlertCircle } from "lucide-react"

interface Notification {
  _id?: string
  title: string
  icon: string
  date?: string
}

export default function NotificationSection() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch('/api/notifications?active=true');
      if (!res.ok) throw new Error('Failed to fetch notifications');
      
      const data = await res.json();
      
      if (data && data.length > 0) {
        setNotifications(data);
      } else {
        // Fallback notifications if none are available
        setNotifications([
          {
            _id: "1",
            title: "Integrated Classes for UPSC NDA Exam Sep 2024",
            icon: "BookOpen",
            date: "Starting June 15, 2024",
          },
          {
            _id: "2",
            title: "Celebration of Independence Day 2024",
            icon: "Flag",
            date: "August 15, 2024",
          },
          {
            _id: "3",
            title: "National De worming Day",
            icon: "AlertCircle",
            date: "August 10, 2024",
          },
        ]);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
      
      // Fallback notifications if fetch fails
      setNotifications([
        {
          _id: "1",
          title: "Integrated Classes for UPSC NDA Exam Sep 2024",
          icon: "BookOpen",
          date: "Starting June 15, 2024",
        },
        {
          _id: "2",
          title: "Celebration of Independence Day 2024",
          icon: "Flag",
          date: "August 15, 2024",
        },
        {
          _id: "3",
          title: "National De worming Day",
          icon: "AlertCircle",
          date: "August 10, 2024",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const nextNotification = () => {
    setActiveIndex((prev) => (prev === notifications.length - 1 ? 0 : prev + 1))
  }

  const prevNotification = () => {
    setActiveIndex((prev) => (prev === 0 ? notifications.length - 1 : prev - 1))
  }

  // Helper function to render icon based on icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="h-5 w-5" />;
      case "Flag":
        return <Flag className="h-5 w-5" />;
      case "AlertCircle":
        return <AlertCircle className="h-5 w-5" />;
      case "Dumbbell":
        return <Dumbbell className="h-5 w-5" />;
      case "Award":
        return <Award className="h-5 w-5" />;
      case "Bell":
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  if (notifications.length === 0 && !isLoading) {
    return null;
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
                    <div className="bg-[#8b1a1a]/10 p-3 rounded-full mr-4">
                      <div className="text-[#8b1a1a]">
                        {renderIcon(notifications[activeIndex].icon)}
                      </div>
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
  