"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Calendar } from 'lucide-react';

interface Announcement {
  _id?: string;
  title: string;
  date?: string;
  createdAt: Date;
}

export default function AnnouncementsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch('/api/announcements?active=true');
      if (!res.ok) throw new Error('Failed to fetch announcements');
      
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError('Failed to load announcements');
      
      setAnnouncements([
        {
          title: "Admission for the new academic year 2025-26 is now open",
          date: "2025-06-01",
          createdAt: new Date()
        },
        {
          title: "Parent-Teacher Meeting scheduled for next Friday",
          date: "2025-06-15",
          createdAt: new Date()
        },
        {
          title: "Annual Sports Day Celebration",
          date: "2025-07-20",
          createdAt: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    fetchAnnouncements();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={openModal}
        className="flex items-center text-xs text-[#5a3e36] hover:text-[#8b1a1a] transition-colors"
      >
        View All Announcements
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white p-6 flex justify-between items-center">
                <div className="flex items-center">
                  <Bell className="h-6 w-6 mr-3" />
                  <h2 className="text-xl font-bold">AAA Announcements</h2>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center text-red-600 py-8">
                    {error}
                  </div>
                ) : announcements.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No announcements at the moment
                  </div>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((announcement, index) => (
                      <div 
                        key={announcement._id || index}
                        className="bg-[#f8f3e9] p-4 rounded-lg border border-[#d4b483]/30 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start">
                          <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-4">
                            <Bell className="h-5 w-5 text-[#8b1a1a]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-[#8b1a1a] mb-1">
                              {announcement.title}
                            </h3>
                            {announcement.date && (
                              <div className="flex items-center text-sm text-[#5a3e36]">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(announcement.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </div>
                            )}
                            <p className="text-sm text-[#5a3e36] mt-2 opacity-70">
                              Posted on {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}