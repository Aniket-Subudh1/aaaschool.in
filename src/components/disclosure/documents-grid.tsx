"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Eye, ExternalLink, Check } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

interface Document {
  id: string;
  title: string;
  downloadUrl: string;
  fileName: string;
  icon: JSX.Element;
  color: string;
}

export default function DocumentsGrid() {
  const [downloadedDocs, setDownloadedDocs] = useState<string[]>([]);
  const [downloadingDocs, setDownloadingDocs] = useState<string[]>([]);

  const documents: Document[] = [
    {
      id: "affiliation",
      title: "Affiliation Letter",
      downloadUrl: "/documents/AffiliationLetter.pdf",
      fileName: "AAA_Affiliation_Letter.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "registration",
      title: "Registration Certificate",
      downloadUrl: "/documents/RegistrationCertificate.pdf",
      fileName: "AAA_Registration_Certificate.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "noc",
      title: "No Objection Certificate",
      downloadUrl: "/documents/NoObjectionCertificate.pdf",
      fileName: "AAA_NOC_Certificate.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "recognition",
      title: "Recognition Certificate",
      downloadUrl: "/documents/RecognitionCrtificate.pdf",
      fileName: "AAA_Recognition_Certificate.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "building",
      title: "Building Safety Certificate",
      downloadUrl: "/documents/BuildingCertificate.pdf",
      fileName: "AAA_Building_Safety_Certificate.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "fire",
      title: "Fire Safety Certificate",
      downloadUrl: "/documents/FireCertificate.pdf",
      fileName: "AAA_Fire_Safety_Certificate.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "self",
      title: "Self Certification",
      downloadUrl: "/documents/SelfCertification.pdf",
      fileName: "AAA_Self_Certification.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
    {
      id: "water",
      title: "Water & Sanitation Certificates",
      downloadUrl: "/documents/performa.jpeg",
      fileName: "AAA_Water_Sanitation_Certificates.pdf",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-[#f0e6d2] text-[#8b1a1a]",
    },
  ];

  const handleDownload = async (doc: Document) => {
    setDownloadingDocs((prev) => [...prev, doc.id]);
    
    try {
      // Check if file exists
      const response = await fetch(doc.downloadUrl, { method: 'HEAD' });
      
      if (!response.ok) {
        throw new Error('File not found');
      }

      // Create download link
      const link = document.createElement('a');
      link.href = doc.downloadUrl;
      link.download = doc.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Mark as downloaded
      setDownloadedDocs((prev) => [...prev, doc.id]);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Sorry, this document is not available for download yet. Please contact the school administration.');
    } finally {
      setDownloadingDocs((prev) => prev.filter(id => id !== doc.id));
    }
  };

  const handleView = (doc: Document) => {
    window.open(doc.downloadUrl, '_blank');
  };

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
              onMouseLeave={() => setHoveredDoc(null)}
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
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingDocs.includes(doc.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center ${
                        downloadedDocs.includes(doc.id)
                          ? "bg-green-100 text-green-700"
                          : downloadingDocs.includes(doc.id)
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-[#8b1a1a] text-white hover:bg-[#a52a2a]"
                      }`}
                    >
                      {downloadingDocs.includes(doc.id) ? (
                        <>
                          <div className="w-4 h-4 mr-1 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          Downloading...
                        </>
                      ) : downloadedDocs.includes(doc.id) ? (
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
                      onClick={() => handleView(doc)}
                      className="px-3 py-1.5 bg-[#f8f3e9] text-[#8b1a1a] rounded-lg text-sm font-medium flex items-center hover:bg-[#f0e6d2]"
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
              and Principal as per CBSE requirements. If a document is not available
              for download, please contact the school administration.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}