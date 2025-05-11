"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  BookOpen,
  Users,
  Brain,
  GraduationCap,
  ChevronRight,
  ChevronDown,
  Clock,
  Calendar,
  CheckCircle2,
  X,
  Sparkles,
  Heart,
  Palette,
  Music,
  Dumbbell,
  Leaf,
  BookMarked,
  Building2,
  Microscope,
  Calculator,
  Globe,
  Computer,
  Award,
  MessageCircle,
  Droplets,
  ShieldCheck,
  Home,
  TrainTrack,
  School,
  MapPin,
  Lightbulb
} from "lucide-react";

const CurriculumPage = () => {
  const [activeLevel, setActiveLevel] = useState("elementary");
  const [showDetails, setShowDetails] = useState(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const levels = [
    {
      id: "elementary",
      title: "Pratham Sopan",
      subtitle: "Elementary School",
      icon: <BookOpen />,
      color: "#8b1a1a",
      image: "/il.jpg",
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
        facilities: ["Toy Train"]
      }
    },
    {
      id: "junior",
      title: "Dwitiya Sopan",
      subtitle: "Junior School",
      icon: <Users />,
      color: "#a52a2a",
      image: "/dw.jpeg",
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
          "Safe Environment"
        ]
      }
    },
    {
      id: "middle",
      title: "Tritya Sopan",
      subtitle: "Middle School",
      icon: <Brain />,
      color: "#b33939",
      image: "/tr.jpg",
      details: {
        timings: ["10:00am – 4:00pm: General Class", "4:00 pm – 5:00pm: Special Class"],
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
          "Safe Environment"
        ]
      }
    },
    {
      id: "secondary",
      title: "Chaturtha Sopan",
      subtitle: "Secondary School",
      icon: <GraduationCap />,
      color: "#c0392b",
      image: "/lb.jpg",
      details: {
        subjects: [
          {
            stream: "Science",
            compulsory: ["English", "Physics", "Chemistry"],
            optional: ["Mathematics", "Biology", "Computer Science", "Physical Education", "Yoga and Painting"]
          },
          {
            stream: "Commerce",
            compulsory: ["English", "Accountancy", "Economics", "BST"],
            optional: ["Entrepreneurship", "Math", "Physical Education", "Yoga and Painting"]
          },
          {
            stream: "Humanities",
            compulsory: ["English", "Psychology", "Economics", "Education"],
            optional: ["Pol. Sc.", "Geography", "History", "Math", "Physical Education", "Sociology"]
          }
        ],
        note: "A student has to choose minimum 5 subjects and can keep Physical Education or Yoga or painting as 6th optional."
      }
    }
  ];

  // Function to get appropriate icon for facility
  const getFacilityIcon = (facility) => {
    const facilityMap = {
      'Learning': <Lightbulb size={16} />,
      'Linguistic': <MessageCircle size={16} />,
      'Logical': <Calculator size={16} />,
      'JRC': <Heart size={16} />,
      'Vedic': <BookMarked size={16} />,
      'Taekwondo': <Dumbbell size={16} />,
      'Indoor': <Building2 size={16} />,
      'Outdoor': <Leaf size={16} />,
      'Chess': <Brain size={16} />,
      'Computer': <Computer size={16} />,
      'Language': <Globe size={16} />,
      'Lab': <Microscope size={16} />,
      'Science': <Microscope size={16} />,
      'Counselling': <Heart size={16} />,
      'Yoga': <Sparkles size={16} />,
      'Library': <BookOpen size={16} />,
      'Active': <Sparkles size={16} />,
      'Water': <Droplets size={16} />,
      'Toilet': <Home size={16} />,
      'Safe': <ShieldCheck size={16} />,
      'Environment': <Leaf size={16} />,
      'Coaching': <Award size={16} />,
      'Toy Train': <TrainTrack size={16} />,
      'Day Boarding': <Building2 size={16} />,
      'Smart': <Computer size={16} />,
      'Basket': <Dumbbell size={16} />,
      'Music': <Music size={16} />,
      'Dance': <Music size={16} />,
      'Residential': <Building2 size={16} />,
      'NCC': <Award size={16} />,
      'Scout': <MapPin size={16} />,
      'Guide': <MapPin size={16} />,
      'Coding': <Computer size={16} />,
      'Math': <Calculator size={16} />,
      'Social': <Globe size={16} />,
      'Physics': <Microscope size={16} />,
      'Chemistry': <Microscope size={16} />,
      'Biology': <Microscope size={16} />,
      'Canteen': <Home size={16} />,
      'Exposure': <MapPin size={16} />,
      'Education': <School size={16} />,
      'CWSN': <Heart size={16} />
    };

    // Search for keywords in the facility name
    for (const [key, icon] of Object.entries(facilityMap)) {
      if (facility.includes(key)) {
        return icon;
      }
    }

    // Default icon if no match found
    return <CheckCircle2 size={16} />;
  };

  const activeSchoolLevel = levels.find(level => level.id === activeLevel) || levels[0];

  return (
    <div className="min-h-screen bg-[#f8f3e9]/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${200 + i * 50}px`,
                height: `${200 + i * 50}px`,
                top: `${10 + i * 20}%`,
                left: `${5 + i * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animation: "float 15s infinite ease-in-out",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center text-sm mb-4 text-white/80">
            <a href="/ " className="hover:text-white transition-colors">
              Home
            </a>
            <ChevronRight size={14} className="mx-1" />
            <a href="/academics" className="hover:text-white transition-colors">
              Academics
            </a>
            <ChevronRight size={14} className="mx-1" />
            <span>Curriculum</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Curriculum</h1>
          <p className="text-lg max-w-3xl opacity-90">
            Discover our comprehensive academic programs blending traditional wisdom with modern education, designed to nurture the intellectual and personal growth of each student.
          </p>

          <div className="mt-8">
            <button 
              onClick={scrollToContent}
              className="bg-white text-[#8b1a1a] px-6 py-3 rounded-full flex items-center font-medium hover:bg-[#f0e6d2] transition-colors shadow-lg group"
            >
              <span>Explore Our Programs</span>
              <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* School Level Navigation */}
      <div ref={contentRef} className="bg-white shadow-sm py-8 sticky top-0 z-20 border-b border-[#d4b483]/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`relative flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeLevel === level.id
                    ? "bg-[#8b1a1a]/10 scale-105"
                    : "hover:bg-[#f8f3e9]"
                }`}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    activeLevel === level.id
                      ? `bg-[${level.color}] text-white`
                      : "bg-[#f8f3e9] text-[#8b1a1a]"
                  }`}
                  style={{ 
                    backgroundColor: activeLevel === level.id ? level.color : '#f8f3e9',
                    color: activeLevel === level.id ? 'white' : '#8b1a1a'
                  }}
                >
                  {level.icon}
                </div>
                <div className="text-center">
                  <h3 className={`font-medium text-sm ${
                    activeLevel === level.id
                      ? "text-[#8b1a1a]"
                      : "text-gray-700"
                  }`}>
                    {level.title}
                  </h3>
                  <p className="text-xs text-gray-500">{level.subtitle}</p>
                </div>
                {activeLevel === level.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#8b1a1a] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Side - Image and Title */}
              <div className="lg:col-span-2">
                <div className="sticky top-32">
                  <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-[#d4b483]/20 h-auto aspect-[4/3]">
                    <Image
                      src={activeSchoolLevel.image}
                      alt={activeSchoolLevel.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">{activeSchoolLevel.title}</h2>
                      <p className="text-lg opacity-90">{activeSchoolLevel.subtitle}</p>
                    </div>
                  </div>

                  {/* Quick Facts Section */}
                  <div className="mt-6 bg-white rounded-xl shadow-md border border-[#d4b483]/20 p-5">
                    <h3 className="text-lg font-semibold text-[#8b1a1a] mb-3 flex items-center">
                      <Sparkles size={18} className="mr-2" />
                      Quick Facts
                    </h3>
                    <div className="space-y-4">
                      {activeSchoolLevel.details.ageGroup && (
                        <div className="flex items-start">
                          <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                            <Calendar size={18} className="text-[#8b1a1a]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">Age Group</h4>
                            <ul className="mt-1 space-y-1">
                              {activeSchoolLevel.details.ageGroup.map((age, index) => (
                                <li key={index} className="text-sm text-gray-600">{age}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeSchoolLevel.details.timings && (
                        <div className="flex items-start">
                          <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                            <Clock size={18} className="text-[#8b1a1a]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">School Timings</h4>
                            <ul className="mt-1 space-y-1">
                              {activeSchoolLevel.details.timings.map((timing, index) => (
                                <li key={index} className="text-sm text-gray-600">{timing}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="lg:col-span-3 space-y-6">
                {/* Primary Areas */}
                {activeSchoolLevel.details.primaryAreas && (
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <Brain className="mr-2 h-6 w-6" />
                        Primary Areas of Focus
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeSchoolLevel.details.primaryAreas.map((area, index) => (
                          <div key={index} className="bg-[#f8f3e9] p-4 rounded-lg text-center">
                            <div className="bg-white h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                              {index === 0 && <MessageCircle className="h-6 w-6 text-[#8b1a1a]" />}
                              {index === 1 && <Dumbbell className="h-6 w-6 text-[#8b1a1a]" />}
                              {index === 2 && <Heart className="h-6 w-6 text-[#8b1a1a]" />}
                            </div>
                            <p className="font-medium text-[#5a3e36]">{area}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Academics */}
                {activeSchoolLevel.details.academics && (
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <BookOpen className="mr-2 h-6 w-6" />
                        Academics
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {activeSchoolLevel.details.academics.map((subject, index) => (
                          <div key={index} className="flex items-center bg-[#f8f3e9] p-3 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-[#8b1a1a] mr-2 flex-shrink-0" />
                            <span className="text-[#5a3e36]">{subject}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* In Nutshell */}
                {activeSchoolLevel.details.inNutshell && (
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <Sparkles className="mr-2 h-6 w-6" />
                        In Nutshell
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {activeSchoolLevel.details.inNutshell.map((item, index) => (
                          <div key={index} className="bg-[#8b1a1a]/10 text-[#8b1a1a] px-4 py-2 rounded-full font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Coaching */}
                {activeSchoolLevel.details.coaching && (
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <Award className="mr-2 h-6 w-6" />
                        Coaching
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {activeSchoolLevel.details.coaching.map((item, index) => (
                          <div key={index} className="bg-[#8b1a1a] text-white px-4 py-2 rounded-lg font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Subject Streams */}
                {activeSchoolLevel.details.subjects && (
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <BookMarked className="mr-2 h-6 w-6" />
                        Subject Streams
                      </h3>
                      
                      <div className="space-y-6">
                        {activeSchoolLevel.details.subjects.map((subject, idx) => (
                          <div 
                            key={idx} 
                            className={`rounded-lg border ${
                              idx === 0 ? 'border-blue-200 bg-blue-50' : 
                              idx === 1 ? 'border-amber-200 bg-amber-50' : 
                              'border-emerald-200 bg-emerald-50'
                            } p-4`}
                          >
                            <h4 className="font-bold text-[#8b1a1a] mb-3">{subject.stream}</h4>
                            
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 flex items-center">
                                  <CheckCircle2 size={16} className="mr-1" /> 
                                  Compulsory Subjects
                                </h5>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {subject.compulsory.map((sub, i) => (
                                    <span key={i} className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200 shadow-sm">
                                      {sub}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 flex items-center">
                                  <CheckCircle2 size={16} className="mr-1" /> 
                                  Optional Subjects
                                </h5>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {subject.optional.map((sub, i) => (
                                    <span key={i} className="bg-white/60 px-3 py-1 rounded-full text-sm border border-gray-200">
                                      {sub}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {activeSchoolLevel.details.note && (
                        <div className="mt-4 p-4 bg-[#8b1a1a]/5 rounded-lg border border-[#d4b483]/20">
                          <p className="text-sm flex items-start">
                            <span className="font-medium flex-shrink-0 mr-1">Note:</span>
                            <span>{activeSchoolLevel.details.note}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Facilities */}
                {activeSchoolLevel.details.facilities && (
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <Building2 className="mr-2 h-6 w-6" />
                        Facilities
                      </h3>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {activeSchoolLevel.details.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center bg-[#f8f3e9] p-3 rounded-lg hover:bg-[#f8f3e9]/70 transition-colors">
                            <div className="mr-2 text-[#8b1a1a]">
                              {getFacilityIcon(facility)}
                            </div>
                            <span className="text-[#5a3e36] text-sm">{facility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Call to Action */}
                <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] rounded-xl shadow-lg overflow-hidden text-white">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-2">Apply for Admission</h3>
                    <p className="opacity-90 mb-6">
                      Join one of the best CBSE Day-cum Residential School in Khordha, Odisha and ensure a great education with rich extracurricular activities for your child.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href="/admission"
                        className="bg-white text-[#8b1a1a] px-6 py-3 rounded-md hover:bg-[#f0e6d2] transition-colors flex items-center font-medium"
                      >
                        Apply Now
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </a>
                      <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors flex items-center font-medium"
                      >
                        Watch Video
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(15px, 15px) rotate(3deg);
          }
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CurriculumPage;