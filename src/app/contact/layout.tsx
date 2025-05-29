import type { Metadata } from "next";
import Script from "next/script";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "Contact Us | Aryavart Ancient Academy - Get in Touch",
  description:
    "Get in touch with Aryavart Ancient Academy in Khordha, Odisha. We're here to answer your questions about admissions, academics, infrastructure, and more. Contact our dedicated team for personalized assistance.",
  keywords: [
    "contact Aryavart Academy",
    "school contact details Khordha",
    "Odisha school enquiry",
    "school phone number",
    "school email address",
    "school location map",
    "admission contact",
    "feedback form",
    "school visiting hours",
    "school directions",
    "contact information",
  ],
  openGraph: {
    type: "website",
    url: "https://aaaschool.in/contact",
    title: "Contact Us | Aryavart Ancient Academy",
    description:
      "Reach out to Aryavart Ancient Academy for inquiries about admissions, academics, or to schedule a campus visit. Our team is ready to assist you.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Contact Information",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Aryavart Ancient Academy",
    description:
      "Connect with Aryavart Ancient Academy in Khordha, Odisha. Our dedicated team is here to assist with all your queries.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="contact-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Us | Aryavart Ancient Academy",
          "description": "Get in touch with Aryavart Ancient Academy. We're here to answer your questions and provide information about admissions, academics, and more.",
          "url": "https://aaaschool.in/contact",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://aaaschool.in"
          },
          "about": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "telephone": "+91-9124654094",
            "email": "aryavartaa.krd@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "School Address Line",
              "addressLocality": "Khordha",
              "addressRegion": "Odisha",
              "postalCode": "752056",
              "addressCountry": "IN"
            }
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
