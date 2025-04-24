"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Eye, ExternalLink, Check } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

interface Document {
  id: string;
  title: string;
  downloadUrl: string;
  icon: JSX.Element;
  color: string;
}

export default function DocumentsGrid() {
  const [downloadedDocs, setDownloadedDocs] = useState<string[]>([]);

  const documents: Document[] = [
    {
      id: "affiliation",
      title: "Affiliation Letter",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "registration",
      title: "Registration Certificate",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "noc",
      title: "No Objection Certificate",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "recognition",
      title: "Recognition Certificate",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "building",
      title: "Building Safety Certificate",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "fire",
      title: "Fire Safety Certificate",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "self",
      title: "Self Certification",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "water",
      title: "Water & Sanitation Certificates",
      downloadUrl: "#",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
  ];

  const handleDownload = (id: string) => {
    // Simulate download
    setDownloadedDocs((prev) => [...prev, id]);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#8b1a1a] to-[#a52a2a] p-6">
        <h2 className="text-2xl font-bold text-white">
          Documents and Information
        </h2>
        <p className="text-[#f8f3e9]/80 mt-2">
          Official certificates and documents
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredDoc(doc.id)}
            >
              <div className="p-4 flex items-start">
                <div
                  className={`w-12 h-12 rounded-xl ${doc.color} flex items-center justify-center mr-4 flex-shrink-0`}
                >
                  {doc.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 font-medium mb-2">
                    {doc.title}
                  </h3>

                  <div className="flex space-x-2 mt-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(doc.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
                        downloadedDocs.includes(doc.id)
                          ? "bg-[#f0e6d2] text-[#8b1a1a]"
                          : "bg-[#8b1a1a] text-white"
                      }`}
                    >
                      {downloadedDocs.includes(doc.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Downloaded
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-[#f8f3e9] text-[#8b1a1a] rounded-lg text-sm font-medium flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-[#f0e6d2] rounded-xl border border-[#8b1a1a]/20">
          <p className="text-[#8b1a1a] text-sm flex items-start">
            <ExternalLink className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>
              All documents are self-attested by the Chairman/Manager/Secretary
              and Principal as per CBSE requirements.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
