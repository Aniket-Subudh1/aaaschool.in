import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aaaschool.in"),
  title: "Admission Process | Aryavart Ancient Academy - Join Our School",
  description:
    "Comprehensive admission process for Aryavart Ancient Academy. Discover our streamlined steps for student enrollment, enquiry, and application. Join our premier CBSE school in Khordha, Odisha for a holistic educational experience.",
  keywords: [
    "school admission Khordha",
    "student enrollment",
    "Aryavart Ancient Academy admission",
    "CBSE school admission Odisha",
    "school application process",
    "new student registration",
    "admission enquiry form",
    "school admission requirements",
    "quality education admission",
    "academic session admission",
    "school enrollment form",
    "admission guidelines",
  ],
  openGraph: {
    type: "website",
    url: "https://www.aaaschool.in/admission",
    title: "Admission Process | Aryavart Ancient Academy",
    description:
      "Navigate the admission journey at Aryavart Ancient Academy with our user-friendly process. Start your child's educational journey with us today.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Admission Process",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admission Process | Aryavart Ancient Academy",
    description:
      "Navigate the admission journey at Aryavart Ancient Academy with our user-friendly process. Start your child's educational journey with us today.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Script
        id="admission-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Admission Process | Aryavart Ancient Academy",
          "description": "Comprehensive admission process for student enrollment at Aryavart Ancient Academy",
          "url": "https://www.aaaschool.in/admission",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://www.aaaschool.in"
          },
          "mainEntity": {
            "@type": "HowTo",
            "name": "How to Apply for Admission at Aryavart Ancient Academy",
            "description": "Step by step process for applying to Aryavart Ancient Academy",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Submit an Enquiry",
                "text": "Fill out the admission enquiry form with basic details about the student and parent."
              },
              {
                "@type": "HowToStep",
                "name": "Verify Enquiry Number",
                "text": "Once your enquiry is approved, you will receive an enquiry number for the full admission form."
              },
              {
                "@type": "HowToStep",
                "name": "Complete Admission Form",
                "text": "Fill out the detailed admission form with all required information."
              },
              {
                "@type": "HowToStep",
                "name": "Admission Confirmation",
                "text": "Our team will review your application and contact you regarding the next steps."
              }
            ]
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading form...</div>}> {children}</Suspense></main>
      <Footer />
    </div>
  );
}
