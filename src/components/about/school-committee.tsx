"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Users,
  X,
  ChevronDown,
  Shield,
  AlertTriangle,
  Heart,
  FileText,
  Flame,
  Truck,
  Activity,
} from "lucide-react";

// Define interfaces for committee members
interface CommitteeMember {
  id: number;
  name: string;
  designation: string;
}

// Committee members data
const managingCommitteeMembers: CommitteeMember[] = [
  { id: 1, name: "Satyabadi Baliarsingh", designation: "President" },
  {
    id: 2,
    name: "Diptimayee Mohanty",
    designation: "Principal Cum Secretary",
  },
  {
    id: 3,
    name: "Pramod Chandra Dash",
    designation: "Member (Educationalist)",
  },
  {
    id: 4,
    name: "Pratap Chandra Dash",
    designation: "Member (Teacher Representative)",
  },
  {
    id: 5,
    name: "Minati Pradhan",
    designation: "Member (Teacher Representative)",
  },
  {
    id: 6,
    name: "Brajabandhu Behera",
    designation: "Member (Parent Representative)",
  },
  {
    id: 7,
    name: "Rajat Pattanaik",
    designation: "Member (Parent Representative)",
  },
  {
    id: 8,
    name: "Arjun Pradhan",
    designation: "Member (Parent Representative)",
  },
  {
    id: 9,
    name: "Pravakar Pattanaik",
    designation: "Member (Health Worker)",
  },
  {
    id: 10,
    name: "Rashmi Mohanty",
    designation: "Member (Parent Representative)",
  },
  {
    id: 11,
    name: "Mamita Pradhan",
    designation: "Member (Parent Representative)",
  },
];

export default function SchoolCommittees() {
  // State for managing modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Refs for animations
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Committee data
  const committees = [
    {
      id: "managing",
      title: "School Managing Committee",
      icon: <Users className="h-6 w-6" />,
      description:
        "Our school is guided by a dedicated committee of educators, parents, and community members who work together to ensure excellence in education.",
      color: "#8b1a1a",
    },
    {
      id: "antiBully",
      title: "Anti-Bully Committee",
      icon: <Shield className="h-6 w-6" />,
      description:
        "This committee works to create a safe environment for all students by implementing anti-bullying policies and addressing incidents promptly.",
      color: "#3b6ec1",
    },
    {
      id: "disaster",
      title: "Disaster Management Team",
      icon: <AlertTriangle className="h-6 w-6" />,
      description:
        "Responsible for emergency preparedness, this team develops and implements plans to respond effectively to natural disasters and other emergencies.",
      color: "#3b6ec1",
    },
    {
      id: "sexualHarassment",
      title: "Sexual Harassment Committee",
      icon: <FileText className="h-6 w-6" />,
      description:
        "This committee ensures a safe environment for all by addressing concerns related to sexual harassment through education, prevention, and intervention.",
      color: "#3b6ec1",
    },
    {
      id: "childProtection",
      title: "Child Protection Committee",
      icon: <Heart className="h-6 w-6" />,
      description:
        "Dedicated to safeguarding the welfare of all children in our school through vigilant monitoring and swift intervention when needed.",
      color: "#3b6ec1",
    },
    {
      id: "firstAid",
      title: "First Aid Committee",
      icon: <Activity className="h-6 w-6" />,
      description:
        "Trained to provide immediate medical assistance in case of injuries or health emergencies on campus.",
      color: "#3b6ec1",
    },
    {
      id: "fireSafety",
      title: "Fire Safety Committee",
      icon: <Flame className="h-6 w-6" />,
      description:
        "Responsible for fire prevention, evacuation planning, and regular drills to ensure readiness in case of fire emergencies.",
      color: "#3b6ec1",
    },
    {
      id: "transport",
      title: "Transport Committee",
      icon: <Truck className="h-6 w-6" />,
      description:
        "Oversees school transportation services, ensuring safe and efficient transit for students with proper routes and safety protocols.",
      color: "#3b6ec1",
    },
  ];

  // Helper functions for modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="py-16 bg-[#f8f3e9] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-pattern.png')] bg-repeat opacity-5"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#8b1a1a]/5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#3b6ec1]/5 blur-3xl"></div>

      <div ref={ref} className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 relative"
          >
            <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-[#f8f3e9] border-2 border-[#8b1a1a]/20 rounded-full p-3">
              <Users className="h-8 w-8 text-[#8b1a1a]" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif"
          >
            SCHOOL COMMITTEES
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-1 bg-[#d4b483] mx-auto mb-6"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-[#5a3e36] max-w-3xl mx-auto mb-12"
          >
            Our school operates through several specialized committees that work
            together to ensure a safe, supportive, and enriching educational
            environment for all students and staff.
          </motion.p>

          {/* Main committee section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center mb-16"
          >
            <button
              onClick={openModal}
              className="inline-flex items-center z-50 px-6 py-3 bg-[#8b1a1a] text-white rounded-lg hover:bg-[#8b1a1a]/90 transition-colors"
            >
              View Managing Committee Members
              <ChevronDown className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
        </div>

        {/* All committee cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee, index) => (
            <motion.div
              key={committee.id}
              custom={index}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] group"
            >
              <div
                className={`h-3 w-full`}
                style={{ backgroundColor: committee.color }}
              ></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4`}
                    style={{ backgroundColor: `${committee.color}20` }}
                  >
                    {committee.icon}
                  </div>
                  <h3 className="font-bold text-[#5a3e36] text-lg">
                    {committee.title}
                  </h3>
                </div>
                <p className="text-[#5a3e36]/80 text-sm mb-2">
                  {committee.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Committee members modal */}
      <AnimatePresence>
        {isModalOpen && (
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
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#d4b483]/20">
                <div className="flex items-center">
                  <div className="bg-[#8b1a1a]/10 p-2 rounded-full mr-3">
                    <Users className="h-6 w-6 text-[#8b1a1a]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#8b1a1a]">
                    School Managing Committee
                  </h3>
                </div>
                <button
                  className="text-[#5a3e36] hover:text-[#8b1a1a] transition-colors"
                  onClick={closeModal}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                <div className="relative overflow-hidden rounded-xl bg-[#f8f3e9] border border-[#d4b483]/20 shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#d4b483]/30">
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#8b1a1a]">
                            Sl.No.
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#8b1a1a]">
                            Name
                          </th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-[#8b1a1a]">
                            DESIGNATION in SMC
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {managingCommitteeMembers.map((member) => (
                          <tr
                            key={member.id}
                            className="border-b border-[#d4b483]/10 hover:bg-white/50 transition-colors"
                          >
                            <td className="px-6 py-4 text-[#5a3e36] text-sm">
                              {member.id}
                            </td>
                            <td className="px-6 py-4 text-[#5a3e36] text-sm font-medium">
                              {member.name}
                            </td>
                            <td className="px-6 py-4 text-[#5a3e36] text-sm">
                              {member.designation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8b1a1a] to-transparent"></div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-[#8b1a1a] text-white rounded-lg hover:bg-[#8b1a1a]/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
