"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Users,
  GraduationCap,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  X,
  Sparkles,
  Brain,
  Heart,
  Palette,
  Music,
  Dumbbell,
  Leaf,
  type LucideIcon,
  BookMarked,
  Building2,
  Microscope,
  Calculator,
  Globe,
  Atom,
  Beaker,
  FlaskConical,
  Laptop,
} from "lucide-react"

type ProgramLevel = "pratham" | "dwitiya" | "tritya" | "chaturtha"

interface Program {
  id: ProgramLevel
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  description: string
  details: {
    ageGroup?: string[]
    timings?: string[]
    primaryAreas?: string[]
    academics?: string[]
    facilities?: string[]
    subjects?: {
      stream: string
      compulsory: string[]
      optional: string[]
    }[]
    coaching?: string[]
    inNutshell?: string[]
  }
}

export default function AcademicPrograms() {
  const [activeProgram, setActiveProgram] = useState<ProgramLevel | null>(null)
  const [showModal, setShowModal] = useState(false)

  const programs: Program[] = [
    {
      id: "pratham",
      title: "Pratham Sopan",
      subtitle: "Elementary School",
      icon: <BookOpen className="h-8 w-8" />,
      color: "#8b1a1a",
      description:
        "Covering Nursery to K.G. II, the elementary school adopts an informal approach towards learning. Children here are encouraged to explore their environment while also being taught basic concepts in language, mathematics, computers, art and craft, dance and music.",
      details: {
        ageGroup: ["Play Group: 2 Yrs +", "Nursery: 3yrs +"],
        timings: ["Nursery to Class 1: 8:00am – 12:50pm"],
        primaryAreas: [
          "Communication and Language",
          "Physical Development",
          "Personal, Social and Emotional Development",
        ],
        academics: [
          "Reading",
          "Writing",
          "Spelling",
          "Grammar",
          "Alphabets",
          "Number Games",
          "Colour Identification",
          "Concept Games",
          "Creative Games: Art, Craft, Environment",
          "Hand Eye Motor Coordination",
          "Rhymes",
          "Story Telling",
          "Stay Connected to Nature",
        ],
        inNutshell: ["Learning Through Play", "Saturday is No Bag Day", "Fun Filled Activity"],
      },
    },
    {
      id: "dwitiya",
      title: "Dwitiya Sopan",
      subtitle: "Junior School",
      icon: <Users className="h-8 w-8" />,
      color: "#a52a2a",
      description:
        "Spanning classes I - V, the junior school is the child's introduction to full day school. This stage of school aims to build on the child's growing spirit of discovery and exploration. Emphasis is placed on the acquisition of sound language skills, mathematical concepts and scientific fundamentals.",
      details: {
        ageGroup: ["6 Yrs+ [Grade-1]"],
        timings: ["Class-2 to 4: 8:00am – 12:50pm", "Class-5: 10:00am – 4:00pm"],
        facilities: [
          "Multifaceted Learning",
          "Linguistic Learning",
          "Logical Learning",
          "Special Learning",
          "Kinaesthetic Learning",
          "Cub / Bul Bul",
          "JRC",
          "Vedic Classes",
          "Taekwondo",
          "Indoor & Outdoor",
          "Chess Club",
          "Computer Lab",
          "Language Lab",
          "Counselling",
          "Yoga & Medication",
          "Library",
          "Active Learning",
          "Exposure Visit",
          "Safe Drinking Water",
          "Clean Toilet",
          "Coaching",
          "Toy Train",
          "Day Boarding",
          "Safe Environment",
        ],
      },
    },
    {
      id: "tritya",
      title: "Tritya Sopan",
      subtitle: "Middle School",
      icon: <Brain className="h-8 w-8" />,
      color: "#b33939",
      description:
        "Comprising classes VI to VIII, this stage sees the introduction of a third language, Sanskrit, as well the detailing of history, geography, physics, chemistry and biology as separate subjects and all the excitement of their first examination.",
      details: {
        timings: ["10:00am – 4:00pm: General Class", "8:10 pm – 9:30pm: Personalised Coaching"],
        coaching: ["NTSE", "OLYMPIAD", "FOUNDATION COURSE FOR JEE & NEET"],
        facilities: [
          "Day Boarding",
          "Residential Facility",
          "Smart Classrooms",
          "Basket Ball",
          "Taekwondo",
          "Music Club",
          "Dance Class",
          "Yoga & Meditation",
          "Vedic Classes",
          "NCC",
          "JRC",
          "Scout / Guide",
          "Coding Learning",
          "Language Lab",
          "Math Lab",
          "Social Science Lab",
          "Computer Lab",
          "Physics Lab",
          "Chemistry Lab",
          "Biology Lab",
          "Counselling",
          "Library",
          "Canteen",
          "Exposure Visit",
          "Education for CWSN",
          "Safe Drinking Water",
          "Clean Toilet",
          "Safe Environment",
        ],
      },
    },
    {
      id: "chaturtha",
      title: "Chaturtha Sopan",
      subtitle: "Secondary School",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "#c0392b",
      description:
        "Comprising classes IX to XII, the senior school is where early life's lessons are put to test. Rigorous practice and study techniques with special emphasis on analysis and conceptualization are woven into the curriculum, as students prepare to appear for their board examinations.",
      details: {
        subjects: [
          {
            stream: "Science",
            compulsory: ["English", "Physics", "Chemistry"],
            optional: ["Mathematics", "Biology", "Computer Science", "Physical Education", "Yoga" ,"Painting"],
          },
          {
            stream: "Commerce",
            compulsory: ["English", "Accountancy", "Economics", "BST"],
            optional: ["Entrepreneurship", "Math", "Business Studies", "Yoga", "Painting"],
          },
          {
            stream: "Humanities",
            compulsory: ["English", "Psychology", "Economics", "Education"],
            optional: ["Pol. Sc.", "Geography", "History", "Math", "Odia", "Sociology"],
          },
        ],
      },
    },
  ]

  const openModal = (program: ProgramLevel) => {
    setActiveProgram(program)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const getIconForFacility = (facility: string): LucideIcon => {
    const facilityMap: Record<string, LucideIcon> = {
      Learning: Brain,
      Classes: BookMarked,
      Taekwondo: Dumbbell,
      Chess: Brain,
      Computer: Laptop,
      Language: Globe,
      Counselling: Heart,
      Yoga: Sparkles,
      Library: BookOpen,
      Boarding: Building2,
      Lab: Microscope,
      Math: Calculator,
      Science: Globe,
      Physics: Atom,
      Chemistry: Beaker,
      Biology: FlaskConical,
      Music: Music,
      Dance: Music,
      Art: Palette,
      Craft: Palette,
      Nature: Leaf,
    }

    // Find a matching key in the facility name
    for (const key in facilityMap) {
      if (facility.includes(key)) {
        return facilityMap[key]
      }
    }

    // Default icon
    return CheckCircle2
  }

  return (
    <section className="py-16 relative overflow-hidden bg-[#f8f3e9]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[#8b1a1a]/10"></div>
      <div className="absolute top-4 left-0 w-full flex justify-center">
        <div className="w-24 h-12 bg-[#8b1a1a]/10 rounded-b-full"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
              <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                <BookOpen className="h-8 w-8 text-[#8b1a1a]" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">Academic Programs</h2>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            Our curriculum is designed to nurture young minds through a blend of modern education and traditional
            values, creating a holistic learning environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program) => (
            <motion.div
              key={program.id}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-white rounded-lg overflow-hidden shadow-md border border-[#d4b483]/20 group"
            >
              <div
                className="p-6 flex flex-col items-center text-center cursor-pointer"
                onClick={() => openModal(program.id)}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ backgroundColor: `${program.color}10` }}
                >
                  <div className="text-[#8b1a1a]">{program.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-[#8b1a1a] mb-1 font-serif">{program.title}</h3>
                <p className="text-[#5a3e36] text-sm mb-4">{program.subtitle}</p>
                <p className="text-[#5a3e36] text-sm line-clamp-3 mb-4">{program.description}</p>
                <button
                  className="flex items-center text-sm font-medium text-[#8b1a1a] group-hover:underline"
                  onClick={() => openModal(program.id)}
                >
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && activeProgram && (
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
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-[#d4b483]/20">
                  <div className="flex items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{
                        backgroundColor: `${programs.find((p) => p.id === activeProgram)?.color || "#8b1a1a"}10`,
                      }}
                    >
                      <div className="text-[#8b1a1a]">{programs.find((p) => p.id === activeProgram)?.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#8b1a1a] font-serif">
                        {programs.find((p) => p.id === activeProgram)?.title}
                      </h3>
                      <p className="text-[#5a3e36] text-sm">{programs.find((p) => p.id === activeProgram)?.subtitle}</p>
                    </div>
                  </div>
                  <button className="text-[#5a3e36] hover:text-[#8b1a1a] transition-colors" onClick={closeModal}>
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                  <p className="text-[#5a3e36] mb-6">{programs.find((p) => p.id === activeProgram)?.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age Group */}
                    {programs.find((p) => p.id === activeProgram)?.details.ageGroup && (
                      <div className="bg-[#f8f3e9] rounded-lg p-4 border border-[#d4b483]/20">
                        <div className="flex items-center mb-3">
                          <Calendar className="h-5 w-5 text-[#8b1a1a] mr-2" />
                          <h4 className="font-medium text-[#8b1a1a]">Age Group</h4>
                        </div>
                        <ul className="space-y-2">
                          {programs
                            .find((p) => p.id === activeProgram)
                            ?.details.ageGroup?.map((age, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-[#8b1a1a] mr-2 mt-0.5 shrink-0" />
                                <span className="text-sm text-[#5a3e36]">{age}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {/* School Timings */}
                    {programs.find((p) => p.id === activeProgram)?.details.timings && (
                      <div className="bg-[#f8f3e9] rounded-lg p-4 border border-[#d4b483]/20">
                        <div className="flex items-center mb-3">
                          <Clock className="h-5 w-5 text-[#8b1a1a] mr-2" />
                          <h4 className="font-medium text-[#8b1a1a]">School Timings</h4>
                        </div>
                        <ul className="space-y-2">
                          {programs
                            .find((p) => p.id === activeProgram)
                            ?.details.timings?.map((timing, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-[#8b1a1a] mr-2 mt-0.5 shrink-0" />
                                <span className="text-sm text-[#5a3e36]">{timing}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Primary Areas */}
                  {programs.find((p) => p.id === activeProgram)?.details.primaryAreas && (
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <Brain className="h-5 w-5 text-[#8b1a1a] mr-2" />
                        <h4 className="font-medium text-[#8b1a1a]">3 PRIMARY AREAS</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {programs
                          .find((p) => p.id === activeProgram)
                          ?.details.primaryAreas?.map((area, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-lg shadow-sm border border-[#d4b483]/10 flex flex-col items-center text-center"
                            >
                              {index === 0 && <Sparkles className="h-8 w-8 text-[#8b1a1a] mb-2" />}
                              {index === 1 && <Dumbbell className="h-8 w-8 text-[#8b1a1a] mb-2" />}
                              {index === 2 && <Heart className="h-8 w-8 text-[#8b1a1a] mb-2" />}
                              <span className="text-sm text-[#5a3e36]">{area}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Academics */}
                  {programs.find((p) => p.id === activeProgram)?.details.academics && (
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <BookOpen className="h-5 w-5 text-[#8b1a1a] mr-2" />
                        <h4 className="font-medium text-[#8b1a1a]">Academics</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {programs
                          .find((p) => p.id === activeProgram)
                          ?.details.academics?.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start bg-white p-3 rounded-md border border-[#d4b483]/10"
                            >
                              <CheckCircle2 className="h-4 w-4 text-[#8b1a1a] mr-2 mt-0.5 shrink-0" />
                              <span className="text-sm text-[#5a3e36]">{item}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* In Nutshell */}
                  {programs.find((p) => p.id === activeProgram)?.details.inNutshell && (
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <Sparkles className="h-5 w-5 text-[#8b1a1a] mr-2" />
                        <h4 className="font-medium text-[#8b1a1a]">In Nutshell</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {programs
                          .find((p) => p.id === activeProgram)
                          ?.details.inNutshell?.map((item, index) => (
                            <div key={index} className="bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-1 rounded-full text-sm">
                              {item}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Facilities */}
                  {programs.find((p) => p.id === activeProgram)?.details.facilities && (
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <Building2 className="h-5 w-5 text-[#8b1a1a] mr-2" />
                        <h4 className="font-medium text-[#8b1a1a]">Facilities</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {programs
                          .find((p) => p.id === activeProgram)
                          ?.details.facilities?.map((facility, index) => {
                            const FacilityIcon = getIconForFacility(facility)
                            return (
                              <div
                                key={index}
                                className="flex items-center bg-white p-3 rounded-md border border-[#d4b483]/10 hover:shadow-md transition-shadow"
                              >
                                <FacilityIcon className="h-4 w-4 text-[#8b1a1a] mr-2 shrink-0" />
                                <span className="text-sm text-[#5a3e36]">{facility}</span>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )}

                  {/* Coaching */}
                  {programs.find((p) => p.id === activeProgram)?.details.coaching && (
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <Brain className="h-5 w-5 text-[#8b1a1a] mr-2" />
                        <h4 className="font-medium text-[#8b1a1a]">Coaching</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {programs
                          .find((p) => p.id === activeProgram)
                          ?.details.coaching?.map((item, index) => (
                            <div
                              key={index}
                              className="bg-[#8b1a1a] text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                              {item}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Subjects */}
                  {programs.find((p) => p.id === activeProgram)?.details.subjects && (
                    <div className="mt-6">
                      <div className="flex items-center mb-3">
                        <BookMarked className="h-5 w-5 text-[#8b1a1a] mr-2" />
                        <h4 className="font-medium text-[#8b1a1a]">SUBJECTS AVAILABILITY</h4>
                      </div>
                      <div className="space-y-6">
                        {programs
                          .find((p) => p.id === activeProgram)
                          ?.details.subjects?.map((subject, index) => (
                            <div key={index} className="bg-[#f8f3e9] rounded-lg p-4 border border-[#d4b483]/20">
                              <h5 className="font-medium text-[#8b1a1a] mb-3 text-lg">{subject.stream}</h5>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm font-medium text-[#5a3e36] mb-2">Compulsory:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {subject.compulsory.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-1 rounded-md text-sm"
                                      >
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-[#5a3e36] mb-2">Optional:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {subject.optional.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-white text-[#5a3e36] px-3 py-1 rounded-md text-sm border border-[#d4b483]/20"
                                      >
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      {activeProgram === "chaturtha" && (
                        <div className="mt-4 p-4 bg-[#8b1a1a]/5 rounded-lg border border-[#d4b483]/20">
                          <p className="text-sm text-[#5a3e36]">
                            <span className="font-medium">Note-</span> A student has to choose minimum 5 subjects and
                            can keep Physical Education or Yoga or painting as 6th optional.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-8 flex justify-center">
                    <button
                      className="bg-[#8b1a1a] text-white px-6 py-2 rounded-md hover:bg-[#8b1a1a]/90 transition-colors"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
