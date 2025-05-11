"use client";

import { useState,useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight, 
  BookOpen, 
  Award,
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  GraduationCap,
  Microscope,
  Calculator,
  BarChart,
  FileText,
  Brain,
  Lightbulb,
  BadgeCheck,
  Target,
  ArrowRight,
  Download,
  Medal,
  Sword,
  Building,
  ChevronDown
} from "lucide-react";

const batches = [
  {
    id: "neet",
    name: "NEET Batch",
    icon: <Microscope />,
    color: "#22c55e",
    description: "Comprehensive preparation for the National Eligibility cum Entrance Test (NEET) for medical aspirants.",
    eligibility: "Students in Class 11, Class 12, and Droppers",
    features: [
      "Specialized faculty with medical background",
      "Regular mock tests based on NEET pattern",
      "Complete coverage of NCERT & beyond",
      "Biology practical sessions with expert guidance",
      "Medical college counseling support",
      "Personalized mentoring for toppers",
      "Doubt clearing sessions daily"
    ],
    subjects: ["Physics", "Chemistry", "Biology"],
    schedule: [
      "Weekdays: 4:00 PM - 6:30 PM (Class 11 & 12)",
      "Weekends: 9:00 AM - 4:00 PM (Intensive sessions for Droppers)",
      "Special batches during school vacations"
    ],
    achievements: [
      "85% students qualified NEET in 2024 batch",
      "35% students secured ranks under 50,000",
      "15% students secured ranks under 10,000",
      "Multiple selections in top medical colleges"
    ],
    testimonials: [
      {
        name: "Pratyusha Mishra",
        rank: "AIR 4,382",
        year: "2024",
        quote: "The faculty's dedication and structured approach helped me achieve my dream of getting into a medical college.",
        college: "SCB Medical College, Cuttack"
      },
      {
        name: "Samarth Patel",
        rank: "AIR 12,567",
        year: "2023",
        quote: "The integrated approach at AAA helped me balance my board exams and NEET preparation effectively.",
        college: "MKCG Medical College, Berhampur"
      }
    ],
    stats: {
      success: 85,
      satisfaction: 92,
      topRanks: 15
    },
    image: "/il.jpg",
    brochure: "/download/neet-brochure.pdf"
  },
  {
    id: "jee",
    name: "JEE Batch",
    icon: <Calculator />,
    color: "#3b82f6", // Blue
    description: "Specialized coaching for JEE Main and Advanced to help students secure admission in premier engineering institutes like IITs, NITs, and other CFTIs.",
    eligibility: "Students in Class 11, Class 12, and Droppers",
    features: [
      "Expert faculty from IITs and NITs",
      "Concept-based learning approach",
      "Regular mock tests with detailed analysis",
      "Advanced problem-solving techniques",
      "Special sessions on time management",
      "IIT foundation for early starters",
      "Study material designed by IIT alumni"
    ],
    subjects: ["Physics", "Chemistry", "Mathematics"],
    schedule: [
      "Weekdays: 4:00 PM - 6:30 PM (Class 11 & 12)",
      "Weekends: 9:00 AM - 4:00 PM (Advanced problem-solving)",
      "Evening doubt clearing sessions"
    ],
    achievements: [
      "75% students qualified JEE Main in 2024",
      "42 students qualified for JEE Advanced",
      "15 students secured admission in IITs",
      "27 students secured admission in NITs"
    ],
    testimonials: [
      {
        name: "Rishab Mohapatra",
        rank: "AIR 3,245 (JEE Advanced)",
        year: "2024",
        quote: "The problem-solving techniques and rigorous practice sessions at AAA helped me crack JEE Advanced.",
        college: "IIT Kharagpur"
      },
      {
        name: "Ananya Sahoo",
        rank: "AIR 1,324 (JEE Main)",
        year: "2023",
        quote: "The faculty's approach to Mathematics made the subject enjoyable and easy to understand.",
        college: "NIT Rourkela"
      }
    ],
    stats: {
      success: 75,
      satisfaction: 90,
      topRanks: 12
    },
    image: "/sp.jpg",
    brochure: "/download/jee-brochure.pdf"
  },
  {
    id: "booster",
    name: "BOOSTER Batch",
    icon: <Lightbulb />,
    color: "#eab308",
    description: "Accelerated learning program to boost academic performance for board exams while preparing for competitive exams.",
    eligibility: "Students in Class 9, 10, 11, and 12",
    features: [
      "Subject-wise performance enhancement",
      "Focus on board exam pattern and marking scheme",
      "Weekly tests and assessments",
      "Personalized attention with smaller batch sizes",
      "Special focus on weak areas",
      "Advanced learning techniques",
      "Regular parent-teacher meetings"
    ],
    subjects: ["All core subjects with emphasis on Science and Mathematics"],
    schedule: [
      "Weekdays: 3:30 PM - 5:30 PM",
      "Weekends: Special doubt clearing sessions",
      "Vacation batches during school breaks"
    ],
    achievements: [
      "95% students scored above 90% in board exams",
      "Top scorer achieved 98.6% in CBSE Class 12",
      "Significant improvement in all subject areas",
      "Multiple school toppers from our batches"
    ],
    testimonials: [
      {
        name: "Priya Sharma",
        marks: "96.4% in CBSE Class 12",
        year: "2024",
        quote: "The Booster Batch transformed my academic performance. The structured study plan and regular assessments were very helpful."
      },
      {
        name: "Arnav Patnaik",
        marks: "95.2% in CBSE Class 10",
        year: "2023",
        quote: "I joined the Booster Batch in Class 9, and it helped me develop strong fundamentals for higher classes."
      }
    ],
    stats: {
      success: 95,
      satisfaction: 96,
      topRanks: 25
    },
    image: "/tr.jpg",
    brochure: "/download/booster-brochure.pdf"
  },
  {
    id: "nda",
    name: "NDA Batch",
    icon: <Sword />,
    color: "#a855f7", // Purple
    description: "Specialized training for National Defence Academy & Naval Academy Examination to prepare students for a career in the Armed Forces.",
    eligibility: "Students in Class 11, 12 and Droppers",
    features: [
      "Comprehensive coverage of Mathematics and GAT",
      "Physical fitness training",
      "SSB interview preparation",
      "Regular mock tests based on NDA pattern",
      "Special sessions on current affairs",
      "Personality development workshops",
      "Guest lectures by defense personnel"
    ],
    subjects: ["Mathematics", "General Ability Test (English, Science, History, Geography, Current Affairs)"],
    schedule: [
      "Weekdays: 4:00 PM - 6:00 PM (Academic preparation)",
      "Weekends: 6:00 AM - 8:00 AM (Physical training)",
      "Special SSB preparation on holidays"
    ],
    achievements: [
      "32 students cleared NDA written exam in last 3 years",
      "18 students cleared SSB and joined NDA",
      "5 students selected for Naval Academy",
      "Consistently producing defense officers"
    ],
    testimonials: [
      {
        name: "Vikram Singh",
        batch: "NDA 145 Course",
        year: "2023",
        quote: "The NDA Batch not only prepared me for the exam but also instilled discipline and dedication required for defense services.",
        academy: "National Defence Academy, Khadakwasla"
      },
      {
        name: "Rahul Kumar",
        batch: "NDA 144 Course",
        year: "2022",
        quote: "The balanced approach to academics and physical training at AAA was instrumental in my success.",
        academy: "Naval Academy, Ezhimala"
      }
    ],
    stats: {
      success: 65,
      satisfaction: 94,
      selections: 18
    },
    image: "/sc.jpg",
    brochure: "/download/nda-brochure.pdf"
  },
  {
    id: "cuet",
    name: "CUET Batch",
    icon: <Building />,
    color: "#ec4899", // Pink
    description: "Specialized preparation for Common University Entrance Test (CUET) to secure admission in Central Universities across India.",
    eligibility: "Students in Class 12 and Droppers",
    features: [
      "Domain-specific preparation for chosen subjects",
      "General Test preparation",
      "Language Test coaching",
      "University selection guidance",
      "Regular practice tests",
      "Aptitude development sessions",
      "Career counseling for course selection"
    ],
    subjects: ["Domain-specific subjects", "General Test", "Language Test"],
    schedule: [
      "Weekdays: 4:00 PM - 6:00 PM",
      "Weekends: 10:00 AM - 1:00 PM (Mock tests)",
      "Special batches during school vacations"
    ],
    achievements: [
      "92% students got admission in their preferred universities",
      "45 students secured admission in Delhi University",
      "25 students secured admission in BHU, JNU, and other central universities",
      "Highest CUET score: 798/800"
    ],
    testimonials: [
      {
        name: "Kritika Gupta",
        score: "789/800 in CUET",
        year: "2024",
        quote: "The targeted preparation helped me secure admission in my dream course at Delhi University.",
        university: "Delhi University"
      },
      {
        name: "Rohit Tripathy",
        score: "765/800 in CUET",
        year: "2023",
        quote: "The mock tests and strategic guidance for university selection were extremely beneficial.",
        university: "Banaras Hindu University"
      }
    ],
    stats: {
      success: 92,
      satisfaction: 91,
      topScores: 32
    },
    image: "/cul.jpg",
    brochure: "/download/cuet-brochure.pdf"
  }
];

