import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "World-Class Infrastructure | Aryavart Ancient Academy - Modern Facilities",
  description:
    "Explore our state-of-the-art campus, modern laboratories, sports facilities, and specialized learning spaces designed to nurture holistic education at Aryavart Ancient Academy in Khordha, Odisha.",
  keywords: [
    "Aryavart Academy infrastructure",
    "school campus Khordha",
    "CBSE school facilities",
    "modern laboratories",
    "sports facilities Odisha",
    "school library facilities",
    "music room art studio",
    "educational infrastructure",
    "smart classrooms",
    "science labs",
    "computer laboratory",
    "school auditorium",
    "campus map",
    "school safety security",
  ],
  openGraph: {
    title: "World-Class Infrastructure | Aryavart Ancient Academy",
    description:
      "Explore our campus featuring modern classrooms, laboratories, sports facilities, and specialized learning spaces designed for holistic education.",
    url: "https://aaaschool.in/infrastructure",
    type: "website",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "World-Class Infrastructure | Aryavart Ancient Academy",
    description:
      "Discover our campus blending traditional architecture with modern educational facilities at Aryavart Ancient Academy, Khordha.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function InfrastructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f3e9]/10 flex flex-col relative">
      <Script
        id="infrastructure-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Infrastructure | Aryavart Ancient Academy",
          "description": "Explore our world-class infrastructure and facilities designed to provide an optimal learning environment",
          "url": "https://aaaschool.in/infrastructure",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://aaaschool.in"
          },
          "about": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "facility": [
              {
                "@type": "Place",
                "name": "Main Academic Building",
                "description": "Houses modern classrooms, administrative offices, and student support services"
              },
              {
                "@type": "Place",
                "name": "Science Laboratories",
                "description": "Fully equipped physics, chemistry, and biology labs for practical learning"
              },
              {
                "@type": "Place",
                "name": "Sports Facilities",
                "description": "Sports field, basketball courts, and indoor sports complex"
              },
              {
                "@type": "Place",
                "name": "Library",
                "description": "Extensive library with over 10,000 books, journals, and digital resources"
              }
            ]
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}