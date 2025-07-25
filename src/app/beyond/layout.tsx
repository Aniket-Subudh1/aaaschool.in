import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aaaschool.in"),
  title: "Beyond Academics | Aryavart Ancient Academy - Extracurricular Excellence",
  description:
    "Explore our comprehensive Beyond Academics programs including clubs, sports, and service units that nurture talents, build character, and develop holistic individuals at Aryavart Ancient Academy.",
  keywords: [
    "beyond academics",
    "extracurricular activities Khordha",
    "school clubs Odisha",
    "sports programs",
    "service units",
    "holistic education",
    "student development",
    "NCC Scout Guide",
    "Taekwondo Basketball Cricket",
    "Photography Art Music Club",
    "character building",
    "talent development",
  ],
  openGraph: {
    type: "website",
    url: "https://www.aaaschool.in/beyond",
    title: "Beyond Academics | Aryavart Ancient Academy",
    description:
      "Discover a world of opportunities beyond the classroom through our diverse range of clubs, sports programs, and service units that develop skills, character, and talents.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Beyond Academics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Academics | Aryavart Ancient Academy",
    description:
      "Explore our comprehensive Beyond Academics programs including clubs, sports, and service units that nurture talents and build character.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function BeyondAcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f3e9]/10 flex flex-col relative">
      <Script
        id="beyond-academics-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Beyond Academics Programs at Aryavart Ancient Academy",
          "description": "Comprehensive extracurricular programs including clubs, sports, and service units that nurture talents and build character",
          "url": "https://www.aaaschool.in/beyond",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://www.aaaschool.in"
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Course",
                  "name": "Clubs & Activities",
                  "description": "Various clubs including Photography, Art, Dance, Chess, Coding, Music, and Robotics Club"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Course",
                  "name": "Sports Programs",
                  "description": "Sports programs including Basketball, Cricket, Taekwondo, Kho-Kho, and Kabaddi"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Course",
                  "name": "Service Units",
                  "description": "Service units including NCC, Scout & Guide, and Junior Red Cross"
                }
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