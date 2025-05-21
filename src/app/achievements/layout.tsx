import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Achievements | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Achievements",
  },
  description:
    "Explore the remarkable achievements of students, alumni, and faculty at Aryavart Ancient Academy. Discover academic excellence, sports accomplishments, and notable alumni success stories from Khordha's premier educational institution.",
  keywords: [
    "school achievements",
    "student accomplishments",
    "alumni success",
    "Aryavart Ancient Academy",
    "sports achievements",
    "academic excellence",
    "awards and recognitions",
    "school competitions results",
    "student talent showcase",
    "Khordha school achievements",
    "Odisha education excellence",
    "CBSE school accomplishments",
    "student awards",
    "academic competitions"
  ],
  applicationName: "Aryavart Ancient Academy Achievements Portal",
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
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aaaschool.in/achievements",
    title: "Achievements | Aryavart Ancient Academy",
    description:
      "Explore our students' and alumni's achievements in academics, sports, and beyond. Celebrating excellence at Aryavart Ancient Academy.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-achievements.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Achievements",
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
    title: "Achievements | Aryavart Ancient Academy",
    description:
      "Explore our students' and alumni's achievements in academics, sports, and beyond. Celebrating excellence at Aryavart Ancient Academy.",
    images: ["https://www.aaaschool.in/twitter-achievements.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/achievements",
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

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={` min-h-screen flex flex-col`}>
      <Script
        id="achievements-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Achievements | Aryavart Ancient Academy",
          "description": "Explore the remarkable achievements of students, alumni, and faculty at Aryavart Ancient Academy",
          "url": "https://www.aaaschool.in/achievements",
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
                "item": {
                  "@type": "Thing",
                  "name": "Awards & Recognition",
                  "description": "Explore our achievements and accolades in various fields",
                  "url": "https://www.aaaschool.in/achievements/awards"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Thing",
                  "name": "Sports Achievements",
                  "description": "Celebrating our students' excellence in sports competitions",
                  "url": "https://www.aaaschool.in/achievements/sports"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Thing",
                  "name": "Alumni Network",
                  "description": "Connect with our successful graduates making a difference",
                  "url": "https://www.aaaschool.in/achievements/alumni"
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
                "name": "Achievements",
                "item": "https://www.aaaschool.in/achievements"
              }
            ]
          },
          "specialty": "Academic excellence and holistic student development",
          "potentialAction": {
            "@type": "ViewAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.aaaschool.in/achievements",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            }
          }
        })}
      </Script>

      {/* Achievement Collection Data */}
      <Script
        id="achievements-collection-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Aryavart Ancient Academy Achievements",
          "description": "A collection of achievements and accolades earned by students and faculty of Aryavart Ancient Academy",
          "url": "https://www.aaaschool.in/achievements",
          "hasPart": [
            {
              "@type": "ItemPage",
              "name": "Academic Achievements",
              "description": "Awards and recognitions in academic competitions and Olympiads",
              "url": "https://www.aaaschool.in/achievements#academic"
            },
            {
              "@type": "ItemPage",
              "name": "Sports Achievements",
              "description": "Championships and medals in various sports competitions",
              "url": "https://www.aaaschool.in/achievements#sports"
            },
            {
              "@type": "ItemPage",
              "name": "Cultural Achievements",
              "description": "Awards in art, music, dance, and other cultural activities",
              "url": "https://www.aaaschool.in/achievements#cultural"
            },
            {
              "@type": "ItemPage",
              "name": "Alumni Achievements",
              "description": "Success stories of our graduates making a difference in various fields",
              "url": "https://www.aaaschool.in/achievements#alumni"
            }
          ],
          "publisher": {
            "@type": "Organization",
            "name": "Aryavart Ancient Academy",
            "logo": "https://www.aaaschool.in/aaa.png"
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
            gtag('config', 'G-YOUR_GA_MEASUREMENT_ID');
          `,
        }}
      />

      <NavBar />
      <main className="flex-grow" aria-label="Main Content">
        {children}
      </main>
      <Footer />
    </div>
  );
}