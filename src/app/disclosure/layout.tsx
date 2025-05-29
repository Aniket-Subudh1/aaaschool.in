import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "Mandatory Disclosure | Aryavart Ancient Academy - CBSE Compliance",
  description:
    "Mandatory public disclosure of Aryavart Ancient Academy as per CBSE requirements, including general information, documents, academic results, staff details, and infrastructure. Ensuring transparency and compliance with educational standards.",
  keywords: [
    "CBSE mandatory disclosure",
    "school transparency",
    "Aryavart Ancient Academy disclosure",
    "CBSE compliance",
    "school documents",
    "academic results transparency",
    "staff details disclosure",
    "school infrastructure details",
    "fee structure transparency",
    "educational standards compliance",
  ],
  openGraph: {
    type: "website",
    url: "https://aaaschool.in/disclosure",
    title: "Mandatory Disclosure | Aryavart Ancient Academy",
    description:
      "Access mandatory public disclosure information of Aryavart Ancient Academy as per CBSE requirements. Review our academic standards, infrastructure, and compliance documentation.",
    images: [
      {
        url: "/seo.png",
        width: 1200, 
        height: 630,
        alt: "Aryavart Ancient Academy Mandatory Disclosure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandatory Disclosure | Aryavart Ancient Academy",
    description:
      "Access mandatory public disclosure information of Aryavart Ancient Academy as per CBSE requirements. Transparency in educational standards.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function DisclosureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="disclosure-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Mandatory Disclosure | Aryavart Ancient Academy",
          "description": "Mandatory public disclosure of Aryavart Ancient Academy as per CBSE requirements",
          "url": "https://aaaschool.in/disclosure",
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
              "credentialCategory": "CBSE Affiliation",
              "recognizedBy": "Central Board of Secondary Education, India"
            }
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}