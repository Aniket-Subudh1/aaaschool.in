"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  MapPin,
  School,
  Send,
  CheckCircle,
  XCircle,
  Upload,
  Info,
} from "lucide-react";

interface FormData {
  studentName: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  currentSchool: string;
  currentClass: string;
  applyingForClass: string;
  howDidYouHear: string;
}

export default function ATATRegistrationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    currentSchool: "",
    currentClass: "",
    applyingForClass: "",
    howDidYouHear: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setFormStatus("idle");
      setErrorMessage("");

      // Create FormData object to handle the file upload
      const formDataObj = new FormData();
      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      // Add the photo if it exists
      if (photo) {
        formDataObj.append("photo", photo);
      }

      // Submit the form data to the API
      const response = await fetch("/api/atat-registrations", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit registration");
      }

      setFormStatus("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit registration form"
      );
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formStatus === "success") {
    return (
      <div className="min-h-screen bg-[#f8f3e9] py-12 px-4 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-700 mb-6">
            Your registration for the Aryavart Ancient Academy Talent Assessment
            Test has been successfully submitted. You will receive a
            confirmation email shortly with further details about the test date,
            time, and venue.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => router.push("/")}
              className="bg-[#8b1a1a] text-white py-2 px-6 rounded-md hover:bg-[#8b1a1a]/90"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-8 px-4">
      <div className="max-w-3xl mx-auto">
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
              Scholarship Test Registration (ATAT)
            </h1>
            <p className="mt-2 text-sm md:text-base">
              Aryavart Ancient Academy Talent Assessment Test for Class 11th
              Admission 2025
            </p>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            {formStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start mb-6">
                <XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <div className="flex items-start">
                <Info className="h-5 w-5 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">
                    About ATAT
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    The Aryavart Ancient Academy Talent Assessment Test (ATAT)
                    is a scholarship examination conducted for students seeking
                    admission to Class 11. Based on your performance, you may be
                    eligible for scholarships up to 100% on tuition fees.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="studentName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name Of the Student{" "}
                      <span className="text-red-500">*</span>
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
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date Of Birth <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Photo of the student <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="block w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <Upload className="h-5 w-5 mr-2 text-gray-400" />
                      <span>Upload photo</span>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                        required
                      />
                    </label>
                  </div>
                  {photo && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {photo.name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Upload a recent passport size photograph (max 2MB)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Parent/Guardian Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="parentName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Parent/Guardian Name{" "}
                      <span className="text-red-500">*</span>
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
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="parentPhone"
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
                        id="parentPhone"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="parentEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="parentEmail"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Address Information
                </h3>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      pattern="[0-9]{6}"
                      placeholder="6-digit PIN code"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Educational Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="currentSchool"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current School <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <School className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="currentSchool"
                        name="currentSchool"
                        value={formData.currentSchool}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="currentClass"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Class <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="currentClass"
                        name="currentClass"
                        value={formData.currentClass}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        required
                      >
                        <option value="">Select class</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 12">Class 12</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="applyingForClass"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Applying For Class <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="applyingForClass"
                      name="applyingForClass"
                      value={formData.applyingForClass}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    >
                      <option value="">Select class</option>
                      <option value="Class 11 Science">
                        Class 11 - Science
                      </option>
                      <option value="Class 11 Commerce">
                        Class 11 - Commerce
                      </option>
                      <option value="Class 11 Arts">Class 11 - Arts</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="howDidYouHear"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    How did you hear about us?
                  </label>
                  <select
                    id="howDidYouHear"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  >
                    <option value="">Select an option</option>
                    <option value="Search Engine">Search Engine</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friends/Family">Friends/Family</option>
                    <option value="Newspaper">Newspaper</option>
                    <option value="School">School</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                  Important Information
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• The Scholarship Test Date will be Announced</p>
                  <p>
                    • Reporting time: <strong>Will be Announced</strong>
                  </p>
                  <p>
                    • Test duration: <strong>Will be Announced</strong>
                  </p>
                  <p>• Syllabus: Based on CBSE Class 10 curriculum</p>
                  <p>
                    • Bring your own stationery (pens, pencils, eraser, etc.)
                  </p>
                  <p>
                    • Admit card will be sent to your registered email address
                  </p>
                </div>

                <div className="mt-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300 rounded"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I hereby declare that the information provided is true to
                      the best of my knowledge. I agree to abide by the rules
                      and regulations of the Aryavart Ancient Academy Talent
                      Assessment Test.
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-6">
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Register for Scholarship Test
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  For any queries, please contact us at{" "}
                  <a
                    href="mailto:admissions@aaaschool.in"
                    className="text-[#8b1a1a] hover:underline"
                  >
                    admissions@aaaschool.in
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+919124654094"
                    className="text-[#8b1a1a] hover:underline"
                  >
                    +91 91246 54094
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
