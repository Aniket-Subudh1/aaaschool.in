"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, UserRound } from "lucide-react";

type UserType = "student" | "teacher" | "parent" | null;

export default function UserPortals() {
  const [activePortal, setActivePortal] = useState<UserType>(null);

  return (
    <div className="mt-8 relative">
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
        <PortalButton
          type="student"
          icon={<GraduationCap className="mr-2 h-5 w-5" />}
          isActive={activePortal === "student"}
          onClick={() =>
            setActivePortal(activePortal === "student" ? null : "student")
          }
        />
        <PortalButton
          type="teacher"
          icon={<Users className="mr-2 h-5 w-5" />}
          isActive={activePortal === "teacher"}
          onClick={() =>
            setActivePortal(activePortal === "teacher" ? null : "teacher")
          }
        />
        <PortalButton
          type="parent"
          icon={<UserRound className="mr-2 h-5 w-5" />}
          isActive={activePortal === "parent"}
          onClick={() =>
            setActivePortal(activePortal === "parent" ? null : "parent")
          }
        />
      </div>

      <AnimatePresence mode="wait">
        {activePortal && (
          <motion.div
            key={activePortal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-[#d4b483]/30"
          >
            {activePortal === "student" && <StudentPortal />}
            {activePortal === "teacher" && <TeacherPortal />}
            {activePortal === "parent" && <ParentPortal />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PortalButton({
  type,
  icon,
  isActive,
  onClick,
}: {
  type: UserType;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  const titles = {
    student: "Student Portal",
    teacher: "Teacher Portal",
    parent: "Parent Portal",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
        isActive
          ? "bg-[#8b1a1a] text-[#f8f3e9] shadow-lg scale-105"
          : "bg-[#f8f3e9] text-[#8b1a1a] border-2 border-[#8b1a1a] hover:bg-[#8b1a1a]/10"
      }`}
    >
      {icon}
      {titles[type as keyof typeof titles]}
    </button>
  );
}

function StudentPortal() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#8b1a1a]">
        Student Resources
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalCard
          title="Assignments"
          description="View and submit your assignments"
        />
        <PortalCard title="Timetable" description="Check your class schedule" />
        <PortalCard
          title="Study Materials"
          description="Access learning resources"
        />
      </div>
    </div>
  );
}

function TeacherPortal() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#8b1a1a]">
        Teacher Resources
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalCard
          title="Class Management"
          description="Manage your classes and students"
        />
        <PortalCard
          title="Gradebook"
          description="Record and manage student grades"
        />
        <PortalCard title="Resources" description="Access teaching materials" />
      </div>
    </div>
  );
}

function ParentPortal() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#8b1a1a]">Parent Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PortalCard
          title="Student Progress"
          description="Track your child's academic progress"
        />
        <PortalCard title="Attendance" description="View attendance records" />
        <PortalCard title="Fee Payment" description="Pay school fees online" />
      </div>
    </div>
  );
}

function PortalCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#f8f3e9] p-4 rounded-lg shadow border border-[#d4b483]/30 cursor-pointer"
    >
      <h4 className="font-medium text-[#8b1a1a]">{title}</h4>
      <p className="text-sm text-[#5a3e36]">{description}</p>
    </motion.div>
  );
}
