import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "Academics | Aryavart Ancient Academy - CBSE Curriculum Excellence",
  description:
    "Discover our comprehensive academic programs combining traditional wisdom with modern CBSE curriculum. Explore our faculty, courses, and educational approach at Aryavart Ancient Academy.",
  keywords: [
    "Aryavart Ancient Academy academics",
    "CBSE school curriculum",
    "educational programs Khordha",
    "qualified faculty Odisha",
    "teaching methodology",
    "holistic learning approach",
    "academic excellence",
    "traditional learning",
    "modern education Odisha",
    "student assessment",
    "learning outcomes",
    "academic achievements",
  ],
  openGraph: {
    type: "website",
    url: "https://aaaschool.in/academics",
    title: "Academics | Aryavart Ancient Academy",
    description:
      "Explore our academic excellence, learn about our faculty, curriculum, teaching methodology, and educational programs at Aryavart Ancient Academy.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Academics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academics | Aryavart Ancient Academy",
    description:
      "Discover our holistic approach to education blending traditional wisdom with modern CBSE curriculum at Aryavart Ancient Academy.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f3e9]/10 flex flex-col relative">
      <Script
        id="academics-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Academics | Aryavart Ancient Academy",
          "description": "Comprehensive academic programs from primary to secondary education combining traditional wisdom with modern curriculum",
          "url": "https://aaaschool.in/academics",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://aaaschool.in"
          },
          "about": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "name": "CBSE Affiliated",
              "credentialCategory": "School Board"
            }
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
