"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Trophy,
  Star,
  ArrowRight,
  BookOpen,
  Users,
  CheckCircle,
  Sparkles,
  Target,
  Clock,
  Calendar,
  GraduationCap,
} from "lucide-react";

export default function ScholarshipsPage() {
  const [isFlashing, setIsFlashing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src="/aaa.png"
                  alt="Aryavart Ancient Academy Logo"
                  width={120}
                  height={120}
                  className="bg-white rounded-full p-3 shadow-lg"
                />
                <div className="absolute -top-2 -right-2">
                  <div className="bg-yellow-400 text-yellow-900 rounded-full p-2 shadow-lg">
                    <Trophy className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Merit-Based Scholarships
            </h1>
            
            {/* Flashing Scholarship Banner */}
            <div className={`inline-block transition-all duration-500 ${
              isFlashing ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'
            }`}>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-8 py-4 rounded-2xl shadow-2xl border-4 border-white">
                <div className="flex items-center justify-center space-x-3">
                  <Sparkles className={`h-8 w-8 ${isFlashing ? 'animate-spin' : ''}`} />
                  <span className="text-2xl md:text-4xl font-black">
                    UP TO 100% SCHOLARSHIPS
                  </span>
                  <Sparkles className={`h-8 w-8 ${isFlashing ? 'animate-spin' : ''}`} />
                </div>
                <p className="text-lg md:text-xl font-bold mt-2">
                  For Exceptional Academic Performance
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl mt-8 max-w-4xl mx-auto leading-relaxed opacity-90">
              Rewarding excellence and nurturing talent through our comprehensive scholarship program for Class 11 admissions
            </p>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4">
            Scholarship Eligibility Criteria
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Open to students from all boards and schools across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Academic Excellence Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#8b1a1a] hover:shadow-2xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-[#8b1a1a] p-3 rounded-full">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#8b1a1a] ml-4">
                Overall Academic Excellence
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    95% or more in 10th Board Examinations
                  </p>
                  <p className="text-gray-600">
                    Any board - CBSE, ICSE, State Boards, or International Boards
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Scholarship Range:</strong> 50% - 100% tuition fee waiver based on overall percentage
                </p>
              </div>
            </div>
          </div>

          {/* Mathematics Excellence Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-600 hover:shadow-2xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 ml-4">
                Mathematics Excellence
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    98% or more in Mathematics (10th Boards)
                  </p>
                  <p className="text-gray-600">
                    Exceptional mathematical aptitude recognition
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Special Recognition:</strong> Additional benefits for mathematics excellence
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Universal Eligibility Banner */}
        <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white rounded-2xl p-8 text-center shadow-xl">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-10 w-10 mr-4" />
            <h3 className="text-2xl md:text-3xl font-bold">
              Open to All Students
            </h3>
          </div>
          <p className="text-lg md:text-xl mb-4">
            Students from ANY board and ANY school across India can apply
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="font-semibold">CBSE</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="font-semibold">ICSE</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="font-semibold">State Boards</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="font-semibold">International</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4">
              Scholarship Benefits
            </h2>
            <p className="text-lg text-gray-700">
              Comprehensive support for your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Tuition Fee Waiver
              </h3>
              <p className="text-gray-600">
                Up to 100% waiver on annual tuition fees based on academic performance
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Academic Support
              </h3>
              <p className="text-gray-600">
                Priority access to advanced learning resources and mentorship programs
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-gradient-to-br from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Merit Recognition
              </h3>
              <p className="text-gray-600">
                Special recognition and awards for outstanding academic achievements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Apply Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4">
            How to Apply
          </h2>
          <p className="text-lg text-gray-700">
            Simple steps to secure your scholarship
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-[#8b1a1a] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Register for ATAT
            </h3>
            <p className="text-gray-600">
              Fill the Aryavart Ancient Academy Talent Assessment Test registration form
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#8b1a1a] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Submit Documents
            </h3>
            <p className="text-gray-600">
              Upload your 10th board mark sheet and required documents
            </p>
          </div>

          <div className="text-center">
            <div className="bg-[#8b1a1a] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Assessment & Award
            </h3>
            <p className="text-gray-600">
              Complete the assessment and receive your scholarship decision
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Apply for Your Scholarship?
          </h3>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Register for the Aryavart Ancient Academy Talent Assessment Test (ATAT) and unlock your potential
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/admission/atat"
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg flex items-center group"
            >
              <Calendar className="h-6 w-6 mr-3" />
              Register for ATAT
              <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center text-yellow-200">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-sm">Registration Open - Apply Now!</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <p className="text-sm">
              <strong>Important:</strong> Scholarship awards are based on academic merit and ATAT performance. 
              Limited seats available. Apply early to secure your spot!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-[#8b1a1a] mb-4">
            Need Help with Your Application?
          </h3>
          <p className="text-gray-700 mb-6">
            Our admission counselors are here to assist you with the scholarship application process
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a
              href="tel:+919124654094"
              className="text-[#8b1a1a] font-semibold hover:underline"
            >
              📞 +91 91246 54094
            </a>
            <a
              href="mailto:aryavartaa.krd@gmail.com"
              className="text-[#8b1a1a] font-semibold hover:underline"
            >
              ✉️ aryavartaa.krd@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}