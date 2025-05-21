import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Academics | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Academics",
  },
  description:
    "Discover our comprehensive academic programs combining traditional wisdom with modern curriculum. Explore our faculty, courses, and educational approach at Aryavart Ancient Academy.",
  keywords: [
    "Aryavart Ancient Academy academics",
    "school curriculum",
    "educational programs",
    "faculty",
    "teaching methodology",
    "Odisha education",
    "holistic learning",
    "academic excellence",
    "traditional learning",
    "modern education",
    "Khordha school academics",
    "CBSE curriculum",
    "academic achievements",
    "student assessment",
    "learning outcomes",
  ],
  applicationName: "Aryavart Ancient Academy Academic Portal",
  authors: [{ name: "Aryavart Ancient Academy Academic Team" }],
  generator: "Next.js",
  referrer: "origin",
  publisher: "Aryavart Ancient Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aaaschool.in/academics",
    title: "Academics | Aryavart Ancient Academy",
    description:
      "Explore our academic excellence, learn about our faculty, curriculum, teaching methodology, and more at Aryavart Ancient Academy.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/academics-og.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Academics",
      },
      {
        url: "/aaa.png",
        width: 600,
        height: 600,
        alt: "Aryavart Ancient Academy Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academics | Aryavart Ancient Academy",
    description:
      "Discover our holistic approach to education blending traditional wisdom with modern curriculum at Aryavart Ancient Academy.",
    images: ["https://www.aaaschool.in/academics-twitter.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/academics",
  },
  category: "Education",
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#8b1a1a",
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
          "url": "https://www.aaaschool.in/academics",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://www.aaaschool.in"
          },
          "about": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "description": "A premier educational institution in Khordha, Odisha, offering holistic education",
            "url": "https://www.aaaschool.in",
            "logo": "https://www.aaaschool.in/aaa.png",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "School Address Line",
              "addressLocality": "Khordha",
              "addressRegion": "Odisha",
              "postalCode": "752056",
              "addressCountry": "IN"
            }
          },
          "mainEntity": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "CBSE Affiliated",
                "credentialCategory": "School Board",
              }
            ],
            "offers": {
              "@type": "Offer",
              "category": "Educational Program",
              "description": "Comprehensive academic programs from primary to secondary education"
            },
            "department": [
              {
                "@type": "Organization",
                "name": "Mathematics Department",
                "description": "Offering courses in mathematics at all levels"
              },
              {
                "@type": "Organization",
                "name": "Science Department",
                "description": "Offering comprehensive science education including Physics, Chemistry and Biology"
              },
              {
                "@type": "Organization",
                "name": "Languages Department",
                "description": "Offering language courses in English, Hindi, and Sanskrit"
              },
              {
                "@type": "Organization",
                "name": "Social Studies Department",
                "description": "Offering courses in History, Geography, Civics and Economics"
              }
            ]
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.aaaschool.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Academics",
                "item": "https://www.aaaschool.in/academics"
              }
            ]
          },
          "specialty": "Holistic education blending modern curriculum with ancient wisdom",
          "keywords": "CBSE curriculum, holistic education, academic excellence, traditional learning, modern education"
        })}
      </Script>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}