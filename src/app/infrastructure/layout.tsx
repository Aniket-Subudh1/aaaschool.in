import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "World-Class Infrastructure | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Infrastructure",
  },
  description:
    "Explore our state-of-the-art campus, modern laboratories, sports facilities, and specialized learning spaces designed to nurture holistic education at Aryavart Ancient Academy in Khordha, Odisha.",
  keywords: [
    "Aryavart Academy infrastructure",
    "school campus Khordha",
    "CBSE school facilities",
    "modern laboratories",
    "sports facilities",
    "school library",
    "music room",
    "art studio",
    "educational infrastructure",
    "Odisha best school campus",
    "interactive campus map",
    "school virtual tour",
    "meditation gardens",
    "school safety and security",
    "smart classrooms",
    "school library facilities",
    "sports grounds",
    "auditorium",
    "indoor sports complex",
    "science labs"
  ],
  applicationName: "Aryavart Ancient Academy Campus Explorer",
  authors: [{ name: "Aryavart Ancient Academy Facilities Team" }],
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
    url: "https://www.aaaschool.in/infrastructure",
    title: "World-Class Infrastructure | Aryavart Ancient Academy",
    description:
      "Explore our campus featuring modern classrooms, laboratories, sports facilities, and specialized learning spaces designed for holistic education.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/infrastructure-og.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Campus",
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
    title: "World-Class Infrastructure | Aryavart Ancient Academy",
    description:
      "Discover our campus blending traditional architecture with modern educational facilities at Aryavart Ancient Academy, Khordha.",
    images: ["https://www.aaaschool.in/infrastructure-twitter.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-domain-verification",
  },
  category: "Education",
  alternates: {
    canonical: "https://www.aaaschool.in/infrastructure",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8b1a1a",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#8b1a1a",
    "theme-color": "#8b1a1a",
  },
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#8b1a1a",
};

export default function InfrastructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f3e9]/10 flex flex-col relative">
      {/* Structured data for the school infrastructure */}
      <Script
        id="infrastructure-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Infrastructure | Aryavart Ancient Academy",
          "description": "Explore our world-class infrastructure and facilities designed to provide an optimal learning environment",
          "url": "https://www.aaaschool.in/infrastructure",
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
            "telephone": "+91-9124654094",
            "email": "aryavartaa.krd@gmail.com",
            "sameAs": [
              "https://www.instagram.com/aaaschoolkrd/?hl=en",
              "http://facebook.com/aaaschoolkrd/?locale=ms_MY",
              "https://x.com/aaaschool",
              "https://www.youtube.com/@aaaschool"
            ],
            "facility": [
              {
                "@type": "Place",
                "name": "Main Academic Building",
                "description": "Houses modern classrooms, administrative offices, and student support services"
              },
              {
                "@type": "Place",
                "name": "Multipurpose Auditorium",
                "description": "500-seat auditorium for assemblies, cultural programs, and events"
              },
              {
                "@type": "Place",
                "name": "Science Laboratories",
                "description": "Fully equipped physics, chemistry, and biology labs for practical learning"
              },
              {
                "@type": "Place",
                "name": "Computer Laboratory",
                "description": "Modern computer lab with high-speed internet access"
              },
              {
                "@type": "Place",
                "name": "Sports Facilities",
                "description": "Sports field, basketball courts, and indoor sports complex"
              },
              {
                "@type": "Place",
                "name": "Library",
                "description": "Extensive library with over 10,000 books, journals, and digital resources"
              },
              {
                "@type": "Place",
                "name": "Music Room",
                "description": "Dedicated space for music education"
              },
              {
                "@type": "Place",
                "name": "Art Studio",
                "description": "Creative space for drawing, painting, pottery, and other visual arts"
              }
            ],
            "numberOfRooms": "24",
            "amenityFeature": [
              {
                "@type": "LocationFeatureSpecification",
                "name": "Wi-Fi",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Air Conditioning",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Smart Classrooms",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Library",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Sports Grounds",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Laboratory",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "Auditorium",
                "value": true
              },
              {
                "@type": "LocationFeatureSpecification",
                "name": "CCTV Surveillance",
                "value": true
              }
            ]
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Campus",
                "item": {
                  "@type": "Thing",
                  "name": "Main Campus Facilities",
                  "description": "Academic buildings, auditorium, and gardens"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Laboratories",
                "item": {
                  "@type": "Thing",
                  "name": "Educational Laboratories",
                  "description": "Science, computer, and language labs"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Sports Facilities",
                "item": {
                  "@type": "Thing",
                  "name": "Sports Infrastructure",
                  "description": "Outdoor and indoor sports facilities"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Specialized Facilities",
                "item": {
                  "@type": "Thing",
                  "name": "Specialized Learning Spaces",
                  "description": "Library, music room, art studio, and smart classrooms"
                }
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
                "name": "Infrastructure",
                "item": "https://www.aaaschool.in/infrastructure"
              }
            ]
          },
          "specialty": "Modern educational facilities blended with traditional architecture",
          "potentialAction": {
            "@type": "ViewAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.aaaschool.in/infrastructure/virtual-tour",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            }
          }
        })}
      </Script>

      {/* FAQPage for Infrastructure FAQ */}
      <Script
        id="faq-infrastructure-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How large is the Aryavart Ancient Academy campus?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our campus spans 35 acres of lush green environment, providing ample space for academic buildings, sports facilities, and outdoor learning areas."
              }
            },
            {
              "@type": "Question",
              "name": "What laboratory facilities are available at Aryavart Ancient Academy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We have fully equipped physics, chemistry, biology, and computer laboratories with modern equipment and technology to support hands-on learning experiences."
              }
            },
            {
              "@type": "Question",
              "name": "What sports facilities are available on campus?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our campus features an expansive sports field with a 400-meter track, basketball and volleyball courts, and an indoor sports complex for table tennis, chess, and other indoor games."
              }
            },
            {
              "@type": "Question",
              "name": "Does the school have a library?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, our central library houses over 10,000 books, journals, and digital resources to support academic excellence in a comfortable and inviting space."
              }
            },
            {
              "@type": "Question",
              "name": "What safety measures are in place at Aryavart Ancient Academy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We prioritize safety with 24/7 security personnel, CCTV surveillance throughout the campus, and comprehensive fire safety systems including alarms, extinguishers, and regular evacuation drills."
              }
            }
          ]
        })}
      </Script>

      {/* Virtual Tour Event Structured Data */}
      <Script
        id="virtualtour-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          "name": "Aryavart Ancient Academy Virtual Campus Tour",
          "description": "Experience our world-class infrastructure and facilities with our interactive virtual tour",
          "image": "https://www.aaaschool.in/virtual-tour-image.jpg",
          "url": "https://www.aaaschool.in/infrastructure/virtual-tour",
          "startDate": "2023-01-01T00:00:00+05:30",
          "endDate": "2025-12-31T23:59:59+05:30",
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": {
            "@type": "VirtualLocation",
            "url": "https://www.aaaschool.in/infrastructure/virtual-tour"
          },
          "organizer": {
            "@type": "Organization",
            "name": "Aryavart Ancient Academy",
            "url": "https://www.aaaschool.in"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://www.aaaschool.in/infrastructure/virtual-tour",
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "validFrom": "2023-01-01T00:00:00+05:30"
          }
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
            gtag('config', 'G-YOUR_GA_MEASUREMENT_ID', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}