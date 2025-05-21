"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Loader2,
  GraduationCap,
  Mail,
  Building,
  Search,
  BookOpen,
  ChevronRight,
  Filter,
  Users,
  User,
} from "lucide-react";

interface Faculty {
  _id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  photoUrl: string;
  active: boolean;
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/faculty?active=true");

        if (!res.ok) {
          throw new Error("Failed to fetch faculty data");
        }

        const data = await res.json();
        setFaculty(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        setError("Failed to load faculty data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // Get unique departments for filtering
  const departments = [...new Set(faculty.map((f) => f.department))];

  // Apply search filter
  const searchedFaculty = faculty.filter(
    (member) =>
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Then apply department filter
  const filteredFaculty = department
    ? searchedFaculty.filter((f) => f.department === department)
    : searchedFaculty;

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
            <span>Faculty</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Staff</h1>
          <p className="text-lg max-w-3xl opacity-90">
            Meet our dedicated team of educators who are committed to nurturing
            the intellectual and personal growth of each student at Aryavart
            Ancient Academy.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              <Users size={14} className="mr-1.5" />
              {faculty.length} Staff Members
            </div>
            <div className="flex items-center bg-white/20 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
              <BookOpen size={14} className="mr-1.5" />
              Expert Educators
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white shadow-sm border-b border-[#d4b483]/20  top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative md:max-w-xs w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white"
              />
            </div>

            <div className="flex items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center bg-[#8b1a1a]/10 text-[#8b1a1a] px-3 py-2 rounded-md text-sm hover:bg-[#8b1a1a]/20"
              >
                <Filter size={16} className="mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pb-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Filter by Department
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setDepartment(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    department === null
                      ? "bg-[#8b1a1a] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Departments
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setDepartment(dept)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      department === dept
                        ? "bg-[#8b1a1a] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-gray-700">
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 size={16} className="animate-spin mr-2" />
                <span>Loading staff members...</span>
              </div>
            ) : (
              <span>
                Showing{" "}
                <span className="font-medium">{filteredFaculty.length}</span>{" "}
                staff members
                {department && (
                  <span>
                    {" "}
                    in <span className="font-medium">{department}</span>
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {" "}
                    matching &quot;
                    <span className="font-medium">{searchQuery}</span>
                    &quot;
                  </span>
                )}
              </span>
            )}
          </div>

          {department && (
            <button
              onClick={() => setDepartment(null)}
              className="text-[#8b1a1a] text-sm hover:underline"
            >
              Clear department filter
            </button>
          )}
        </div>

        {/* Faculty Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-[#8b1a1a]" />
            <p className="mt-4 text-gray-600">Loading staff data...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto p-6 bg-red-50 rounded-lg text-center text-red-700 border border-red-200">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No staff members found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {department
                ? `No faculty members in the ${department} department match your search.`
                : searchQuery
                ? "No faculty members match your search criteria."
                : "Faculty information will be added soon. Please check back later."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFaculty.map((member) => (
  <div
    key={member._id}
    className="w-full relative h-[430px] group mx-auto bg-white border rounded-md text-black flex flex-col shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="w-full rounded-t-md h-[350px] group-hover:h-[410px] overflow-hidden transition-all duration-300">
      {member.photoUrl ? (
        <Image
          src={member.photoUrl || "/placeholder-faculty.png"}
          alt={member.name}
          width={600}
          height={600}
          className="h-full w-full scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0 object-cover transition-all duration-300"
        />
      ) : (
        <div className="flex items-center justify-center h-full w-full bg-gray-200">
          <User className="h-16 w-16 text-gray-400" />
        </div>
      )}
    </div>
    <article className="relative overflow-hidden flex-grow">
      <div className="info p-3 translate-y-0 group-hover:-translate-y-20 transition-all duration-300">
        <p className="text-xl md:text-2xl font-semibold">
          {member.name}
        </p>
        <div className="flex items-center text-sm text-gray-600">
          <Building className="h-4 w-4 mr-1" />
          <p>{member.department}</p>
        </div>
      </div>
      <div className="absolute h-20 -bottom-20 opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-300 w-full text-center p-3 bg-[#f8f3e9]">
        <p className="text-lg font-medium text-[#8b1a1a]">
          {member.position}
        </p>
        {member.email && (
          <div className="flex items-center justify-center mt-1 text-gray-700">
            <Mail className="h-4 w-4 mr-1" />
            <p className="text-sm">{member.email}</p>
          </div>
        )}
      </div>
    </article>
  </div>
))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-[#f8f3e9] py-16 px-4 mt-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#8b1a1a] mb-4">
            Join Our Academic Team
          </h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            Aryavart Ancient Academy is always looking for passionate educators
            who are committed to excellence in teaching and the holistic
            development of students.
          </p>
          <a
            href="/careers"
            className="inline-flex items-center px-6 py-3 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 transition-colors"
          >
            View Career Opportunities
            <ChevronRight size={16} className="ml-2" />
          </a>
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
}
