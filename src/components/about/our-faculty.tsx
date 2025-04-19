"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface FacultyMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
  expertise?: string[];
}

export default function OurFaculty() {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const facultyMembers: FacultyMember[] = [
    {
      id: "diptimayee",
      name: "Diptimayee Mohanty",
      position: "Principal",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mpeEGzqAHji2REWKTKIaXb4kOF2u6h.png",
      bio: "As the Principal of Aryavart Ancient Academy, Mrs. Mohanty brings years of educational experience and leadership to guide our institution towards excellence. Her vision for holistic education has transformed countless lives.",
      expertise: [
        "Educational Leadership",
        "Curriculum Development",
        "Student Mentoring",
        "Academic Excellence",
      ],
    },
    {
      id: "mitali",
      name: "Mitali Parida",
      position: "Counsellor",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-mpeEGzqAHji2REWKTKIaXb4kOF2u6h.png",
      bio: "Ms. Parida provides essential guidance and support to our students, helping them navigate academic and personal challenges. Her compassionate approach creates a safe space for students to express themselves.",
      expertise: [
        "Student Counseling",
        "Emotional Intelligence",
        "Career Guidance",
        "Conflict Resolution",
      ],
    },
    {
      id: "pratap",
      name: "Pratap Chandra Dash",
      position: "Member (Teacher Representative)",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Mr. Dash represents the teaching staff on our committee and brings valuable classroom perspective to our decision-making process. His innovative teaching methods have inspired many students.",
      expertise: [
        "Mathematics",
        "Science Education",
        "Curriculum Planning",
        "Educational Technology",
      ],
    },
    {
      id: "rajesh",
      name: "Rajesh Kumar",
      position: "Science Department Head",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With extensive experience in science education, Mr. Kumar leads our science department with passion and innovation. His hands-on approach to teaching has made science a favorite subject among students.",
      expertise: [
        "Physics",
        "Chemistry",
        "Laboratory Management",
        "Research Guidance",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(facultyMembers.length / 3)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(facultyMembers.length / 3)) %
        Math.ceil(facultyMembers.length / 3)
    );
  };

  const openMemberDetails = (id: string) => {
    setActiveMember(id);
  };

  const closeMemberDetails = () => {
    setActiveMember(null);
  };

  // Get visible faculty members based on current index
  const getVisibleMembers = () => {
    const startIndex = currentIndex * 3;
    return facultyMembers.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#f0e6d2] to-[#f8f3e9] relative overflow-hidden">
      {/* Background decorative elements */}

      {/* Temple-inspired decorative top border */}
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

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4 relative"
          >
            <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#8b1a1a]"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif"
          >
            OUR EXPERIENCED FACULTY
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 bg-[#d4b483] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-[#5a3e36] max-w-3xl mx-auto"
          >
            Meet our dedicated team of educators who bring passion, expertise,
            and innovation to the classroom every day
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          {/* Faculty carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {getVisibleMembers().map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group relative"
                    onClick={() => openMemberDetails(member.id)}
                  >
                    {/* Temple-inspired decorative top */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8b1a1a] via-[#d4b483] to-[#8b1a1a]"></div>

                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5a3e36]/90 via-[#5a3e36]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-bold text-lg">
                          {member.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {member.position}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#8b1a1a] group-hover:opacity-0 transition-opacity duration-300">
                        {member.name}
                      </h3>
                      <p className="text-[#5a3e36] text-sm group-hover:opacity-0 transition-opacity duration-300">
                        {member.position}
                      </p>
                    </div>

                    {/* View details button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[#8b1a1a] text-white text-xs px-3 py-1 rounded-full">
                        View Profile
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -left-4 md:left-4 z-10 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute top-1/2 -right-4 md:right-4 z-10 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm text-[#8b1a1a] p-2 rounded-full shadow-md hover:bg-[#8b1a1a] hover:text-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(facultyMembers.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentIndex === index ? "bg-[#8b1a1a]" : "bg-[#8b1a1a]/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              )
            )}
          </div>
        </div>
      </div>

      {/* Faculty member detail modal */}
      <AnimatePresence>
        {activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeMemberDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {facultyMembers.find((m) => m.id === activeMember) && (
                <>
                  <div className="relative h-64 md:h-80">
                    <Image
                      src={
                        facultyMembers.find((m) => m.id === activeMember)
                          ?.image || ""
                      }
                      alt={
                        facultyMembers.find((m) => m.id === activeMember)
                          ?.name || ""
                      }
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5a3e36]/90 to-transparent"></div>

                    {/* Close button */}
                    <button
                      className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
                      onClick={closeMemberDetails}
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">
                        {
                          facultyMembers.find((m) => m.id === activeMember)
                            ?.name
                        }
                      </h3>
                      <p className="text-white/80">
                        {
                          facultyMembers.find((m) => m.id === activeMember)
                            ?.position
                        }
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-bold text-[#8b1a1a] mb-4">
                      About
                    </h4>
                    <p className="text-[#5a3e36] mb-6">
                      {facultyMembers.find((m) => m.id === activeMember)?.bio}
                    </p>

                    {facultyMembers.find((m) => m.id === activeMember)
                      ?.expertise && (
                      <>
                        <h4 className="text-lg font-bold text-[#8b1a1a] mb-4">
                          Areas of Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {facultyMembers
                            .find((m) => m.id === activeMember)
                            ?.expertise?.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-[#f8f3e9] text-[#8b1a1a] px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </>
                    )}

                    <div className="flex justify-end">
                      <button
                        onClick={closeMemberDetails}
                        className="bg-[#8b1a1a] text-white px-4 py-2 rounded-lg hover:bg-[#8b1a1a]/90 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
