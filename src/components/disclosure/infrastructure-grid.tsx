"use client";

import { motion } from "framer-motion";
import {
  Building,
  Maximize2,
  Monitor,
  Wifi,
  Droplet,
  Video,
} from "lucide-react";

export default function InfrastructureGrid() {
  const infrastructureInfo = [
    {
      label: "Campus Area",
      value: "16193 sq mtr",
      icon: <Maximize2 className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      label: "Classrooms",
      value: "36 rooms (56 sq mtr each)",
      icon: <Building className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      label: "Laboratories",
      value: "7 labs (56 sq mtr each)",
      icon: <Monitor className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      label: "Internet",
      value: "High-speed connectivity",
      icon: <Wifi className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      label: "Girls Toilets",
      value: "18 facilities",
      icon: <Droplet className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      label: "Boys Toilets",
      value: "18 facilities",
      icon: <Droplet className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] p-6">
        <h2 className="text-2xl font-bold text-white">School Infrastructure</h2>
        <p className="text-[#f8f3e9]/80 mt-2">
          Facilities and amenities available at our campus
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {infrastructureInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div
                  className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-4`}
                >
                  {item.icon}
                </div>
                <h3 className="text-slate-900 font-medium mb-1">
                  {item.label}
                </h3>
                <p className="text-slate-600">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-[#f0e6d2] to-[#f8f3e9] rounded-xl overflow-hidden border border-[#8b1a1a]/20"
        >
          <div className="p-4 bg-[#8b1a1a] text-white">
            <h3 className="font-bold flex items-center">
              <Video className="w-5 h-5 mr-2" /> Campus Video Tour
            </h3>
          </div>

          <div className="p-6">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden relative">
              <iframe
                src="https://www.youtube.com/embed/7vGoFUPOTCw"
                title="School Infrastructure Video Tour"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className="mt-4 text-slate-600 text-sm">
              Take a virtual tour of our campus facilities, including
              classrooms, laboratories, sports grounds, and more.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
