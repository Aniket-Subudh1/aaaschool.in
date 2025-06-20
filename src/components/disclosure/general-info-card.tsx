"use client";

import { motion } from "framer-motion";
import { School, MapPin, User, Award, Mail, Phone } from "lucide-react";

export default function GeneralInfoCard() {
  const generalInfo = [
    {
      label: "Name of the School",
      value: "ARYAVART ANCIENT ACADEMY",
      icon: <School className="w-5 h-5" />,
    },
    {
      label: "Affiliation No.",
      value: "1530380",
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "School Code",
      value: "21171501871",
      icon: <School className="w-5 h-5" />,
    },
    {
      label: "Complete Address with Pin Code",
      value: "HALDI PADA, ARJUNPUR, KHORDHA, 35, ODISHA - 752056",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      label: "Principal Name",
      value: "Dr. Diptimayee Mohanty",
      icon: <User className="w-5 h-5" />,
    },
    {
      label: "Principal Qualification",
      value: "Phd. MA. B.Ed.",
      icon: <Award className="w-5 h-5" />,
    },
    {
      label: "School Email ID",
      value: "aryavartaa.krd@gmail.com",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      label: "Contact Details",
      value: "9178387717",
      icon: <Phone className="w-5 h-5" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] p-6">
        <h2 className="text-2xl font-bold text-white">General Information</h2>
        <p className="text-[#f8f3e9]/80 mt-2">
          Basic details about Aryavart Ancient Academy
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generalInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#f8f3e9] rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
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

        <div className="mt-8 p-4 bg-[#f0e6d2] rounded-xl border border-[#8b1a1a]/20">
          <p className="text-[#8b1a1a] text-sm">
            This information is provided in accordance with CBSE requirements
            for mandatory public disclosure.
          </p>
        </div>
      </div>
    </div>
  );
}
