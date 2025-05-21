"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Sparkles,
  BookOpen,
  Users,
  Award,
  Library,
  Heart,
  UserRound,
  X,
} from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

export default function SchoolActivities() {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activities: Activity[] = [
    {
      id: "teachers-empowerment",
      title: "Teacher's Empowerment",
      description:
        "Teachers are also learners. Staying updated is the key to success in any field, especially teaching. Our teachers undergo regular training to enhance their skills.",
      image: "https://aaaschool.s3.ap-south-1.amazonaws.com/tec.jpg",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: "students-empowerment",
      title: "Student's Empowerment",
      description:
        "By providing a conducive and encouraging environment, the students are mentored to become future leaders with strong values and principles.",
      image: "https://aaaschool.s3.ap-south-1.amazonaws.com/lab.jpg",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: "students-achievements",
      title: "Student's Achievements",
      description:
        "Our students excel in academics, sports, arts, and cultural activities, bringing laurels to the school at district, state, and national levels.",
      image: "https://aaaschool.s3.ap-south-1.amazonaws.com/ac.jpg",
      icon: <Award className="h-6 w-6" />,
    },
    {
      id: "library",
      title: "Library",
      description:
        "Our Library has been enriched with subscriptions for more number of newspapers, magazines, and books to foster a love for reading and knowledge.",
      image: "https://aaaschool.s3.ap-south-1.amazonaws.com/LIB.jpg",
      icon: <Library className="h-6 w-6" />,
    },
    {
      id: "social-responsibility",
      title: "Social Responsibility",
      description:
        "It is important for the children to realize how privileged they are to have wonderful parents. We teach them to give back to society through various community service activities.",
      image: "https://aaaschool.s3.ap-south-1.amazonaws.com/jrc.jpg",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      id: "parents-enrichment",
      title: "Parent's Enrichment",
      description:
        "An orientation programme in the beginning of session is held to build up a strong bond between the school and parents, ensuring collaborative growth of the child.",
      image: "https://aaaschool.s3.ap-south-1.amazonaws.com/ori.jpeg",
      icon: <UserRound className="h-6 w-6" />,
    },
  ];

  return (
    <section className="py-16 bg-[#f0e6d2] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-cultural-pattern opacity-5"></div>
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

      <div
        className="container mx-auto px-4 pt-8 relative z-10"
        ref={containerRef}
      >
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
              <div className="relative z-10 bg-[#f0e6d2] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                <Sparkles className="h-8 w-8 text-[#8b1a1a]" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
            Our Activities
          </h2>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            OUR BEST SERVICES FOR YOUR KIDS
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-[#d4b483]/20 group cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => setActiveActivity(activity.id)}
            >
              <div className="relative h-48">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8b1a1a]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <ChevronRight className="h-5 w-5 mr-1" />
                    <span className="text-sm font-medium">Learn More</span>
                  </div>
                </motion.div>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <div className="text-[#8b1a1a]">{activity.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-[#8b1a1a]">
                    {activity.title}
                  </h3>
                </div>
                <p className="text-sm text-[#5a3e36] line-clamp-3">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity Modal */}
        <AnimatePresence>
          {activeActivity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setActiveActivity(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {activities.find((a) => a.id === activeActivity) && (
                  <>
                    <div className="relative h-64 sm:h-72">
                      <Image
                        src={
                          activities.find((a) => a.id === activeActivity)
                            ?.image || ""
                        }
                        alt={
                          activities.find((a) => a.id === activeActivity)
                            ?.title || ""
                        }
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#8b1a1a]/80 to-transparent"></div>
                      <motion.button
                        className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                        onClick={() => setActiveActivity(null)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="h-5 w-5 text-white" />
                      </motion.button>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.div
                          className="flex items-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="bg-white/20 p-2 rounded-full mr-3">
                            <div className="text-white">
                              {
                                activities.find((a) => a.id === activeActivity)
                                  ?.icon
                              }
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold">
                            {
                              activities.find((a) => a.id === activeActivity)
                                ?.title
                            }
                          </h3>
                        </motion.div>
                      </div>
                    </div>
                    <div className="p-6">
                      <motion.p
                        className="text-[#5a3e36] mb-4 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {
                          activities.find((a) => a.id === activeActivity)
                            ?.description
                        }
                      </motion.p>

                      <motion.div
                        className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center text-[#8b1a1a]">
                          <Sparkles className="h-5 w-5 mr-2" />
                          <span className="font-medium">
                            Enriching young minds
                          </span>
                        </div>
                        <motion.button
                          className="px-6 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 transition-colors w-full sm:w-auto"
                          onClick={() => setActiveActivity(null)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Close
                        </motion.button>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
