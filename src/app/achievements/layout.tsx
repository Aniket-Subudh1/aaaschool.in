import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aaaschool.in"),
  title: "Achievements | Aryavart Ancient Academy - Student Success Stories",
  description:
    "Explore the remarkable achievements of students, alumni, and faculty at Aryavart Ancient Academy. Discover academic excellence, sports accomplishments, and notable success stories from Khordha's premier educational institution.",
  keywords: [
    "school achievements",
    "student accomplishments",
    "alumni success stories",
    "Aryavart Ancient Academy awards",
    "sports achievements Khordha",
    "academic excellence Odisha",
    "school competitions results",
    "student talent showcase",
    "CBSE school accomplishments",
    "educational achievements",
    "school recognitions",
    "student awards",
  ],
  openGraph: {
    type: "website",
    url: "https://www.aaaschool.in/achievements",
    title: "Achievements | Aryavart Ancient Academy",
    description:
      "Explore our students' and alumni's achievements in academics, sports, and beyond. Celebrating excellence at Aryavart Ancient Academy.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Achievements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Aryavart Ancient Academy",
    description:
      "Explore our students' and alumni's achievements in academics, sports, and beyond. Celebrating excellence at Aryavart Ancient Academy.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="achievements-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Achievements | Aryavart Ancient Academy",
          "description": "Explore the remarkable achievements of students, alumni, and faculty at Aryavart Ancient Academy",
          "url": "https://www.aaaschool.in/achievements",
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
                  "@type": "Thing",
                  "name": "Academic Achievements",
                  "description": "Awards and recognitions in academic competitions and Olympiads"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Thing",
                  "name": "Sports Achievements",
                  "description": "Championships and medals in various sports competitions"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Thing",
                  "name": "Alumni Success",
                  "description": "Success stories of our graduates making a difference"
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
