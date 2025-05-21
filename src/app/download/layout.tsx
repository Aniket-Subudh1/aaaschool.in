import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Download Materials | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Downloads",
  },
  description:
    "Access and download academic resources, study materials, syllabus, and important documents from Aryavart Ancient Academy. Keep up with your educational needs with our comprehensive collection of downloadable resources.",
  keywords: [
    "school downloads",
    "study materials",
    "educational resources",
    "Aryavart Ancient Academy",
    "academic downloads",
    "syllabus download",
    "school documents",
    "educational PDFs",
    "CBSE study materials",
    "school forms",
    "Khordha school resources",
    "Odisha education materials",
    "school circulars",
    "academic calendar",
    "prescribed booklist"
  ],
  applicationName: "Aryavart Ancient Academy Download Center",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aaaschool.in/download",
    title: "Download Center | Aryavart Ancient Academy",
    description:
      "Access and download academic materials, syllabus, and important documents. Find all the resources you need for your academic journey.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-download.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Download Center",
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
    title: "Download Center | Aryavart Ancient Academy",
    description:
      "Access and download academic materials, syllabus, and important documents for your educational needs.",
    images: ["https://www.aaaschool.in/twitter-download.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/download",
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

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col`}>
      {/* Structured Data for Download Center */}
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
          "url": "https://www.aaaschool.in/download",
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
            "logo": "https://www.aaaschool.in/aaa.png"
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Academic Materials",
                "description": "Syllabus, textbooks, and study guides for all classes",
                "url": "https://www.aaaschool.in/download#academic"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Official Documents",
                "description": "School brochures, annual reports, and official documents",
                "url": "https://www.aaaschool.in/download#official"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Forms & Applications",
                "description": "Admission forms, transfer certificates, and other application forms",
                "url": "https://www.aaaschool.in/download#forms"
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
                "name": "Download Center",
                "item": "https://www.aaaschool.in/download"
              }
            ]
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.aaaschool.in/download?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </Script>

      {/* DataDownload Structured Data */}
      <Script
        id="data-download-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Aryavart Ancient Academy Educational Resources",
          "description": "Collection of downloadable educational resources including syllabus, academic calendar, and official documents",
          "url": "https://www.aaaschool.in/download",
          "keywords": [
            "syllabus",
            "academic calendar",
            "school brochure",
            "forms",
            "educational resources"
          ],
          "creator": {
            "@type": "Organization",
            "name": "Aryavart Ancient Academy",
            "url": "https://www.aaaschool.in"
          },
          "distribution": [
            {
              "@type": "DataDownload",
              "encodingFormat": "application/pdf",
              "contentUrl": "https://www.aaaschool.in/downloads/syllabus.pdf",
              "name": "Academic Syllabus"
            },
            {
              "@type": "DataDownload",
              "encodingFormat": "application/pdf",
              "contentUrl": "https://www.aaaschool.in/downloads/school-brochure.pdf",
              "name": "School Brochure"
            },
            {
              "@type": "DataDownload",
              "encodingFormat": "application/pdf",
              "contentUrl": "https://www.aaaschool.in/downloads/academic-calendar.pdf",
              "name": "Academic Calendar"
            }
          ],
          "license": "https://creativecommons.org/licenses/by-nc/4.0/",
          "isAccessibleForFree": true,
          "datePublished": "2024-01-01",
          "dateModified": "2024-05-01"
        })}
      </Script>

      {/* FAQ Schema for Download Center */}
      <Script
        id="faq-download-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What types of documents are available for download?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our download center offers various types of documents including syllabus for all classes, academic calendars, school brochures, annual reports, admission forms, transfer certificates, prescribed booklists, and other educational resources."
              }
            },
            {
              "@type": "Question",
              "name": "How do I find specific documents in the download center?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can easily find specific documents by using the search function at the top of the download page or by filtering documents by categories such as Academic Materials, Official Documents, or Forms & Applications."
              }
            },
            {
              "@type": "Question",
              "name": "In what format are the downloadable documents available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most documents are available in PDF format for easy viewing and printing. Some forms may also be available in editable formats like Word documents for convenience."
              }
            },
            {
              "@type": "Question",
              "name": "How often are the documents updated in the download center?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Documents are updated regularly according to the academic calendar. Syllabi and booklists are typically updated before the beginning of each academic year, while newsletters and circulars are added as they are published."
              }
            }
          ]
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
      <main
        className="flex-grow container mx-auto px-4 py-8"
        aria-label="Download Center"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}