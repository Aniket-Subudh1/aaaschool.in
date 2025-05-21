import type { Metadata, Viewport } from "next";
import Script from "next/script";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Contact Us | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Contact",
  },
  description:
    "Get in touch with Aryavart Ancient Academy in Khordha, Odisha. We're here to answer your questions about admissions, academics, infrastructure, and more. Contact our dedicated team for personalized assistance.",
  keywords: [
    "contact Aryavart Academy",
    "school contact details",
    "Khordha school contact",
    "Odisha school enquiry",
    "school phone number",
    "school email address",
    "school location map",
    "admission contact",
    "feedback form",
    "school visiting hours",
    "school directions",
    "school contact information"
  ],
  applicationName: "Aryavart Ancient Academy Contact Portal",
  authors: [{ name: "Aryavart Ancient Academy" }],
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
    url: "https://www.aaaschool.in/contact",
    title: "Contact Us | Aryavart Ancient Academy",
    description:
      "Reach out to Aryavart Ancient Academy for inquiries about admissions, academics, or to schedule a campus visit. Our team is ready to assist you.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Contact Information",
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
    title: "Contact Us | Aryavart Ancient Academy",
    description:
      "Connect with Aryavart Ancient Academy in Khordha, Odisha. Our dedicated team is here to assist with all your queries.",
    images: ["/contact-twitter.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/contact",
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
          "url": "https://www.aaaschool.in/contact",
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
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "20.1744",
              "longitude": "85.6179"
            },
            "telephone": "+91-9124654094",
            "email": "aryavartaa.krd@gmail.com",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-9124654094",
                "email": "aryavartaa.krd@gmail.com",
                "contactType": "Customer Service",
                "areaServed": "Khordha, Odisha",
                "availableLanguage": ["English", "Hindi", "Odia"]
              },
              {
                "@type": "ContactPoint",
                "telephone": "+91-9124654094",
                "email": "admission@aaaschool.in",
                "contactType": "Admissions",
                "areaServed": "Khordha, Odisha",
                "availableLanguage": ["English", "Hindi", "Odia"]
              }
            ],
            "sameAs": [
              "https://www.instagram.com/aaaschoolkrd/?hl=en",
              "http://facebook.com/aaaschoolkrd/?locale=ms_MY",
              "https://x.com/aaaschool",
              "https://www.youtube.com/@aaaschool"
            ]
          },
          "mainEntity": {
            "@type": "Organization",
            "name": "Aryavart Ancient Academy",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9124654094",
              "email": "aryavartaa.krd@gmail.com",
              "contactType": "Customer Service",
              "availableLanguage": ["English", "Hindi", "Odia"],
              "hoursAvailable": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "16:00"
              }
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
                "name": "Contact Us",
                "item": "https://www.aaaschool.in/contact"
              }
            ]
          },
          "potentialAction": {
            "@type": "CommunicateAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "mailto:aryavartaa.krd@gmail.com",
              "actionPlatform": [
                "http://schema.org/EmailAction"
              ]
            }
          }
        })}
      </Script>

      {/* FAQ Schema for Contact Page */}
      <Script
        id="faq-contact-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can I contact Aryavart Ancient Academy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can contact us through multiple channels: Call us at +91-9124654094, email us at aryavartaa.krd@gmail.com, fill out the contact form on our website, or visit our campus during office hours (Monday to Saturday, 8 AM to 4 PM)."
              }
            },
            {
              "@type": "Question",
              "name": "Where is Aryavart Ancient Academy located?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Aryavart Ancient Academy is located in Khordha, Odisha. You can find our campus at [School Address]. We're conveniently accessible from major parts of Khordha and surrounding areas."
              }
            },
            {
              "@type": "Question",
              "name": "What are the school's office hours?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our administrative office is open from Monday to Saturday, 8:00 AM to 4:00 PM. The office remains closed on Sundays and designated holidays."
              }
            },
            {
              "@type": "Question",
              "name": "How can I schedule a campus visit?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To schedule a campus visit, please contact our office at +91-9124654094 or email us at aryavartaa.krd@gmail.com. Campus tours are generally available on weekdays, and it's recommended to book at least 2-3 days in advance."
              }
            }
          ]
        })}
      </Script>

      <NavBar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}