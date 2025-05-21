import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Admission Enquiry | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Enquiries",
  },
  description:
    "Submit your admission enquiry for Aryavart Ancient Academy. Start your child's educational journey with us through a simple and straightforward enquiry process. Our team will guide you through the admission process.",
  keywords: [
    "school enquiry",
    "admission inquiry",
    "Aryavart Ancient Academy",
    "school application",
    "education enquiry",
    "admission form",
    "CBSE school admission",
    "Khordha school enquiry",
    "Odisha school admission",
    "new student enquiry",
    "school admission process",
    "school enrollment form",
    "student registration"
  ],
  applicationName: "Aryavart Ancient Academy Enquiry Portal",
  authors: [{ name: "Aryavart Ancient Academy Admission Team" }],
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
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aaaschool.in/enquiry",
    title: "Admission Enquiry | Aryavart Ancient Academy",
    description:
      "Easily submit your enquiry and take the first step towards joining Aryavart Ancient Academy. Our admission team will guide you through the process.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-enquiry.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Admission Enquiry",
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
    title: "Admission Enquiry | Aryavart Ancient Academy",
    description:
      "Easily submit your enquiry and take the first step towards joining Aryavart Ancient Academy. Our admission team will guide you through the process.",
    images: ["https://www.aaaschool.in/twitter-enquiry.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/enquiry",
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

export default function EnquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col`}>
      {/* Structured Data for School Enquiry */}
      <Script
        id="school-enquiry-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Admission Enquiry | Aryavart Ancient Academy",
          "description": "Submit your admission enquiry for Aryavart Ancient Academy",
          "url": "https://www.aaaschool.in/enquiry",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Aryavart Ancient Academy",
            "url": "https://www.aaaschool.in"
          },
          "about": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "description": "A premier educational institution dedicated to holistic student development",
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
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9124654094",
              "email": "aryavartaa.krd@gmail.com",
              "contactType": "Admission Enquiry",
              "areaServed": "Khordha, Odisha",
              "availableLanguage": ["English", "Hindi", "Odia"]
            },
            "sameAs": [
              "https://www.instagram.com/aaaschoolkrd/?hl=en",
              "http://facebook.com/aaaschoolkrd/?locale=ms_MY",
              "https://x.com/aaaschool",
              "https://www.youtube.com/@aaaschool"
            ]
          },
          "mainEntity": {
            "@type": "WebForm",
            "name": "Admission Enquiry Form",
            "target": "https://www.aaaschool.in/api/enquiries",
            "encodingType": "application/json",
            "method": "POST",
            "requiredFieldSet": {
              "@type": "RequiredFieldSet",
              "requiredField": [
                "parentName",
                "studentName",
                "mobileNumber",
                "classApplied",
                "location",
                "email"
              ]
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
                "name": "Admission",
                "item": "https://www.aaaschool.in/admission"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Enquiry",
                "item": "https://www.aaaschool.in/enquiry"
              }
            ]
          },
          "potentialAction": {
            "@type": "ApplyAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.aaaschool.in/enquiry",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            },
            "result": {
              "@type": "EnrollAction",
              "object": {
                "@type": "EducationalOccupationalProgram",
                "name": "Aryavart Ancient Academy Educational Program",
                "provider": {
                  "@type": "EducationalOrganization",
                  "name": "Aryavart Ancient Academy"
                }
              }
            }
          }
        })}
      </Script>

      {/* FAQ Schema for Enquiry Page */}
      <Script
        id="faq-enquiry-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I start the admission process at Aryavart Ancient Academy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The first step in our admission process is to submit an enquiry form with basic details about the student and parent. Once approved, you will receive an enquiry number that will be required to fill the complete admission form."
              }
            },
            {
              "@type": "Question",
              "name": "What information do I need to provide in the enquiry form?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "In the enquiry form, you need to provide basic information including parent name, student name, contact number, email address, class applied for, and your location. This helps our admission team to evaluate and guide you through the next steps."
              }
            },
            {
              "@type": "Question",
              "name": "How long does it take to process an admission enquiry?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We typically process admission enquiries within 2-3 working days. Our team reviews each enquiry and responds with either an enquiry number or a request for additional information as needed."
              }
            },
            {
              "@type": "Question",
              "name": "Can I check the status of my admission enquiry?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, you can check the status of your admission enquiry by contacting our admission office at +91-9124654094 or by emailing us at aryavartaa.krd@gmail.com with your reference details."
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
        aria-label="Main Content"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}