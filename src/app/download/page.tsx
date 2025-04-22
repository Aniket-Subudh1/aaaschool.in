"use client";

import { useState, useEffect } from "react";
import {
  Download,
  File,
  Book,
  Calendar,
  Paperclip,
  Filter,
} from "lucide-react";

// Mapping of categories to icons
const categoryIcons = {
  "School Brochure": <File className="h-8 w-8" />,
  "Academic Calendar": <Calendar className="h-8 w-8" />,
  "Prescribed Booklist": <Book className="h-8 w-8" />,
  "Annual Report": <Paperclip className="h-8 w-8" />,
  Magazine: <Paperclip className="h-8 w-8" />,
  "Admission Form": <File className="h-8 w-8" />,
  "Transfer Certificate": <File className="h-8 w-8" />,
  Syllabus: <Book className="h-8 w-8" />,
  Other: <File className="h-8 w-8" />,
};

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

interface StudyMaterial {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  category: string;
  type?: string;
  active: boolean;
}

export default function DownloadPage() {
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
          active: "true",
          ...(filter && { category: filter }),
        }).toString();

        const response = await fetch(`/api/study-materials?${queryParams}`);

        if (!response.ok) {
          throw new Error("Failed to fetch study materials");
        }

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
      const response = await fetch(material.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = material.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#8b1a1a] text-white text-center p-6">
            <h1 className="text-2xl md:text-3xl font-bold">Download Center</h1>
            <p className="mt-2 text-sm md:text-base">
              Access and download school documents and study materials
            </p>
          </div>

          {/* Filter and Materials Section */}
          <div className="p-6">
            {/* Filter */}
            <div className="mb-6 flex items-center justify-between">
              <div className="relative">
                <button
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} className="mr-2" />
                  {filter ? `Category: ${filter}` : "Filter by Category"}
                </button>

                {isFilterOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          filter === category
                            ? "bg-gray-100 font-medium"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setFilter(category);
                          setIsFilterOpen(false);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Materials Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-md h-36"></div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : studyMaterials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No documents available
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {studyMaterials.map((material) => (
                  <div
                    key={material._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="mb-4 text-[#8b1a1a]">
                      {
                        categoryIcons[
                          material.category as keyof typeof categoryIcons
                        ]
                      }
                    </div>
                    <h3 className="text-sm font-medium mb-2 line-clamp-2">
                      {material.title}
                    </h3>
                    {material.type && (
                      <p className="text-xs text-gray-500 mb-2">
                        {material.type}
                      </p>
                    )}
                    <button
                      onClick={() => handleDownload(material)}
                      className="mt-auto flex items-center text-sm bg-[#8b1a1a] text-white px-3 py-2 rounded-md hover:bg-[#8b1a1a]/90"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
