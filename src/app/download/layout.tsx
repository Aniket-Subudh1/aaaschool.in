import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "Download Center | Aryavart Ancient Academy - Academic Resources",
  description:
    "Access and download academic resources, study materials, syllabus, and important documents from Aryavart Ancient Academy. Keep up with your educational needs with our comprehensive collection of downloadable resources.",
  keywords: [
    "school downloads",
    "study materials download",
    "educational resources",
    "syllabus download",
    "school documents",
    "CBSE study materials",
    "school forms download",
    "academic calendar download",
    "prescribed booklist",
    "school circulars",
    "educational PDFs",
  ],
  openGraph: {
    type: "website",
    url: "https://aaaschool.in/download",
    title: "Download Center | Aryavart Ancient Academy",
    description:
      "Access and download academic materials, syllabus, and important documents. Find all the resources you need for your academic journey.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Download Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Center | Aryavart Ancient Academy",
    description:
      "Access and download academic materials, syllabus, and important documents for your educational needs.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="download-center-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Download Center | Aryavart Ancient Academy",
          "description": "Access and download academic resources, study materials, syllabus, and important documents from Aryavart Ancient Academy",
          "url": "https://aaaschool.in/download",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://aaaschool.in"
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Academic Materials",
                "description": "Syllabus, textbooks, and study guides for all classes"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Official Documents",
                "description": "School brochures, annual reports, and official documents"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Forms & Applications",
                "description": "Admission forms, transfer certificates, and other application forms"
              }
            ]
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
