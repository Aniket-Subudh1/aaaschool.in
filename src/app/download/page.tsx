"use client";

import { useState, useEffect } from "react";
import {
  Filter,
  AlertCircle,
  Search,
  Download,
  FileText,
  Calendar,
  BookOpen,
  FileCheck,
  Newspaper,
  FileSignature,
  Award,
  GraduationCap,
  File,
} from "lucide-react";

interface StudyMaterial {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  category: string;
  type?: string;
  active: boolean;
}

const categories = [
  "School Brochure",
  "Academic Calendar",
  "Prescribed Booklist",
  "Annual Report",
  "Magazine",
  "Admission Form",
  "Transfer Certificate",
  "Syllabus",
];

export default function DownloadsPage() {
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<{ [key: string]: string }>(
    {}
  );
  const [filter, setFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          active: "true",
          ...(filter && { category: filter }),
        }).toString();

        const response = await fetch(`/api/study-materials?${queryParams}`);
        if (!response.ok) throw new Error("Failed to fetch study materials");

        const data = await response.json();
        setStudyMaterials(data);
      } catch (err) {
        console.error("Error fetching study materials:", err);
        setError("Failed to load study materials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudyMaterials();
  }, [filter]);

  const handleDownload = async (material: StudyMaterial) => {
    try {
      setDownloadError((prev) => ({ ...prev, [material._id]: "" }));

      const getFileExtension = (fileType: string) => {
        const map: { [key: string]: string } = {
          "application/pdf": ".pdf",
          "application/msword": ".doc",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            ".docx",
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/gif": ".gif",
        };
        return map[fileType] || "";
      };

      const response = await fetch(material.fileUrl, {
        method: "GET",
        headers: { "Content-Type": material.fileType },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const sanitizedFilename = material.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .trim();

      link.href = url;
      link.download = `${sanitizedFilename}${getFileExtension(
        material.fileType
      )}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      setDownloadError((prev) => ({
        ...prev,
        [material._id]:
          error instanceof Error
            ? error.message
            : "Download failed. Please try again.",
      }));
    }
  };

  const getCategoryIcon = (category: string, size = 24, className = "") => {
    switch (category) {
      case "School Brochure":
        return <FileText size={size} className={className} />;
      case "Academic Calendar":
        return <Calendar size={size} className={className} />;
      case "Prescribed Booklist":
        return <BookOpen size={size} className={className} />;
      case "Annual Report":
        return <FileCheck size={size} className={className} />;
      case "Magazine":
        return <Newspaper size={size} className={className} />;
      case "Admission Form":
        return <FileSignature size={size} className={className} />;
      case "Transfer Certificate":
        return <Award size={size} className={className} />;
      case "Syllabus":
        return <GraduationCap size={size} className={className} />;
      default:
        return <File size={size} className={className} />;
    }
  };

  const filteredMaterials = studyMaterials.filter(
    (material) =>
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (material.description &&
        material.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-[#f8f3e9] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-[#e6d7c3] overflow-visible">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] text-white p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Download Center
            </h1>
            <p className="text-white/80 max-w-2xl">
              Access and download school documents, forms, and study materials
              for Aryavart Academy
            </p>
          </div>

          {/* Filter and Search Section */}
          <div className="p-6 border-b border-[#e6d7c3] bg-[#f8f3e9]/30">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between relative z-20">
              {/* Category Filter */}
              <div className="relative z-30">
                <button
                  className="flex items-center text-sm text-gray-700 hover:text-[#8b1a1a] px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm transition-colors"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} className="mr-2" />
                  {filter ? `Category: ${filter}` : "All Categories"}
                </button>

                {isFilterOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-30 border border-gray-200">
                    <div className="p-2">
                      <button
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-[#f8f3e9] transition-colors"
                        onClick={() => {
                          setFilter(null);
                          setIsFilterOpen(false);
                        }}
                      >
                        Show All
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-[#f8f3e9] transition-colors flex items-center ${
                            filter === category
                              ? "bg-[#f8f3e9] text-[#8b1a1a] font-medium"
                              : "text-gray-700"
                          }`}
                          onClick={() => {
                            setFilter(category);
                            setIsFilterOpen(false);
                          }}
                        >
                          <span className="mr-2 text-[#8b1a1a]">
                            {getCategoryIcon(category, 16)}
                          </span>
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8b1a1a]/20 focus:border-[#8b1a1a] bg-white"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Materials Section */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center">
                <AlertCircle className="mr-2 text-red-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-48"></div>
                ))}
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8f3e9] text-[#8b1a1a] mb-4">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No documents found
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : filter
                    ? `No documents available in the "${filter}" category`
                    : "No documents are currently available for download"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => (
                  <div
                    key={material._id}
                    className="group relative bg-white border border-[#e6d7c3] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a]"></div>

                    <div className="p-5 flex flex-col h-full">
                      <div className="flex items-start mb-3">
                        <div className="w-12 h-12 rounded-full bg-[#8b1a1a]/10 flex items-center justify-center text-[#8b1a1a] mr-3 flex-shrink-0">
                          {getCategoryIcon(material.category)}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-[#8b1a1a]/70 uppercase tracking-wider">
                            {material.category}
                          </span>
                          <h3 className="text-base font-medium text-gray-800 line-clamp-2 group-hover:text-[#8b1a1a] transition-colors">
                            {material.title}
                          </h3>
                        </div>
                      </div>

                      {material.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {material.description}
                        </p>
                      )}

                      {material.type && (
                        <div className="mt-auto mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f8f3e9] text-[#8b1a1a]">
                            {material.type}
                          </span>
                        </div>
                      )}

                      <div className="mt-auto">
                        <button
                          onClick={() => handleDownload(material)}
                          className="w-full flex items-center justify-center text-sm bg-white border border-[#8b1a1a] text-[#8b1a1a] px-4 py-2.5 rounded-lg hover:bg-[#8b1a1a] hover:text-white transition-colors duration-300 font-medium"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </button>

                        {downloadError[material._id] && (
                          <div className="mt-2 flex items-center text-xs text-red-600">
                            <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span>{downloadError[material._id]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
