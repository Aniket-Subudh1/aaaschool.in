"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Key, Search, CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface EnquiryData {
  studentName: string;
  parentName: string;
  classApplied: string;
  [key: string]: string | number | boolean | undefined;
}

export default function VerifyEnquiry() {
  const [enquiryNumber, setEnquiryNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [enquiryData, setEnquiryData] = useState<EnquiryData | null>(null);

  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enquiryNumber.trim()) {
      setErrorMessage("Please enter an enquiry number");
      setVerificationStatus("error");
      return;
    }

    try {
      setIsVerifying(true);
      setVerificationStatus("idle");
      setErrorMessage("");

      const response = await fetch("/api/enquiries/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enquiryNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verification failed");
      }

      if (!data.valid) {
        setErrorMessage(data.message || "Invalid enquiry number");
        setVerificationStatus("error");
        return;
      }

      setEnquiryData(data.enquiry);
      setVerificationStatus("success");
    } catch (error) {
      console.error("Error verifying enquiry:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Verification failed"
      );
      setVerificationStatus("error");
    } finally {
      setIsVerifying(false);
    }
  };

  const proceedToAdmissionForm = () => {
    if (enquiryData && enquiryNumber) {
      // Use router to navigate to admission form with enquiry number
      router.push(`/admission/form?enquiry=${enquiryNumber}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#8b1a1a] text-white text-center p-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Image
                  src="/aaa.png"
                  alt="Aryavart Ancient Academy Logo"
                  width={80}
                  height={80}
                  className="bg-white rounded-full p-2"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold">Verify Enquiry Number</h1>
            <p className="mt-2 text-sm">
              Please enter your approved enquiry number to proceed with the
              admission form
            </p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            {verificationStatus === "success" ? (
              <div className="text-center py-4">
                <CheckCircle
                  size={64}
                  className="text-green-500 mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-green-700 mb-2">
                  Enquiry Verified!
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <p className="font-medium">Enquiry Details:</p>
                  <p className="text-gray-700">
                    Student Name:{" "}
                    <span className="font-medium">
                      {enquiryData?.studentName}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    Parent Name:{" "}
                    <span className="font-medium">
                      {enquiryData?.parentName}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    Class Applied For:{" "}
                    <span className="font-medium">
                      {enquiryData?.classApplied}
                    </span>
                  </p>
                </div>
                <button
                  onClick={proceedToAdmissionForm}
                  className="bg-[#8b1a1a] text-white py-3 px-6 rounded-md hover:bg-[#8b1a1a]/90 flex items-center mx-auto"
                >
                  Proceed to Admission Form
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerify} className="space-y-6">
                {verificationStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
                    <XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="enquiryNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enquiry Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="enquiryNumber"
                      value={enquiryNumber}
                      onChange={(e) => setEnquiryNumber(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      placeholder="Enter enquiry number (e.g., ENQ230001)"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Your enquiry number was provided after your enquiry was
                    approved
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-3 px-4 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 disabled:bg-gray-400 flex items-center justify-center"
                  >
                    {isVerifying ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search size={18} className="mr-2" />
                        Verify Enquiry Number
                      </>
                    )}
                  </button>
                </div>

                <div className="text-sm text-gray-500 mt-4">
                  <p className="text-center">
                    Don&apos;t have an enquiry number yet?{" "}
                    <a
                      href="/enquiry"
                      className="text-[#8b1a1a] font-medium hover:underline"
                    >
                      Submit an enquiry
                    </a>{" "}
                    first.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
