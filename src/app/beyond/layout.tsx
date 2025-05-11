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
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Academics | Aryavart Ancient Academy",
    description:
      "Explore our comprehensive Beyond Academics programs including clubs, sports, and service units that nurture talents and build character.",
    images: ["/beyond-academics-twitter.jpg"],
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  category: "Education",
};

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
          "@type": "ItemList",
          "name": "Beyond Academics Programs at Aryavart Ancient Academy",
          "description": "Explore our comprehensive Beyond Academics programs including clubs, sports, and service units that nurture talents and build character.",
          "url": "https://www.aaaschool.in/beyond",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Thing",
                "name": "Clubs & Activities",
                "description": "Various clubs including Book Club, Photography Club, Art Club, Dance Club, Chess Club, Coding Club, Music Club, Tourism Club, and Robotics Club",
                "url": "https://www.aaaschool.in/beyond/clubs"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Thing",
                "name": "Sports Programs",
                "description": "Sports programs including Basketball, Volleyball, Tennis Ball Cricket, Taekwondo, Cricket, Kho-Kho, and Kabaddi",
                "url": "https://www.aaaschool.in/beyond/sports"
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Thing",
                "name": "Service Units",
                "description": "Service units including NCC, Scout & Guide, Junior Red Cross, and Cub-Bulbul",
                "url": "https://www.aaaschool.in/beyond/service-units"
              }
            }
          ],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.aaaschool.in/beyond"
          },
          "publisher": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.aaaschool.in/aaa.png"
            }
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}