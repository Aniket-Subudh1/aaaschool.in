"use client";

import { motion } from "framer-motion";
import { FileText, Award, BarChart2 } from "lucide-react";

export default function ResultsSection() {
  const academicDocuments = [
    {
      id: "fee",
      title: "Fee Structure of the School",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "calendar",
      title: "Annual Academic Calendar",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "smc",
      title: "School Management Committee",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "pta",
      title: "Parents Teachers Association",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "results",
      title: "Board Examination Results",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const classXResults = {
    year: "2024",
    registered: "104",
    passed: "101",
    percentage: "97.11",
  };

  const classXIIResults = {
    year: "2024",
    registered: "14",
    passed: "13",
    percentage: "92.85",
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] p-6">
        <h2 className="text-2xl font-bold text-white">Results and Academics</h2>
        <p className="text-[#f8f3e9]/80 mt-2">
          Academic performance and related documents
        </p>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" /> Academic Documents
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {academicDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#f0e6d2] rounded-xl p-4 hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#8b1a1a]/20 flex items-center justify-center mr-3">
                    <span className="text-[#8b1a1a]">{doc.icon}</span>
                  </div>
                  <h3 className="text-slate-800 font-medium">{doc.title}</h3>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto px-3 py-1.5 bg-[#8b1a1a] text-white rounded-lg text-sm font-medium self-start"
                >
                  Download
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2" /> Examination Results
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl overflow-hidden border border-[#8b1a1a]/20"
            >
              <div className="bg-[#8b1a1a] text-white p-4">
                <h4 className="font-bold flex items-center">
                  <Award className="w-5 h-5 mr-2" /> Class X Results (2024)
                </h4>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">
                      {classXResults.registered}
                    </div>
                    <div className="text-sm text-slate-600">
                      Students Registered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">
                      {classXResults.passed}
                    </div>
                    <div className="text-sm text-slate-600">
                      Students Passed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">
                      {classXResults.percentage}%
                    </div>
                    <div className="text-sm text-slate-600">
                      Pass Percentage
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-[#8b1a1a] h-2.5 rounded-full"
                    style={{ width: `${classXResults.percentage}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl overflow-hidden border border-[#8b1a1a]/20"
            >
              <div className="bg-[#8b1a1a] text-white p-4">
                <h4 className="font-bold flex items-center">
                  <Award className="w-5 h-5 mr-2" /> Class XII Results (2024)
                </h4>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">
                      {classXIIResults.registered}
                    </div>
                    <div className="text-sm text-slate-600">
                      Students Registered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">
                      {classXIIResults.passed}
                    </div>
                    <div className="text-sm text-slate-600">
                      Students Passed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#8b1a1a]">
                      {classXIIResults.percentage}%
                    </div>
                    <div className="text-sm text-slate-600">
                      Pass Percentage
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-[#8b1a1a] h-2.5 rounded-full"
                    style={{ width: `${classXIIResults.percentage}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
