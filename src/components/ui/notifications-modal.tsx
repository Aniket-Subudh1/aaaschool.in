"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Calendar, Info, ChevronLeft } from 'lucide-react';

interface Notification {
  _id?: string;
  title: string;
  icon: string;
  date?: string;
  description?: string;
  createdAt: Date;
}

export default function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initial width
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderIcon = (iconName: string) => {
    const iconSize = 20;
    const iconClasses = "text-[#8b1a1a]";
    
    switch (iconName) {
      case 'BookOpen':
        return <Bell className={`h-${iconSize} w-${iconSize} ${iconClasses}`} />;
      case 'Flag':
        return <Bell className={`h-${iconSize} w-${iconSize} ${iconClasses}`} />;
      case 'AlertCircle':
        return <Bell className={`h-${iconSize} w-${iconSize} ${iconClasses}`} />;
      case 'Dumbbell':
        return <Bell className={`h-${iconSize} w-${iconSize} ${iconClasses}`} />;
      case 'Award':
        return <Bell className={`h-${iconSize} w-${iconSize} ${iconClasses}`} />;
      default:
        return <Bell className={`h-${iconSize} w-${iconSize} ${iconClasses}`} />;
    }
  };

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
            date: "2024-06-15",
            description: "Exciting opportunity for students preparing for competitive exams. Join our integrated coaching program.",
            createdAt: new Date()
          },
          {
            _id: "2",
            title: "Celebration of Independence Day 2024",
            icon: "Flag",
            date: "2024-08-15",
            description: "Join us in celebrating the spirit of independence with cultural performances and patriotic fervor.",
            createdAt: new Date()
          },
          {
            _id: "3",
            title: "National De-worming Day",
            icon: "AlertCircle",
            date: "2024-08-10",
            description: "Health awareness program to ensure student wellness and preventive healthcare.",
            createdAt: new Date()
          }
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
          date: "2024-06-15",
          description: "Exciting opportunity for students preparing for competitive exams. Join our integrated coaching program.",
          createdAt: new Date()
        },
        {
          _id: "2",
          title: "Celebration of Independence Day 2024",
          icon: "Flag",
          date: "2024-08-15",
          description: "Join us in celebrating the spirit of independence with cultural performances and patriotic fervor.",
          createdAt: new Date()
        },
        {
          _id: "3",
          title: "National De-worming Day",
          icon: "AlertCircle",
          date: "2024-08-10",
          description: "Health awareness program to ensure student wellness and preventive healthcare.",
          createdAt: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    fetchNotifications();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedNotification(null);
  };

  const selectNotification = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const goBackToList = () => {
    setSelectedNotification(null);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={openModal}
        className="text-sm font-medium text-[#8b1a1a] hover:underline flex items-center"
      >
        View All Notifications
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
              className={`bg-white rounded-xl shadow-xl w-full max-h-[80vh] overflow-hidden 
                ${isMobile 
                  ? 'max-w-full h-[90vh]' 
                  : 'max-w-4xl flex'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile View */}
              {isMobile ? (
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-[#8b1a1a] text-white p-4 flex items-center justify-between">
                    <h2 className="font-bold text-lg">
                      {selectedNotification 
                        ? selectedNotification.title 
                        : 'Notifications'
                      }
                    </h2>
                    <button onClick={closeModal}>
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Content */}
                  {selectedNotification ? (
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                      <div className="flex items-start">
                        <div className="bg-[#8b1a1a]/10 p-3 rounded-full mr-4">
                          {renderIcon(selectedNotification.icon)}
                        </div>
                        <div>
                          <div className="flex items-center text-[#5a3e36] mb-2">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span className="text-sm">
                              {new Date(selectedNotification.date || selectedNotification.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {selectedNotification.description && (
                        <div className="bg-[#f8f3e9] p-4 rounded-lg border border-[#d4b483]/20">
                          <div className="flex items-center mb-2">
                            <Info className="h-5 w-5 text-[#8b1a1a] mr-2" />
                            <h3 className="font-medium text-[#8b1a1a]">Details</h3>
                          </div>
                          <p className="text-[#5a3e36] whitespace-pre-line">
                            {selectedNotification.description}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <button
                          onClick={goBackToList}
                          className="flex items-center text-[#8b1a1a] hover:underline"
                        >
                          <ChevronLeft className="h-5 w-5 mr-1" />
                          Back to List
                        </button>
                        <button
                          onClick={closeModal}
                          className="px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto">
                      {isLoading ? (
                        <div className="p-4 space-y-4">
                          {[1,2,3].map((_, index) => (
                            <div key={index} className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
                          ))}
                        </div>
                      ) : (
                        <div className="divide-y divide-[#d4b483]/20">
                          {notifications.map((notification) => (
                            <button
                              key={notification._id}
                              onClick={() => selectNotification(notification)}
                              className="w-full text-left p-4 hover:bg-white transition-colors"
                            >
                              <div className="flex items-center">
                                <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                                  {renderIcon(notification.icon)}
                                </div>
                                <div>
                                  <h3 className="font-medium text-[#8b1a1a] text-sm">
                                    {notification.title}
                                  </h3>
                                  <p className="text-xs text-[#5a3e36] opacity-70">
                                    {new Date(notification.date || notification.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // Desktop View (Original Implementation)
                <>
                  {/* Notifications List */}
                  <div className="w-1/3 border-r border-[#d4b483]/20 bg-[#f8f3e9] overflow-y-auto">
                    <div className="bg-[#8b1a1a] text-white p-4 font-bold">
                      Notifications
                    </div>
                    {isLoading ? (
                      <div className="p-4 space-y-4">
                        {[1,2,3].map((_, index) => (
                          <div key={index} className="animate-pulse bg-gray-200 h-16 rounded-lg"></div>
                        ))}
                      </div>
                    ) : (
                      <div className="divide-y divide-[#d4b483]/20">
                        {notifications.map((notification) => (
                          <button
                            key={notification._id}
                            onClick={() => selectNotification(notification)}
                            className={`w-full text-left p-4 hover:bg-white transition-colors ${
                              selectedNotification?._id === notification._id 
                                ? 'bg-white border-l-4 border-[#8b1a1a]' 
                                : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                                {renderIcon(notification.icon)}
                              </div>
                              <div>
                                <h3 className="font-medium text-[#8b1a1a] text-sm">
                                  {notification.title}
                                </h3>
                                <p className="text-xs text-[#5a3e36] opacity-70">
                                  {new Date(notification.date || notification.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notification Details */}
                  <div className="w-2/3 p-6 overflow-y-auto">
                    {selectedNotification ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <div className="flex items-start">
                          <div className="bg-[#8b1a1a]/10 p-3 rounded-full mr-4">
                            {renderIcon(selectedNotification.icon)}
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-[#8b1a1a]">
                              {selectedNotification.title}
                            </h2>
                            <div className="flex items-center text-[#5a3e36] mt-2">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {new Date(selectedNotification.date || selectedNotification.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {selectedNotification.description && (
                          <div className="bg-[#f8f3e9] p-4 rounded-lg border border-[#d4b483]/20">
                            <div className="flex items-center mb-2">
                              <Info className="h-5 w-5 text-[#8b1a1a] mr-2" />
                              <h3 className="font-medium text-[#8b1a1a]">Details</h3>
                            </div>
                            <p className="text-[#5a3e36] whitespace-pre-line">
                              {selectedNotification.description}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-[#5a3e36] text-center">
                        <p>Select a notification to view details</p>
                      </div>
                    )}
                  </div>

                  {/* Close Button */}
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-[#5a3e36] hover:text-[#8b1a1a]"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}