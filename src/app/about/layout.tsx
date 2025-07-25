import type { Metadata } from "next";
import React from "react";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aaaschool.in"),
  title: "About Aryavart Ancient Academy | Holistic Education in Khordha, Odisha",
  description:
    "Discover Aryavart Ancient Academy's rich history, mission, vision, and our commitment to blending modern education with ancient wisdom in Khordha, Odisha.",
  keywords: [
    "Aryavart Academy history",
    "School mission and vision", 
    "Top CBSE school in Odisha",
    "Holistic education Khordha",
    "Ancient wisdom in education",
    "School committee",
    "Odisha premier school",
    "Cultural values education",
    "School location Khordha",
    "Best school in Odisha",
    "Educational philosophy AAA",
    "Traditional values modern education",
  ],
  openGraph: {
    title: "About Aryavart Ancient Academy | Leading School in Odisha",
    description:
      "Learn about our journey of excellence in education, blending modern curriculum with timeless Indian values and heritage at Aryavart Ancient Academy.",
    url: "https://www.aaaschool.in/about",
    type: "website",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Campus in Khordha, Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aaaschool",
    title: "About Aryavart Ancient Academy | Leading School in Odisha",
    description:
      "Experience our unique educational approach that combines modern pedagogy with ancient Indian wisdom and cultural values.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-x-hidden">
      <Script
        id="about-page-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://www.aaaschool.in"
          },
          "mainEntity": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "description": "A premier educational institution in Khordha, Odisha, offering holistic education blending modern curriculum with ancient wisdom",
            "foundingDate": "2010",
            "url": "https://www.aaaschool.in",
            "logo": "https://www.aaaschool.in/aaa.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "School Address Line",
              "addressLocality": "Khordha",
              "addressRegion": "Odisha",
              "postalCode": "752056",
              "addressCountry": "IN"
            },
            "telephone": "+91-9124654094",
            "email": "aryavartaa.krd@gmail.com",
            "sameAs": [
              "https://www.instagram.com/aaaschoolkrd/?hl=en",
              "http://facebook.com/aaaschoolkrd/?locale=ms_MY",
              "https://x.com/aaaschool",
              "https://www.youtube.com/@aaaschool"
            ]
          }
        })}
      </Script>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </section>
  );
}
