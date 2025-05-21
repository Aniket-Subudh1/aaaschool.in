import type { Metadata, Viewport } from "next";
import Script from "next/script";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: {
    default: "School Gallery | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Gallery",
  },
  description:
    "Browse photos, videos, and news from Aryavart Ancient Academy's cultural events, educational activities, and student achievements. Explore our vibrant campus life through our comprehensive media gallery.",
  keywords: [
    "school gallery",
    "Aryavart Ancient Academy photos",
    "school events",
    "student activities",
    "school videos",
    "news bulletins",
    "school memories",
    "education gallery",
    "Khordha school photos",
    "Odisha school events",
    "student achievements gallery",
    "campus activities",
    "school celebrations",
    "cultural programs",
    "school media gallery"
  ],
  applicationName: "Aryavart Ancient Academy Gallery Portal",
  authors: [{ name: "Aryavart Ancient Academy Media Team" }],
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
    url: "https://www.aaaschool.in/gallery",
    title: "School Gallery | Aryavart Ancient Academy",
    description:
      "Explore our rich collection of photos, videos, and news bulletins showcasing the vibrant life at Aryavart Ancient Academy.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Gallery",
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
    title: "School Gallery | Aryavart Ancient Academy",
    description:
      "Explore our rich collection of photos, videos, and news bulletins showcasing the vibrant life at Aryavart Ancient Academy.",
    images: ["https://www.aaaschool.in/twitter-gallery.jpg"],
    site: "@aaaschool",
    creator: "@aaaschool",
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.aaaschool.in/gallery",
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

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen pt-5 flex flex-col`}>
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
            "logo": "https://www.aaaschool.in/aaa.png",
          },
          "url": "https://www.aaaschool.in/gallery",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "url": "https://www.aaaschool.in/gallery/photo",
                "name": "Photo Albums",
                "description": "Collections of photographs from various school events and activities"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "url": "https://www.aaaschool.in/gallery/video",
                "name": "Video Gallery",
                "description": "Videos showcasing performances, events, and campus highlights"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "url": "https://www.aaaschool.in/gallery/news-bulletin",
                "name": "News Bulletins",
                "description": "School newsletters, announcements and updates"
              }
            ]
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
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}