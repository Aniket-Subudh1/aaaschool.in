"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  User,
  GraduationCap,
  Filter,
} from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  designation: string;
  qualification: string;
}

export default function TeachersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Teacher;
    direction: "ascending" | "descending";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const itemsPerPage = 10;

  const teachers: Teacher[] = [
    {
      id: 1,
      name: "CHIRANJIT SHIT",
      designation: "PET",
      qualification: "M.P.Ed",
    },
    {
      id: 2,
      name: "Premlata Maharana",
      designation: "PGT",
      qualification: "M.A.",
    },
    {
      id: 3,
      name: "Diptimayee Mohanty",
      designation: "PRINCIPAL",
      qualification: "M.A.",
    },
    {
      id: 4,
      name: "Pratap Chandra Dash",
      designation: "TGT",
      qualification: "M.A.",
    },
    {
      id: 5,
      name: "Dibakar Paikaray",
      designation: "TGT",
      qualification: "B. Sc.",
    },
    {
      id: 6,
      name: "Chittaranjan Pattanaik",
      designation: "PRT",
      qualification: "M.A.",
    },
    {
      id: 7,
      name: "Rachita Pattanaik",
      designation: "PRT",
      qualification: "B.A.",
    },
    {
      id: 8,
      name: "Bhagyalaxmi Nanda",
      designation: "PRT",
      qualification: "B.A.",
    },
    {
      id: 9,
      name: "Subodha Mohapatra",
      designation: "TGT",
      qualification: "B.A.",
    },
    {
      id: 10,
      name: "Dillip Mohanty",
      designation: "PGT",
      qualification: "M.Sc.",
    },
    {
      id: 11,
      name: "Mitali Parida",
      designation: "PGT",
      qualification: "M. Phil.",
    },
    {
      id: 12,
      name: "Jyotirmayee Devi",
      designation: "TGT",
      qualification: "M.A.",
    },
    {
      id: 13,
      name: "Meena Puspa Soreng",
      designation: "PGT",
      qualification: "M.A.",
    },
    {
      id: 14,
      name: "Minati Pradhan",
      designation: "TGT",
      qualification: "M.A.",
    },
    {
      id: 15,
      name: "PRAVASINI JENA",
      designation: "PGT",
      qualification: "M. Lib",
    },
    {
      id: 16,
      name: "Sarmistha Mohapatra",
      designation: "PGT",
      qualification: "M.A.",
    },
    {
      id: 17,
      name: "Tanmaya Kumar Swain",
      designation: "TGT",
      qualification: "B.A.",
    },
    {
      id: 18,
      name: "Anuradha Mohanty",
      designation: "TGT",
      qualification: "B.A.",
    },
    { id: 19, name: "Gayatri Hati", designation: "PGT", qualification: "B.A." },
    {
      id: 20,
      name: "Lipika Pattanaik",
      designation: "NTT",
      qualification: "B.A.",
    },
    // Adding more teachers to match the total count of 51
    { id: 21, name: "Lalana Das", designation: "PRT", qualification: "B.A." },
    {
      id: 22,
      name: "Nrusingha Prasad Singh",
      designation: "PTI",
      qualification: "Senior Secondary",
    },
    {
      id: 23,
      name: "Rojalin Mishra",
      designation: "TGT",
      qualification: "M.A",
    },
    {
      id: 24,
      name: "Subhashree Paschimakabat",
      designation: "SPECIAL EDUCATOR",
      qualification: "M.A",
    },
    {
      id: 25,
      name: "Jaladhar pradhan",
      designation: "OTHER",
      qualification: "B.A.",
    },
    {
      id: 26,
      name: "Sunita Pattanaik",
      designation: "TGT",
      qualification: "B.A.",
    },
    {
      id: 27,
      name: "Jyotirmayee Behera",
      designation: "TGT",
      qualification: "B.Sc.",
    },
    {
      id: 28,
      name: "Shantilata Das",
      designation: "NTT",
      qualification: "M. Com",
    },
    {
      id: 29,
      name: "Malabika Das",
      designation: "OTHER",
      qualification: "B.A.",
    },
    {
      id: 30,
      name: "Ananta Charan Sahoo",
      designation: "OTHER",
      qualification: "HSC",
    },
    {
      id: 31,
      name: "SANDHYA RANI PADHY",
      designation: "PGT",
      qualification: "MSC",
    },
    {
      id: 32,
      name: "Pratap Kumar Majhi",
      designation: "PET",
      qualification: "BA",
    },
    {
      id: 33,
      name: "Manoja Kumar Swain",
      designation: "PGT",
      qualification: "M Sc.",
    },
    {
      id: 34,
      name: "Subhadarshini Agasti",
      designation: "PGT",
      qualification: "M. Sc",
    },
    { id: 35, name: "M KALIMUTHU", designation: "TGT", qualification: "M.A." },
    { id: 36, name: "Satyajit Lenka", designation: "PGT", qualification: "MA" },
    {
      id: 37,
      name: "Ambikesh Prasad Dash",
      designation: "PGT",
      qualification: "BCA",
    },
    {
      id: 38,
      name: "Nikhil Mittal",
      designation: "PGT",
      qualification: "M.Com",
    },
    {
      id: 39,
      name: "Mathuri Charan Bindhani",
      designation: "PGT",
      qualification: "B. Sc.",
    },
    {
      id: 40,
      name: "Nilamadhab Dash",
      designation: "PGT",
      qualification: "M Sc.",
    },
    { id: 41, name: "Juli Das", designation: "TGT", qualification: "M. A" },
    {
      id: 42,
      name: "Lalit Narayan Mohapatra",
      designation: "TGT",
      qualification: "MA",
    },
    {
      id: 43,
      name: "SAURABHA TRIPATHY",
      designation: "PGT",
      qualification: "M. Sc.",
    },
    { id: 44, name: "Swadhin Malik", designation: "TGT", qualification: "BVA" },
    {
      id: 45,
      name: "Pradyumna Kumar Upadhyaya",
      designation: "PGT",
      qualification: "M Sc.",
    },
    {
      id: 46,
      name: "Zulfiquar Alli",
      designation: "PGT",
      qualification: "MA in Fine Arts (Painting)",
    },
    { id: 47, name: "Kabita Dixit", designation: "PGT", qualification: "BA" },
    {
      id: 48,
      name: "Ardhendu Shekhar Patra",
      designation: "PGT",
      qualification: "M Sc",
    },
    { id: 49, name: "Sarita Singh", designation: "TGT", qualification: "MA" },
    { id: 50, name: "Anaina Pradeep", designation: "TGT", qualification: "MA" },
    {
      id: 51,
      name: "SK ABDUL RAHEMAN",
      designation: "PGT",
      qualification: "B. Com",
    },
  ];

  const designations = Array.from(
    new Set(teachers.map((teacher) => teacher.designation))
  );

  const requestSort = (key: keyof Teacher) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter
      ? teacher.designation === activeFilter
      : true;

    return matchesSearch && matchesFilter;
  });

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (!sortConfig) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTeachers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedTeachers.length / itemsPerPage);

  const getSortIcon = (key: keyof Teacher) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronDown className="w-4 h-4 opacity-50" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] p-6">
        <h2 className="text-2xl font-bold text-white">Teacher Details</h2>
        <p className="text-[#f8f3e9]/80 mt-2">
          Complete list of our teaching staff
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]"
            />
          </div>

          <div className="relative">
            <div className="flex items-center space-x-2">
              <Filter className="text-slate-400 w-5 h-5" />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter(null)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    activeFilter === null
                      ? "bg-[#8b1a1a] text-white"
                      : "bg-[#f8f3e9] text-[#8b1a1a] hover:bg-[#f0e6d2]"
                  }`}
                >
                  All
                </button>

                {designations.map((designation) => (
                  <button
                    key={designation}
                    onClick={() => setActiveFilter(designation)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      activeFilter === designation
                        ? "bg-[#8b1a1a] text-white"
                        : "bg-[#f8f3e9] text-[#8b1a1a] hover:bg-[#f0e6d2]"
                    }`}
                  >
                    {designation}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => requestSort("id")}
                      className="flex items-center font-medium text-slate-700 focus:outline-none"
                    >
                      SL No. {getSortIcon("id")}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => requestSort("name")}
                      className="flex items-center font-medium text-slate-700 focus:outline-none"
                    >
                      <User className="w-4 h-4 mr-1" /> Teacher Name{" "}
                      {getSortIcon("name")}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => requestSort("designation")}
                      className="flex items-center font-medium text-slate-700 focus:outline-none"
                    >
                      Designation {getSortIcon("designation")}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => requestSort("qualification")}
                      className="flex items-center font-medium text-slate-700 focus:outline-none"
                    >
                      <GraduationCap className="w-4 h-4 mr-1" /> Qualification{" "}
                      {getSortIcon("qualification")}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((teacher, index) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-slate-600">{teacher.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {teacher.name}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-[#f0e6d2] text-[#8b1a1a] rounded-full text-xs font-medium">
                        {teacher.designation}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {teacher.qualification}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-t border-slate-200">
              <div className="text-sm text-slate-600">
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, sortedTeachers.length)} of{" "}
                {sortedTeachers.length} teachers
              </div>

              <div className="flex space-x-1">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-full ${
                        currentPage === page
                          ? "bg-[#8b1a1a] text-white"
                          : "bg-[#f8f3e9] text-[#8b1a1a] hover:bg-[#f0e6d2]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
