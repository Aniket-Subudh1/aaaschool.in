"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Phone,
  MapPin,
  Send,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    classApplied: "",
    mobileNumber: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState("Re4q8");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const regenerateCaptcha = () => {
    // Simple random captcha generator
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(newCaptcha);
    setEnteredCaptcha("");
  };

  const validateForm = (): boolean => {
    if (
      !formData.parentName.trim() ||
      !formData.studentName.trim() ||
      !formData.classApplied.trim() ||
      !formData.mobileNumber.trim() ||
      !formData.location.trim()
    ) {
      setErrorMessage("All fields are required");
      return false;
    }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setErrorMessage("Mobile number must be 10 digits");
      return false;
    }

    if (enteredCaptcha !== captchaValue) {
      setErrorMessage("Captcha is incorrect");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormStatus("error");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormStatus("idle");
      setErrorMessage("");

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      // Reset form on success
      setFormData({
        parentName: "",
        studentName: "",
        classApplied: "",
        mobileNumber: "",
        location: "",
      });
      setEnteredCaptcha("");
      regenerateCaptcha();
      setFormStatus("success");
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit enquiry"
      );
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-12 px-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl md:text-3xl font-bold">
              Admission Enquiry Form
            </h1>
            <p className="mt-2 text-sm md:text-base">
              Please fill out the form below to enquire about admission to
              Aryavart Ancient Academy
            </p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            {formStatus === "success" ? (
              <div className="text-center py-8">
                <CheckCircle
                  size={64}
                  className="text-green-500 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  Enquiry Submitted Successfully!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your interest in Aryavart Ancient Academy. Our
                  team will review your enquiry and contact you shortly.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="bg-[#8b1a1a] text-white py-2 px-6 rounded-md hover:bg-[#8b1a1a]/90"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
                    <XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="parentName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Parent Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        placeholder="Enter parent name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="studentName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Student Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        placeholder="Enter student name"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="classApplied"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Class Applied For <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="classApplied"
                      name="classApplied"
                      value={formData.classApplied}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    >
                      <option value="">Select class</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        placeholder="Enter at least 10 digit"
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Please enter a valid 10-digit mobile number
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                </div>

                {/* Captcha */}
                <div>
                  <label
                    htmlFor="captcha"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Enter Captcha <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="bg-gray-100 p-3 border border-gray-300 rounded-md text-center">
                        <span className="text-lg font-bold tracking-wider text-gray-800">
                          {captchaValue}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={regenerateCaptcha}
                        className="mt-1 flex items-center text-xs text-blue-600 hover:text-blue-800"
                      >
                        <RefreshCw size={12} className="mr-1" />
                        Refresh
                      </button>
                    </div>
                    <div className="flex-grow">
                      <input
                        type="text"
                        id="captcha"
                        value={enteredCaptcha}
                        onChange={(e) => setEnteredCaptcha(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        placeholder="Enter captcha"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 disabled:bg-gray-400 flex items-center justify-center"
                  >
                    {isSubmitting ? (
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </div>

                <div className="text-sm text-gray-500 mt-4">
                  <p className="text-center">
                    After submitting the enquiry, our team will review your
                    application and provide you with an enquiry number that will
                    be required to fill the admission form.
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
