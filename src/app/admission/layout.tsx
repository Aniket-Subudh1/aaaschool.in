import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Admission Process | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Admissions",
  },
  description:
    "Comprehensive admission process for Aryavart Ancient Academy. Discover our streamlined steps for student enrollment, enquiry, and application. Join our premier school in Khordha, Odisha for a holistic educational experience.",
  keywords: [
    "school admission",
    "student enrollment",
    "Aryavart Ancient Academy",
    "school application process",
    "education admission",
    "CBSE school admission",
    "Khordha school enrollment",
    "Odisha school admission",
    "quality education admission",
    "new student registration",
    "academic session admission",
    "school admission requirements",
    "admission enquiry form",
  ],
  applicationName: "Aryavart Ancient Academy Admission Portal",
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
    url: "https://www.aaaschool.in/admission",
    title: "Admission Process | Aryavart Ancient Academy",
    description:
      "Navigate the admission journey at Aryavart Ancient Academy with our user-friendly process. Start your child's educational journey with us today.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-admission.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Admission Process",
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
    title: "Admission Process | Aryavart Ancient Academy",
    description:
      "Navigate the admission journey at Aryavart Ancient Academy with our user-friendly process. Start your child's educational journey with us today.",
    images: ["https://www.aaaschool.in/twitter-admission.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/admission",
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

export default function AdmissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col overflow-hidden`}>
      <Script
        id="school-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Admission Process | Aryavart Ancient Academy",
          "description": "Comprehensive admission process for student enrollment at Aryavart Ancient Academy",
          "url": "https://www.aaaschool.in/admission",
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
            }
          },
          "mainEntity": {
            "@type": "HowTo",
            "name": "How to Apply for Admission at Aryavart Ancient Academy",
            "description": "Step by step process for applying to Aryavart Ancient Academy",
            "totalTime": "PT2H",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Submit an Enquiry",
                "text": "Fill out the admission enquiry form with basic details about the student and parent.",
                "url": "https://www.aaaschool.in/enquiry"
              },
              {
                "@type": "HowToStep",
                "name": "Verify Enquiry Number",
                "text": "Once your enquiry is approved, you will receive an enquiry number for the full admission form."
              },
              {
                "@type": "HowToStep",
                "name": "Complete Admission Form",
                "text": "Fill out the detailed admission form with all required information.",
                "url": "https://www.aaaschool.in/admission/verify"
              },
              {
                "@type": "HowToStep",
                "name": "Admission Confirmation",
                "text": "Our team will review your application and contact you regarding the next steps."
              }
            ],
            "tool": {
              "@type": "HowToTool",
              "name": "Online Admission Form"
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
              }
            ]
          },
          "offers": {
            "@type": "Offer",
            "category": "Educational Program",
            "availability": "https://schema.org/InStock",
            "price": "0",
            "priceCurrency": "INR",
            "validFrom": "2024-01-01",
            "url": "https://www.aaaschool.in/admission"
          },
          "specialty": "Holistic education blending modern curriculum with ancient wisdom",
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

      {/* FAQ Schema for Admission Page */}
      <Script
        id="faq-admission-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the admission process at Aryavart Ancient Academy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The admission process involves four steps: 1) Submit an enquiry form, 2) Verify enquiry number once approved, 3) Complete the detailed admission form, and 4) Wait for admission confirmation from our team."
              }
            },
            {
              "@type": "Question",
              "name": "What documents are required for admission?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Required documents include birth certificate, previous school records, transfer certificate (if applicable), passport-sized photographs, address proof, and parent/guardian ID proof."
              }
            },
            {
              "@type": "Question",
              "name": "When does the admission process start?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The admission process typically begins in January for the next academic year. However, we accept applications throughout the year based on seat availability."
              }
            },
            {
              "@type": "Question",
              "name": "How can I contact the admission office?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can contact our admission office at +91-9124654094 or email us at aryavartaa.krd@gmail.com for any admission-related queries."
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