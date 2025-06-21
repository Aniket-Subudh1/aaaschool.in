"use client";

import { useState,useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight, 
  BookOpen, 
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  GraduationCap,
  Microscope,
  Calculator,
  FileText,
  Brain,
  BadgeCheck,
  Target,
  ArrowRight,
  Download,
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
    eligibility: "Students in Class 11, Class 12",
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
    color: "#3b82f6",
    description: "Specialized coaching for JEE Main and Advanced to help students secure admission in premier engineering institutes like IITs, NITs, and other CFTIs.",
    eligibility: "Students in Class 11, Class 12",
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
    image: "https://aaaschool.s3.ap-south-1.amazonaws.com/lb.jpg",
    brochure: "/download/jee-brochure.pdf"
  },
  {
    id: "nda",
    name: "NDA Batch",
    icon: <Sword />,
    color: "#a855f7", 
    description: "Specialized training for National Defence Academy & Naval Academy Examination to prepare students for a career in the Armed Forces.",
    eligibility: "Students in Class 11, 12",
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
    image: "/ncc.jpg",
    brochure: "/download/nda-brochure.pdf"
  },
  {
  id: "ci",
  name: "CI Batch",
  icon: <Building />,
  color: "#ec4899", // Pink
  description: "Specialized preparation for Commerce Integrated(CI) which will facilitate students to frame their career in the field of CA, CS and CMA.",
  eligibility: "Students in Class 12",
  features: [
    "Domain-specific preparation for chosen subjects",
    "Competitive preparation",
    "University selection guidance",
    "Regular practice tests",
    "Aptitude development sessions",
    "Career counseling for course selection"
  ],
  subjects: ["Accounting", "Business Law", "Economics", "Quantitative Aptitude"],
  schedule: [
    "Weekdays: 1:40 PM - 4:10 PM",
    "Weekends: Mock tests",
    "Special batches during school vacations"
  ],
  image: "https://aaaschool.s3.ap-south-1.amazonaws.com/LIB.jpg",
  brochure: "/download/ci-brochure.pdf"
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
                  The admission process typically involves an entrance test to assess the student&apos;s current knowledge level and aptitude. This helps us place students in appropriate batches and design personalized learning plans. After the test, there will be a counseling session with the student and parents to discuss the results and course details. Based on the test performance and counseling, admission will be confirmed.
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
                  We provide comprehensive study materials that include theory books, practice workbooks, previous years&apos; question papers, mock test papers, and digital resources. Our study materials are regularly updated to reflect the latest exam patterns and syllabus changes. Additionally, students receive topic-wise assignments, performance reports, and personalized study plans.
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
                  We have a robust assessment system that includes weekly tests, monthly evaluations, and comprehensive tests after completion of each topic. The performance data is analyzed to identify strengths and weaknesses. Parents receive regular progress reports, and we conduct parent-teacher meetings to discuss the student&apos;s performance. Additionally, our mentors provide one-on-one guidance to students based on their progress reports.
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