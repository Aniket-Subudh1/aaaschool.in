import type { Metadata } from "next";
import React from "react";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "About Aryavart Ancient Academy | Holistic Education in Odisha",
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
  ],
  alternates: {
    canonical: "https://www.aaaschool.in/about",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aaaschool.in/about",
    title: "About Aryavart Ancient Academy | Leading School in Odisha",
    description:
      "Learn about our journey of excellence in education, blending modern curriculum with timeless Indian values and heritage at Aryavart Ancient Academy.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/about-hero.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Campus in Khordha, Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AryavartAcademy",
    creator: "@AryavartAcademy",
    title: "About Aryavart Ancient Academy | Leading School in Odisha",
    description:
      "Experience our unique educational approach that combines modern pedagogy with ancient Indian wisdom and cultural values.",
    images: "/about-hero.png",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-x-hidden">
      <NavBar />
      <div>{children}</div>
      <Footer />
    </section>
  );
}
