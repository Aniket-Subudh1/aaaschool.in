"use client";

import { motion } from "framer-motion";
import { User, Users, BookOpen, Briefcase } from "lucide-react";

export default function StaffInfoSection() {
  const staffInfo = [
    {
      label: "Principal",
      value: "Dr. Diptimayee Mohanty",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Total No. of Teachers",
      value: "49",
      icon: <Users className="w-5 h-5" />,
    },
    { label: "PGT", value: "20", icon: <BookOpen className="w-5 h-5" /> },
    { label: "TGT", value: "16", icon: <BookOpen className="w-5 h-5" /> },
    { label: "PRT", value: "4", icon: <BookOpen className="w-5 h-5" /> },
    {
      label: "Teachers Section Ratio",
      value: "1:1.5",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Details of Special Educator",
      value:
        "Subhashree Paschimakabat, MA, B.Ed., Special Education (mental retired)",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      label: "Details of Counsellor and Wellness Teacher",
      value: "M.Phil (clinical Counselling), MA, B.Ed.",
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] p-6">
        <h2 className="text-2xl font-bold text-white">Staff Information</h2>
        <p className="text-[#f8f3e9]/80 mt-2">
          Details about our teaching and support staff
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {staffInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-[#8b1a1a]/20 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-[#8b1a1a]">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-slate-500 text-sm font-medium mb-1">
                    {item.label}
                  </h3>
                  <p className="text-slate-900 font-medium">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 p-6 bg-gradient-to-r from-[#f0e6d2] to-[#f8f3e9] rounded-xl border border-[#8b1a1a]/20"
        >
          <h3 className="text-[#8b1a1a] font-medium mb-2 flex items-center">
            <Users className="w-5 h-5 mr-2" /> Staff Highlights
          </h3>
          <p className="text-slate-700">
            Our dedicated teaching staff is committed to providing quality
            education and nurturing the potential in every student. With a
            balanced teacher-to-student ratio, we ensure personalized attention
            and guidance.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
