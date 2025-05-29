import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "Admission Enquiry | Aryavart Ancient Academy - Start Your Journey",
  description:
    "Submit your admission enquiry for Aryavart Ancient Academy. Start your child's educational journey with us through a simple and straightforward enquiry process. Our team will guide you through the admission process.",
  keywords: [
    "school enquiry",
    "admission inquiry",
    "Aryavart Ancient Academy enquiry",
    "school application",
    "education enquiry",
    "admission form",
    "CBSE school admission enquiry",
    "new student enquiry",
    "school enrollment form",
    "student registration",
    "admission guidelines",
  ],
  openGraph: {
    type: "website",
    url: "https://aaaschool.in/enquiry",
    title: "Admission Enquiry | Aryavart Ancient Academy",
    description:
      "Easily submit your enquiry and take the first step towards joining Aryavart Ancient Academy. Our admission team will guide you through the process.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Admission Enquiry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admission Enquiry | Aryavart Ancient Academy",
    description:
      "Easily submit your enquiry and take the first step towards joining Aryavart Ancient Academy. Our admission team will guide you through the process.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function EnquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="enquiry-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Admission Enquiry | Aryavart Ancient Academy",
          "description": "Submit your admission enquiry for Aryavart Ancient Academy",
          "url": "https://aaaschool.in/enquiry",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://aaaschool.in"
          },
          "mainEntity": {
            "@type": "WebForm",
            "name": "Admission Enquiry Form",
            "target": "https://aaaschool.in/api/enquiries",
            "encodingType": "application/json",
            "method": "POST"
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}