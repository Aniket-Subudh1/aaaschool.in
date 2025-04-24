"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  FileText,
  GraduationCap,
  Users,
  Building,
  User,
  ChevronRight,
} from "lucide-react";
import GeneralInfoCard from "./general-info-card";
import DocumentsGrid from "./documents-grid";
import ResultsSection from "./results-section";
import StaffInfoSection from "./staff-info-section";
import InfrastructureGrid from "./infrastructure-grid";
import TeachersTable from "./teachers-table";

type SectionType =
  | "general"
  | "documents"
  | "results"
  | "staff"
  | "infrastructure"
  | "teachers";

export default function DisclosureContent() {
  const [activeSection, setActiveSection] = useState<SectionType>("general");

  const sections = [
    {
      id: "general",
      label: "General Information",
      icon: <Info className="w-5 h-5" />,
      component: <GeneralInfoCard />,
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FileText className="w-5 h-5" />,
      component: <DocumentsGrid />,
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
    {
      id: "results",
      label: "Results & Academics",
      icon: <GraduationCap className="w-5 h-5" />,
      component: <ResultsSection />,
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
    {
      id: "staff",
      label: "Staff",
      icon: <Users className="w-5 h-5" />,
      component: <StaffInfoSection />,
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      icon: <Building className="w-5 h-5" />,
      component: <InfrastructureGrid />,
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
    {
      id: "teachers",
      label: "Teacher Details",
      icon: <User className="w-5 h-5" />,
      component: <TeachersTable />,
      color: "from-[#8b1a1a] to-[#a52a2a]",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Cards */}
        <div className="md:col-span-1">
          <div className="sticky top-8 space-y-3">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id as SectionType)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  activeSection === section.id
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                    : "bg-[#f8f3e9] text-[#8b1a1a] hover:bg-[#f0e6d2]"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      activeSection === section.id
                        ? "bg-white/20"
                        : "bg-slate-100"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <span className="font-medium">{section.label}</span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    activeSection === section.id ? "rotate-90" : ""
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {
                sections.find((section) => section.id === activeSection)
                  ?.component
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
