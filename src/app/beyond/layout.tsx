import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Beyond Academics | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Beyond Academics",
  },
  description:
    "Explore our comprehensive Beyond Academics programs including clubs, sports, and service units that nurture talents, build character, and develop holistic individuals at Aryavart Ancient Academy.",
  keywords: [
    "beyond academics",
    "extracurricular activities",
    "school clubs",
    "sports programs",
    "service units",
    "holistic education",
    "student development",
    "Aryavart Ancient Academy",
    "school activities",
    "NCC",
    "Scout and Guide",
    "Junior Red Cross",
    "Taekwondo",
    "Basketball",
    "Cricket",
    "Kho Kho",
    "Kabaddi",
    "Photography Club",
    "Coding Club",
    "Art Club",
    "Music Club",
    "Dance Club",
    "Odisha education",
    "character building",
    "talent development",
  ],
  applicationName: "Aryavart Ancient Academy Beyond Academics Portal",
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
    url: "https://www.aaaschool.in/beyond",
    title: "Beyond Academics | Aryavart Ancient Academy",
    description:
      "Discover a world of opportunities beyond the classroom through our diverse range of clubs, sports programs, and service units that develop skills, character, and talents.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/beyond-academics-og.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Beyond Academics",
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
    title: "Beyond Academics | Aryavart Ancient Academy",
    description:
      "Explore our comprehensive Beyond Academics programs including clubs, sports, and service units that nurture talents and build character.",
    images: ["/beyond-academics-twitter.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/beyond",
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

export default function BeyondAcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f3e9]/10 flex flex-col relative">
      <Script
        id="beyond-academics-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Beyond Academics Programs at Aryavart Ancient Academy",
          "description": "Comprehensive extracurricular programs including clubs, sports, and service units that nurture talents and build character",
          "url": "https://www.aaaschool.in/beyond",
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
                  "@type": "Course",
                  "name": "Clubs & Activities",
                  "description": "Various clubs including Book Club, Photography Club, Art Club, Dance Club, Chess Club, Coding Club, Music Club, Tourism Club, and Robotics Club",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": "Aryavart Ancient Academy"
                  },
                  "url": "https://www.aaaschool.in/beyond/clubs"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Course",
                  "name": "Sports Programs",
                  "description": "Sports programs including Basketball, Volleyball, Tennis Ball Cricket, Taekwondo, Cricket, Kho-Kho, and Kabaddi",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": "Aryavart Ancient Academy"
                  },
                  "url": "https://www.aaaschool.in/beyond/sports"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Course",
                  "name": "Service Units",
                  "description": "Service units including NCC, Scout & Guide, Junior Red Cross, and Cub-Bulbul",
                  "provider": {
                    "@type": "EducationalOrganization",
                    "name": "Aryavart Ancient Academy"
                  },
                  "url": "https://www.aaaschool.in/beyond/service-units"
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
                "name": "Beyond Academics",
                "item": "https://www.aaaschool.in/beyond"
              }
            ]
          },
          "specialty": "Holistic development through extracurricular activities",
          "potentialAction": {
            "@type": "ViewAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.aaaschool.in/beyond",
              "actionPlatform": [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform"
              ]
            }
          }
        })}
      </Script>

      {/* FAQ Schema for Beyond Academics Page */}
      <Script
        id="faq-beyond-academics-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What extracurricular activities are offered at Aryavart Ancient Academy?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer a comprehensive range of extracurricular activities organized into three main categories: Clubs & Activities (such as Photography, Art, Music, Coding, and Chess), Sports Programs (including Basketball, Cricket, Taekwondo, and traditional Indian games), and Service Units (like NCC, Scout & Guide, and Junior Red Cross)."
              }
            },
            {
              "@type": "Question",
              "name": "How do Beyond Academics programs benefit students?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Beyond Academics programs foster holistic development by enhancing physical fitness, creative expression, leadership skills, teamwork, and social responsibility. These activities help discover and nurture talents, build character, and develop well-rounded individuals prepared for future challenges."
              }
            },
            {
              "@type": "Question",
              "name": "How can students join these extracurricular activities?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Students can join clubs at the beginning of each academic session by completing a registration form. Some clubs have specific eligibility criteria or limited seats, so early registration is recommended. Contact the respective club coordinator or the Beyond Academics office for details."
              }
            },
            {
              "@type": "Question",
              "name": "Are there additional fees for joining extracurricular activities?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most clubs and activities are included in the regular school fees. However, some specialized activities or those requiring specific equipment or external coaching may have additional nominal charges. Detailed fee structures are provided during the registration process."
              }
            }
          ]
        })}
      </Script>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}