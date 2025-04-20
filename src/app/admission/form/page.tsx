"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  UploadCloud,
  PlusCircle,
  MinusCircle,
  Send,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";

export default function AdmissionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const enquiryNumber = searchParams.get("enquiry") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    enquiryNumber: "",
    class: "",
    session: new Date().getFullYear() + "-" + (new Date().getFullYear() + 1),
    studentName: "",
    gender: "",
    dateOfBirth: "",
    dateOfBirthInWords: "",
    bloodGroup: "",
    motherName: "",
    motherEducation: "",
    motherOccupation: "",
    motherMobile: "",
    motherEmail: "",
    fatherName: "",
    fatherEducation: "",
    fatherOccupation: "",
    fatherMobile: "",
    fatherEmail: "",
    residentialAddress: "",
    permanentAddress: "",
    lastSchoolName: "",
    lastClassAttended: "",
    lastSchoolBoard: "CBSE",
    transferCertificateDetails: "",
    transferCertificateNo: "",
    transferCertificateDate: "",
    isSingleGirlChild: false,
    isSpeciallyAbled: false,
    isEWS: false,
    category: "General",
    aadharNo: "",
  });

  const [siblings, setSiblings] = useState([{ name: "", age: "", school: "" }]);
  const [academics, setAcademics] = useState([
    { subject: "", maxMarks: "100", marksObtained: "0", remarks: "" },
  ]);

  const [photo, setPhoto] = useState<File | null>(null);
  const [birthCertificate, setBirthCertificate] = useState<File | null>(null);

  // Verify enquiry number on component mount
  useEffect(() => {
    const verifyEnquiry = async () => {
      if (!enquiryNumber) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/enquiries/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ enquiryNumber }),
        });

        const data = await response.json();

        if (!response.ok || !data.valid) {
          setErrorMessage(data.message || "Invalid enquiry number");
          setIsVerified(false);
        } else {
          setIsVerified(true);

          // Pre-fill form with enquiry data
          setFormData((prevData) => ({
            ...prevData,
            enquiryNumber,
            studentName: data.enquiry.studentName || "",
            class: data.enquiry.classApplied || "",
            fatherName: data.enquiry.parentName || "",
            fatherMobile: data.enquiry.mobileNumber || "",
          }));
        }
      } catch (error) {
        console.error("Error verifying enquiry:", error);
        setErrorMessage("Failed to verify enquiry number");
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEnquiry();
  }, [enquiryNumber]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "photo" | "birthCertificate"
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      if (type === "photo") {
        setPhoto(e.target.files[0]);
      } else {
        setBirthCertificate(e.target.files[0]);
      }
    }
  };

  const addSibling = () => {
    setSiblings([...siblings, { name: "", age: "", school: "" }]);
  };

  const removeSibling = (index: number) => {
    setSiblings(siblings.filter((_, i) => i !== index));
  };

  const updateSibling = (index: number, field: string, value: string) => {
    const updatedSiblings = [...siblings];
    updatedSiblings[index] = { ...updatedSiblings[index], [field]: value };
    setSiblings(updatedSiblings);
  };

  const addAcademic = () => {
    setAcademics([
      ...academics,
      { subject: "", maxMarks: "100", marksObtained: "0", remarks: "" },
    ]);
  };

  const removeAcademic = (index: number) => {
    setAcademics(academics.filter((_, i) => i !== index));
  };

  const updateAcademic = (index: number, field: string, value: string) => {
    const updatedAcademics = [...academics];
    updatedAcademics[index] = { ...updatedAcademics[index], [field]: value };
    setAcademics(updatedAcademics);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      setErrorMessage("Please verify your enquiry number first");
      setFormStatus("error");
      return;
    }

    try {
      setFormStatus("idle");
      setErrorMessage("");

      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value.toString());
      });

      siblings.forEach((sibling, index) => {
        if (sibling.name) {
          formDataObj.append(`siblings[${index}].name`, sibling.name);
          formDataObj.append(`siblings[${index}].age`, sibling.age);
          formDataObj.append(`siblings[${index}].school`, sibling.school);
        }
      });

      academics.forEach((academic, index) => {
        if (academic.subject) {
          formDataObj.append(`academics[${index}].subject`, academic.subject);
          formDataObj.append(`academics[${index}].maxMarks`, academic.maxMarks);
          formDataObj.append(
            `academics[${index}].marksObtained`,
            academic.marksObtained
          );
          formDataObj.append(
            `academics[${index}].remarks`,
            academic.remarks || ""
          );
        }
      });

      if (photo) {
        formDataObj.append("photo", photo);
      }

      if (birthCertificate) {
        formDataObj.append("birthCertificate", birthCertificate);
      }

      const response = await fetch("/api/admissions", {
        method: "POST",
        body: formDataObj,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to submit admission form"
        );
      }

      setFormStatus("success");
    } catch (error) {
      console.error("Error submitting admission form:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit admission form"
      );
      setFormStatus("error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f3e9] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
          <div className="animate-spin h-12 w-12 border-4 border-[#8b1a1a] border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Verifying Enquiry Number...
          </h2>
          <p className="text-gray-500 mt-2">
            Please wait while we verify your enquiry details.
          </p>
        </div>
      </div>
    );
  }

  if (!isVerified && enquiryNumber) {
    return (
      <div className="min-h-screen bg-[#f8f3e9] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
          <XCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Invalid Enquiry Number
          </h2>
          <p className="text-gray-700 mb-6">
            {errorMessage ||
              "The enquiry number provided is invalid or has not been approved yet."}
          </p>
          <button
            onClick={() => router.push("/admission/verify")}
            className="bg-[#8b1a1a] text-white py-2 px-6 rounded-md hover:bg-[#8b1a1a]/90 flex items-center mx-auto"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Verification
          </button>
        </div>
      </div>
    );
  }

  if (formStatus === "success") {
    return (
      <div className="min-h-screen bg-[#f8f3e9] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md w-full">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Admission Form Submitted Successfully!
          </h2>
          <p className="text-gray-700 mb-6">
            Thank you for submitting your admission form. Your application has
            been received and is under review. The school administration will
            contact you regarding the next steps.
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
            <h1 className="text-2xl md:text-3xl font-bold">Admission Form</h1>
            <p className="mt-2 text-sm md:text-base">
              Please fill all the required details to complete your admission
              application
            </p>
          </div>

          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {formStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start">
                  <XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="text-lg font-medium text-blue-800 mb-2 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Enquiry Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Enquiry Number:
                    </label>
                    <p className="mt-1 font-medium text-blue-700">
                      {enquiryNumber}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Enquiry Status:
                    </label>
                    <p className="mt-1 text-green-700 font-medium">Approved</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Basic Information
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
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="class"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="class"
                      name="class"
                      value={formData.class}
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div>
                    <label
                      htmlFor="session"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Session <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="session"
                      name="session"
                      value={formData.session}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    />
                  </div>

                  <div>
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

                  <div>
                    <label
                      htmlFor="bloodGroup"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date Of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dateOfBirthInWords"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date Of Birth In Words{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="dateOfBirthInWords"
                      name="dateOfBirthInWords"
                      value={formData.dateOfBirthInWords}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      placeholder="e.g., Fifth January Two Thousand Ten"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Photo of the student
                    </label>
                    <div className="mt-1 flex items-center">
                      <label className="block w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        <UploadCloud className="h-5 w-5 mr-2 text-gray-400" />
                        <span>Upload photo</span>
                        <input
                          id="photo"
                          name="photo"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "photo")}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    {photo && (
                      <p className="mt-2 text-sm text-green-600">
                        Selected: {photo.name}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Upload a recent passport size photograph
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="birthCertificate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Birth Certificate
                    </label>
                    <div className="mt-1 flex items-center">
                      <label className="block w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        <UploadCloud className="h-5 w-5 mr-2 text-gray-400" />
                        <span>Upload certificate</span>
                        <input
                          id="birthCertificate"
                          name="birthCertificate"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) =>
                            handleFileChange(e, "birthCertificate")
                          }
                          className="sr-only"
                        />
                      </label>
                    </div>
                    {birthCertificate && (
                      <p className="mt-2 text-sm text-green-600">
                        Selected: {birthCertificate.name}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Upload a scanned copy of the birth certificate (PDF or
                      image)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Parents Information
                </h3>

                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Mother&apos;s Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="motherName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="motherName"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="motherEducation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Educational Qualification
                      </label>
                      <input
                        type="text"
                        id="motherEducation"
                        name="motherEducation"
                        value={formData.motherEducation}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <label
                        htmlFor="motherOccupation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="motherOccupation"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="motherMobile"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        id="motherMobile"
                        name="motherMobile"
                        value={formData.motherMobile}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="motherEmail"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="motherEmail"
                        name="motherEmail"
                        value={formData.motherEmail}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Father&apos;s Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fatherName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fatherName"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="fatherEducation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Educational Qualification
                      </label>
                      <input
                        type="text"
                        id="fatherEducation"
                        name="fatherEducation"
                        value={formData.fatherEducation}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div>
                      <label
                        htmlFor="fatherOccupation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Occupation
                      </label>
                      <input
                        type="text"
                        id="fatherOccupation"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="fatherMobile"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="fatherMobile"
                        name="fatherMobile"
                        value={formData.fatherMobile}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                        pattern="[0-9]{10}"
                        placeholder="10-digit mobile number"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="fatherEmail"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="fatherEmail"
                        name="fatherEmail"
                        value={formData.fatherEmail}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Address Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="residentialAddress"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Residential Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="residentialAddress"
                      name="residentialAddress"
                      value={formData.residentialAddress}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="permanentAddress"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Permanent Address
                    </label>
                    <textarea
                      id="permanentAddress"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500">
                      Leave blank if same as residential address
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Previous School Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="lastSchoolName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name and Address of the Last attended School
                    </label>
                    <input
                      type="text"
                      id="lastSchoolName"
                      name="lastSchoolName"
                      value={formData.lastSchoolName}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastClassAttended"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Class last Attended
                    </label>
                    <input
                      type="text"
                      id="lastClassAttended"
                      name="lastClassAttended"
                      value={formData.lastClassAttended}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="lastSchoolBoard"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last School Affiliated
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolBoard"
                        value="CBSE"
                        checked={formData.lastSchoolBoard === "CBSE"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">CBSE</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolBoard"
                        value="ICSE"
                        checked={formData.lastSchoolBoard === "ICSE"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">ICSE</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolBoard"
                        value="IB"
                        checked={formData.lastSchoolBoard === "IB"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">IB</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="lastSchoolBoard"
                        value="State Board"
                        checked={formData.lastSchoolBoard === "State Board"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        State Board
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div>
                    <label
                      htmlFor="transferCertificateDetails"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Transfer Certificate Details
                    </label>
                    <input
                      type="text"
                      id="transferCertificateDetails"
                      name="transferCertificateDetails"
                      value={formData.transferCertificateDetails}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="transferCertificateNo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Transfer Certificate No
                    </label>
                    <input
                      type="text"
                      id="transferCertificateNo"
                      name="transferCertificateNo"
                      value={formData.transferCertificateNo}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="transferCertificateDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date Of Issue
                    </label>
                    <input
                      type="date"
                      id="transferCertificateDate"
                      name="transferCertificateDate"
                      value={formData.transferCertificateDate}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Result Of Last Class
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Subject
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Maximum Marks
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Marks Obtained
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Remarks
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {academics.map((academic, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={academic.subject}
                                onChange={(e) =>
                                  updateAcademic(
                                    index,
                                    "subject",
                                    e.target.value
                                  )
                                }
                                className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b1a1a]/50 text-sm"
                                placeholder="Subject name"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                value={academic.maxMarks}
                                onChange={(e) =>
                                  updateAcademic(
                                    index,
                                    "maxMarks",
                                    e.target.value
                                  )
                                }
                                className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b1a1a]/50 text-sm"
                                placeholder="100"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                value={academic.marksObtained}
                                onChange={(e) =>
                                  updateAcademic(
                                    index,
                                    "marksObtained",
                                    e.target.value
                                  )
                                }
                                className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b1a1a]/50 text-sm"
                                placeholder="0"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="text"
                                value={academic.remarks}
                                onChange={(e) =>
                                  updateAcademic(
                                    index,
                                    "remarks",
                                    e.target.value
                                  )
                                }
                                className="block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#8b1a1a]/50 text-sm"
                                placeholder="Remarks"
                              />
                            </td>
                            <td className="px-4 py-2">
                              {academics.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeAcademic(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <MinusCircle className="h-5 w-5" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={addAcademic}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b1a1a]"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Subject
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Sibling Information
                </h3>
                {siblings.map((sibling, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-md font-medium text-gray-700">
                        Sibling {index + 1}
                      </h4>
                      {siblings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSibling(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MinusCircle className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={sibling.name}
                          onChange={(e) =>
                            updateSibling(index, "name", e.target.value)
                          }
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                          placeholder="Sibling's name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="text"
                          value={sibling.age}
                          onChange={(e) =>
                            updateSibling(index, "age", e.target.value)
                          }
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                          placeholder="Sibling's age"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          School Studying In
                        </label>
                        <input
                          type="text"
                          value={sibling.school}
                          onChange={(e) =>
                            updateSibling(index, "school", e.target.value)
                          }
                          className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                          placeholder="School name"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSibling}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b1a1a]"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Add Sibling
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium text-[#8b1a1a] mb-4 border-b pb-2">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isSingleGirlChild"
                        name="isSingleGirlChild"
                        type="checkbox"
                        checked={formData.isSingleGirlChild}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="isSingleGirlChild"
                        className="font-medium text-gray-700"
                      >
                        Single Girl Child
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isSpeciallyAbled"
                        name="isSpeciallyAbled"
                        type="checkbox"
                        checked={formData.isSpeciallyAbled}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="isSpeciallyAbled"
                        className="font-medium text-gray-700"
                      >
                        Specially Abled (Divyangjan)
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="isEWS"
                        name="isEWS"
                        type="checkbox"
                        checked={formData.isEWS}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="isEWS"
                        className="font-medium text-gray-700"
                      >
                        Belonging To The EWS
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="SC"
                        checked={formData.category === "SC"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">SC</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="ST"
                        checked={formData.category === "ST"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">ST</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="General"
                        checked={formData.category === "General"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        General
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="Handicapped"
                        checked={formData.category === "Handicapped"}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Handicapped
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="aadharNo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Aadhar No
                  </label>
                  <input
                    type="text"
                    id="aadharNo"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                    placeholder="12-digit Aadhar number"
                    pattern="[0-9]{12}"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                  Declaration
                </h3>
                <p className="text-gray-700 mb-6">
                  I hereby declare that the above information including Name of
                  the Candidate, Father&apos;s/Guardian&apos;s Name,
                  Mother&apos;s name and Date of Birth furnished by me is
                  correct to the best of my knowledge & belief. I shall abide by
                  the rules of the school.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="declarationDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="declarationDate"
                      name="declarationDate"
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                      readOnly
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="declarationPlace"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Place
                    </label>
                    <input
                      type="text"
                      id="declarationPlace"
                      name="declarationPlace"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" />
                  Submit Admission Form
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  By submitting this form, you agree to the terms and conditions
                  of the school.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
