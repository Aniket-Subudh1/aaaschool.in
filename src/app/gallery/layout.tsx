import type { Metadata } from "next";
import Script from "next/script";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "School Gallery | Aryavart Ancient Academy - Photos & Videos",
  description:
    "Browse photos, videos, and news from Aryavart Ancient Academy's cultural events, educational activities, and student achievements. Explore our vibrant campus life through our comprehensive media gallery.",
  keywords: [
    "school gallery",
    "Aryavart Ancient Academy photos",
    "school events photos",
    "student activities videos",
    "school videos",
    "news bulletins",
    "school memories",
    "education gallery",
    "campus activities gallery",
    "school celebrations photos",
    "cultural programs videos",
    "school media gallery",
    "student achievements gallery",
  ],
  openGraph: {
    type: "website",
    url: "https://aaaschool.in/gallery",
    title: "School Gallery | Aryavart Ancient Academy",
    description:
      "Explore our rich collection of photos, videos, and news bulletins showcasing the vibrant life at Aryavart Ancient Academy.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School Gallery | Aryavart Ancient Academy",
    description:
      "Explore our rich collection of photos, videos, and news bulletins showcasing the vibrant life at Aryavart Ancient Academy.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-5 flex flex-col">
      <Script
        id="gallery-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Aryavart Ancient Academy Gallery",
          "description": "Collection of photos, videos, and news from school events and activities",
          "publisher": {
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "logo": "https://aaaschool.in/aaa.png",
          },
          "url": "https://aaaschool.in/gallery",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Photo Albums",
                "description": "Collections of photographs from various school events and activities"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Video Gallery",
                "description": "Videos showcasing performances, events, and campus highlights"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "News Bulletins",
                "description": "School newsletters, announcements and updates"
              }
            ]
          }
        })}
      </Script>
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}