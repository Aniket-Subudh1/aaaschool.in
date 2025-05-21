import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Mandatory Disclosure | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Disclosures",
  },
  description:
    "Mandatory public disclosure of Aryavart Ancient Academy as per CBSE requirements, including general information, documents, academic results, staff details, and infrastructure. Ensuring transparency and compliance with educational standards.",
  keywords: [
    "CBSE mandatory disclosure",
    "school transparency",
    "Aryavart Ancient Academy disclosure",
    "school information",
    "CBSE compliance",
    "school documents",
    "academic results",
    "staff details",
    "school infrastructure",
    "fee structure",
    "Khordha school disclosure",
    "Odisha education transparency",
    "school affiliation details",
    "educational standards compliance"
  ],
  applicationName: "Aryavart Ancient Academy Disclosure Portal",
  authors: [{ name: "Aryavart Ancient Academy Administration" }],
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aaaschool.in/disclosure",
    title: "Mandatory Disclosure | Aryavart Ancient Academy",
    description:
      "Access mandatory public disclosure information of Aryavart Ancient Academy as per CBSE requirements. Review our academic standards, infrastructure, and compliance documentation.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-disclosure.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Mandatory Disclosure",
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
    title: "Mandatory Disclosure | Aryavart Ancient Academy",
    description:
      "Access mandatory public disclosure information of Aryavart Ancient Academy as per CBSE requirements. Transparency in educational standards.",
    images: ["https://www.aaaschool.in/twitter-disclosure.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/disclosure",
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

export default function DisclosureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col`}>
      {/* Structured Data for Disclosure Page */}
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
          "url": "https://www.aaaschool.in/disclosure",
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
            "foundingDate": "2010",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "School Address Line",
              "addressLocality": "Khordha",
              "addressRegion": "Odisha",
              "postalCode": "752056",
              "addressCountry": "IN"
            },
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "CBSE Affiliation",
              "recognizedBy": "Central Board of Secondary Education, India"
            },
            "publishingPrinciples": "https://www.aaaschool.in/disclosure"
          },
          "mainEntity": {
            "@type": "Report",
            "name": "CBSE Mandatory Public Disclosure",
            "about": {
              "@type": "EducationalOrganization",
              "name": "Aryavart Ancient Academy"
            },
            "datePublished": "2024-04-01",
            "dateModified": "2024-04-01",
            "creator": {
              "@type": "Organization",
              "name": "Aryavart Ancient Academy"
            }
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
                "name": "Mandatory Disclosure",
                "item": "https://www.aaaschool.in/disclosure"
              }
            ]
          },
          "specialty": "Transparency in educational standards and CBSE compliance",
          "potentialAction": {
            "@type": "ReadAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.aaaschool.in/disclosure",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            }
          }
        })}
      </Script>

      {/* Table-based Structure for Disclosure Content */}
      <Script
        id="disclosure-table-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Table",
          "about": "CBSE Mandatory Disclosure Information",
          "name": "Aryavart Ancient Academy Mandatory Disclosure Table",
          "description": "Tabular data containing all mandatory disclosure information as per CBSE requirements",
          "isPartOf": {
            "@type": "WebPage",
            "url": "https://www.aaaschool.in/disclosure"
          },
          "creator": {
            "@type": "Organization",
            "name": "Aryavart Ancient Academy"
          },
          "url": "https://www.aaaschool.in/disclosure#tables",
          "datePublished": "2024-04-01",
          "dateModified": "2024-04-01"
        })}
      </Script>

      {/* Global Site Tag for Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_MEASUREMENT_ID`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_GA_MEASUREMENT_ID');
          `,
        }}
      />

      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}