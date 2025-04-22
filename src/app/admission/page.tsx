"use client";
import Link from "next/link";
import Image from "next/image";
import { ClipboardCheck, PenLine, ArrowRight } from "lucide-react";

export default function AdmissionPage() {
  return (
    <main>
      <div className="min-h-screen bg-[#f8f3e9] py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src="/aaa.png"
                  alt="Aryavart Ancient Academy Logo"
                  width={100}
                  height={100}
                  className="bg-white rounded-full p-2"
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#8b1a1a]">
              Admission Process
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
              Welcome to Aryavart Ancient Academy&apos;s admission portal.
              Follow the steps below to apply for admission.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-8">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#8b1a1a] mb-6">
                How to Apply
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#8b1a1a] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Submit an Enquiry
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Fill out the admission enquiry form with basic details
                      about the student and parent. Our team will review your
                      enquiry and provide an enquiry number if approved.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#8b1a1a] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Verify Enquiry Number
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Once your enquiry is approved, you will receive an enquiry
                      number. Use this number to proceed with the full admission
                      form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#8b1a1a] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Complete Admission Form
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Fill out the detailed admission form with all required
                      information about the student, parents, previous
                      education, and other necessary details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#8b1a1a] text-white h-8 w-8 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Admission Confirmation
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Our team will review your application and contact you
                      regarding the next steps. If approved, you will receive an
                      admission number and instructions for completing the
                      admission process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                    <PenLine size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                  New Admission Enquiry
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Start the admission process by submitting an enquiry form. Our
                  team will get back to you with next steps.
                </p>
                <Link
                  href="/enquiry"
                  className="block w-full py-3 px-4 bg-[#8b1a1a] text-white text-center rounded-md hover:bg-[#8b1a1a]/90 transition-colors flex items-center justify-center"
                >
                  Submit Enquiry
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-full">
                    <ClipboardCheck size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                  Already Have an Enquiry Number?
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  If you already have an approved enquiry number, proceed to
                  fill out the complete admission form.
                </p>
                <Link
                  href="/admission/verify"
                  className="block w-full py-3 px-4 bg-[#8b1a1a] text-white text-center rounded-md hover:bg-[#8b1a1a]/90 transition-colors flex items-center justify-center"
                >
                  Continue to Admission Form
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-[#8b1a1a] mb-4">
              Need Help?
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about the admission process or face any
              issues, please contact our admission office.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="tel:1234567890"
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-center"
              >
                Call:&nbsp;+91&nbsp;1234567890
              </a>

              <a
                href="mailto:admissions@aaaschool.in"
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-center"
              >
                Email:&nbsp;admissions@aaaschool.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