const IntegratedClassesPage = () => {
  const [activeBatch, setActiveBatch] = useState("neet");
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeBatchData = batches.find(batch => batch.id === activeBatch);

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
            <span>Integrated Classes</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3">Integrated Coaching Classes</h1>
          <p className="text-lg max-w-3xl opacity-90 mb-6">
            Excellence in entrance examination preparation alongside school education. Our integrated coaching programs are designed to help students excel in both board exams and competitive entrance tests.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              <GraduationCap size={14} className="mr-1.5" />
              Expert Faculty
            </div>
            <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              <BookOpen size={14} className="mr-1.5" />
              Proven Track Record
            </div>
            <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              <Users size={14} className="mr-1.5" />
              Personalized Attention
            </div>
          </div>

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

      {/* Batch Navigation Tabs */}
      <div ref={contentRef} className="bg-white shadow-md py-1 sticky top-0 z-30 border-b border-[#d4b483]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            {batches.map((batch) => (
              <button
                key={batch.id}
                onClick={() => setActiveBatch(batch.id)}
                className={`relative py-4 px-6 text-center transition-all duration-300 ${
                  activeBatch === batch.id
                    ? "bg-[#8b1a1a] text-white"
                    : "hover:bg-[#f8f3e9]"
                }`}
              >
                <div className="font-medium">{batch.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBatch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeBatchData && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Image and Quick Stats */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden mb-6">
                    <div className="relative aspect-video">
                      <Image
                        src={activeBatchData.image}
                        alt={activeBatchData.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div 
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2"
                          style={{ backgroundColor: activeBatchData.color }}
                        >
                          {activeBatchData.icon}
                          <span className="ml-2">Excellence Program</span>
                        </div>
                        <h2 className="text-2xl font-bold">{activeBatchData.name}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden mb-6">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#8b1a1a] mb-4 flex items-center">
                        <BarChart size={18} className="mr-2" />
                        Success Metrics
                      </h3>
                      
                      <div className="space-y-4">
                        {activeBatchData.stats.success && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Success Rate</span>
                              <span className="text-sm font-medium text-[#8b1a1a]">{activeBatchData.stats.success}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="h-2.5 rounded-full" 
                                style={{ 
                                  width: `${activeBatchData.stats.success}%`,
                                  backgroundColor: activeBatchData.color
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {activeBatchData.stats.satisfaction && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Student Satisfaction</span>
                              <span className="text-sm font-medium text-[#8b1a1a]">{activeBatchData.stats.satisfaction}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="h-2.5 rounded-full" 
                                style={{ 
                                  width: `${activeBatchData.stats.satisfaction}%`,
                                  backgroundColor: activeBatchData.color
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {activeBatchData.stats.topRanks && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Top Ranks/Scores %</span>
                              <span className="text-sm font-medium text-[#8b1a1a]">{activeBatchData.stats.topRanks}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="h-2.5 rounded-full" 
                                style={{ 
                                  width: `${activeBatchData.stats.topRanks}%`,
                                  backgroundColor: activeBatchData.color
                                }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {activeBatchData.stats.selections && (
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">Final Selections</span>
                              <span className="text-sm font-medium text-[#8b1a1a]">{activeBatchData.stats.selections} students</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="h-2.5 rounded-full" 
                                style={{ 
                                  width: `${activeBatchData.stats.selections * 2}%`,
                                  backgroundColor: activeBatchData.color
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Brochure Download */}
                  <div className="bg-gradient-to-br from-[#8b1a1a] to-[#c0392b] rounded-xl shadow-md overflow-hidden text-white">
                    <div className="p-5">
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <FileText size={18} className="mr-2" />
                        Detailed Information
                      </h3>
                      <p className="text-sm mb-4 opacity-90">
                        Download our detailed program brochure to learn more about the curriculum, faculty, fees, and admission process.
                      </p>
                      <a 
                        href={activeBatchData.brochure} 
                        className="inline-flex items-center px-4 py-2 bg-white text-[#8b1a1a] rounded-md font-medium hover:bg-[#f0e6d2] transition-colors"
                      >
                        <Download size={16} className="mr-2" />
                        Download Brochure
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column - Course Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About the Program */}
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <BookOpen className="mr-2 h-6 w-6" />
                        About the Program
                      </h3>
                      <p className="text-[#5a3e36] mb-4">{activeBatchData.description}</p>
                      
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                          <Target size={16} className="mr-2" />
                          Eligibility
                        </h4>
                        <p className="text-[#5a3e36] bg-[#f8f3e9] p-3 rounded-lg inline-block">
                          {activeBatchData.eligibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <Star className="mr-2 h-6 w-6" />
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeBatchData.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle2 className="h-5 w-5 text-[#8b1a1a] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-[#5a3e36]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subjects Covered */}
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <BookOpen className="mr-2 h-6 w-6" />
                        Subjects Covered
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {Array.isArray(activeBatchData.subjects) ? (
                          activeBatchData.subjects.map((subject, index) => (
                            <div 
                              key={index} 
                              className="px-4 py-2 rounded-full font-medium text-sm"
                              style={{ 
                                backgroundColor: `${activeBatchData.color}20`,
                                color: activeBatchData.color
                              }}
                            >
                              {subject}
                            </div>
                          ))
                        ) : (
                          <div 
                            className="px-4 py-2 rounded-full font-medium text-sm"
                            style={{ 
                              backgroundColor: `${activeBatchData.color}20`,
                              color: activeBatchData.color
                            }}
                          >
                            {activeBatchData.subjects}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Schedule */}
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <Clock className="mr-2 h-6 w-6" />
                        Class Schedule
                      </h3>
                      <div className="space-y-3">
                        {activeBatchData.schedule.map((timing, index) => (
                          <div key={index} className="flex items-start">
                            <Calendar className="h-5 w-5 text-[#8b1a1a] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-[#5a3e36]">{timing}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                        <Award className="mr-2 h-6 w-6" />
                        Our Achievements
                      </h3>
                      <div className="space-y-3">
                        {activeBatchData.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start">
                            <Medal className="h-5 w-5 text-[#8b1a1a] mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-[#5a3e36]">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Student Testimonials */}
                  {activeBatchData.testimonials && activeBatchData.testimonials.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-[#8b1a1a] mb-4 flex items-center">
                          <Users className="mr-2 h-6 w-6" />
                          Student Testimonials
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {activeBatchData.testimonials.map((testimonial, index) => (
                            <div key={index} className="relative bg-[#f8f3e9] p-5 rounded-lg">
                              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-[#8b1a1a]/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M4.583 17.321c-1.167-1.458-1.75-3.396-1.75-5.875 0-3.5 1.75-6.5 5.25-8.75l1.75 3.5c-2.333 1.167-3.5 2.917-3.5 5.25 0.083 1.167 0.583 1.75 1.5 1.75 1.583 0 2.583 1.167 2.583 2.917 0 1.833-1.333 3.208-3 3.208-1.25 0-2.25-0.583-2.833-2z"></path>
                                  <path d="M15.167 17.321c-1.167-1.458-1.75-3.396-1.75-5.875 0-3.5 1.75-6.5 5.25-8.75l1.75 3.5c-2.333 1.167-3.5 2.917-3.5 5.25 0.083 1.167 0.583 1.75 1.5 1.75 1.583 0 2.583 1.167 2.583 2.917 0 1.833-1.333 3.208-3 3.208-1.25 0-2.25-0.583-2.833-2z"></path>
                                </svg>
                              </div>
                              <div>
                                <p className="text-[#5a3e36] italic mb-4">"{testimonial.quote}"</p>
                                <div className="font-medium">{testimonial.name}</div>
                                {testimonial.rank && (
                                  <div className="text-sm text-[#8b1a1a]">{testimonial.rank}</div>
                                )}
                                {testimonial.marks && (
                                  <div className="text-sm text-[#8b1a1a]">{testimonial.marks}</div>
                                )}
                                {testimonial.score && (
                                  <div className="text-sm text-[#8b1a1a]">{testimonial.score}</div>
                                )}
                                {testimonial.batch && (
                                  <div className="text-sm text-[#8b1a1a]">{testimonial.batch}</div>
                                )}
                                <div className="text-xs text-gray-500 mt-1">
                                  Batch of {testimonial.year}
                                  {testimonial.college && ` • ${testimonial.college}`}
                                  {testimonial.university && ` • ${testimonial.university}`}
                                  {testimonial.academy && ` • ${testimonial.academy}`}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] rounded-xl shadow-lg overflow-hidden text-white">
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl font-bold mb-2">Begin Your Journey to Success</h3>
                      <p className="opacity-90 mb-6">
                        Join our {activeBatchData.name} to receive expert guidance and comprehensive preparation for your future goals.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href="/admission"
                          className="bg-white text-[#8b1a1a] px-6 py-3 rounded-md hover:bg-[#f0e6d2] transition-colors flex items-center font-medium"
                        >
                          Apply Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                        <a
                          href="/contact"
                          className="bg-transparent border border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors flex items-center font-medium"
                        >
                          Contact Us
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Why Choose Our Integrated Programs */}
      <div className="bg-[#f8f3e9] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#8b1a1a] mb-8 text-center">Why Choose Our Integrated Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#8b1a1a]/10 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5 text-[#8b1a1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">Balanced Approach</h3>
              <p className="text-[#5a3e36]">
                Our programs ensure a perfect balance between school curriculum and competitive exam preparation.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#8b1a1a]/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-5 w-5 text-[#8b1a1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">Expert Faculty</h3>
              <p className="text-[#5a3e36]">
                Learn from experienced educators with proven track records in producing top results.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#8b1a1a]/10 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-5 w-5 text-[#8b1a1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">Strategic Learning</h3>
              <p className="text-[#5a3e36]">
                Customized strategies and study plans designed to maximize performance with efficient time management.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#8b1a1a]/10 rounded-full flex items-center justify-center mb-4">
                <BadgeCheck className="h-5 w-5 text-[#8b1a1a]" />
              </div>
              <h3 className="text-lg font-bold text-[#8b1a1a] mb-2">Proven Results</h3>
              <p className="text-[#5a3e36]">
                Consistent record of producing top performers in various competitive examinations and board results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#8b1a1a] mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
            <button 
              className="w-full text-left p-5 font-medium text-[#8b1a1a] flex justify-between items-center"
              onClick={() => setShowDetails(showDetails === 'faq1' ? null : 'faq1')}
            >
              <span>How are integrated classes different from regular coaching?</span>
              <ChevronDown 
                className={`transition-transform ${showDetails === 'faq1' ? 'rotate-180' : ''}`}
              />
            </button>
            {showDetails === 'faq1' && (
              <div className="p-5 pt-0 border-t border-[#d4b483]/20">
                <p className="text-[#5a3e36]">
                  Integrated classes are designed to complement school education by focusing on both board exams and competitive entrance exams. Unlike regular coaching centers, our integrated classes are synchronized with the school curriculum, allowing students to maintain a balance between school studies and competitive exam preparation. This reduces the burden of attending multiple coaching centers and ensures a comprehensive learning experience.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
            <button 
              className="w-full text-left p-5 font-medium text-[#8b1a1a] flex justify-between items-center"
              onClick={() => setShowDetails(showDetails === 'faq2' ? null : 'faq2')}
            >
              <span>What is the admission process for these courses?</span>
              <ChevronDown 
                className={`transition-transform ${showDetails === 'faq2' ? 'rotate-180' : ''}`}
              />
            </button>
            {showDetails === 'faq2' && (
              <div className="p-5 pt-0 border-t border-[#d4b483]/20">
                <p className="text-[#5a3e36]">
                  The admission process typically involves an entrance test to assess the student's current knowledge level and aptitude. This helps us place students in appropriate batches and design personalized learning plans. After the test, there will be a counseling session with the student and parents to discuss the results and course details. Based on the test performance and counseling, admission will be confirmed.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
            <button 
              className="w-full text-left p-5 font-medium text-[#8b1a1a] flex justify-between items-center"
              onClick={() => setShowDetails(showDetails === 'faq3' ? null : 'faq3')}
            >
              <span>Can a student join mid-session?</span>
              <ChevronDown 
                className={`transition-transform ${showDetails === 'faq3' ? 'rotate-180' : ''}`}
              />
            </button>
            {showDetails === 'faq3' && (
              <div className="p-5 pt-0 border-t border-[#d4b483]/20">
                <p className="text-[#5a3e36]">
                  Yes, students can join mid-session. We have special bridge courses and additional sessions to help students catch up with the ongoing batch. Our faculty provides personal attention to ensure that the student is brought up to speed with the rest of the class. However, we recommend joining at the beginning of the session for maximum benefit.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
            <button 
              className="w-full text-left p-5 font-medium text-[#8b1a1a] flex justify-between items-center"
              onClick={() => setShowDetails(showDetails === 'faq4' ? null : 'faq4')}
            >
              <span>What study materials are provided?</span>
              <ChevronDown 
                className={`transition-transform ${showDetails === 'faq4' ? 'rotate-180' : ''}`}
              />
            </button>
            {showDetails === 'faq4' && (
              <div className="p-5 pt-0 border-t border-[#d4b483]/20">
                <p className="text-[#5a3e36]">
                  We provide comprehensive study materials that include theory books, practice workbooks, previous years' question papers, mock test papers, and digital resources. Our study materials are regularly updated to reflect the latest exam patterns and syllabus changes. Additionally, students receive topic-wise assignments, performance reports, and personalized study plans.
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-[#d4b483]/20 overflow-hidden">
            <button 
              className="w-full text-left p-5 font-medium text-[#8b1a1a] flex justify-between items-center"
              onClick={() => setShowDetails(showDetails === 'faq5' ? null : 'faq5')}
            >
              <span>How do you monitor student progress?</span>
              <ChevronDown 
                className={`transition-transform ${showDetails === 'faq5' ? 'rotate-180' : ''}`}
              />
            </button>
            {showDetails === 'faq5' && (
              <div className="p-5 pt-0 border-t border-[#d4b483]/20">
                <p className="text-[#5a3e36]">
                  We have a robust assessment system that includes weekly tests, monthly evaluations, and comprehensive tests after completion of each topic. The performance data is analyzed to identify strengths and weaknesses. Parents receive regular progress reports, and we conduct parent-teacher meetings to discuss the student's performance. Additionally, our mentors provide one-on-one guidance to students based on their progress reports.
                </p>
              </div>
            )}
          </div>
        </div>
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

export default IntegratedClassesPage;