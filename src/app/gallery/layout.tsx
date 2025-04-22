import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "School Gallery | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Gallery",
  },
  description:
    "Browse photos, videos, and news from Aryavart Ancient Academy's cultural events, educational activities, and student achievements.",
  keywords: [
    "school gallery",
    "Aryavart Ancient Academy photos",
    "school events",
    "student activities",
    "school videos",
    "news bulletins",
    "school memories",
    "education gallery",
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
    images: ["https://www.aaaschool.in/twitter-gallery.jpg"],
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
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      <Script
        id="gallery-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Aryavart Ancient Academy Gallery",
          description:
            "Collection of photos, videos, and news from school events and activities",
          publisher: {
            "@type": "EducationalOrganization",
            name: "Aryavart Ancient Academy",
            logo: "https://www.aaaschool.in/logo.png",
          },
          url: "https://www.aaaschool.in/gallery",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                url: "https://www.aaaschool.in/gallery/photo",
              },
              {
                "@type": "ListItem",
                position: 2,
                url: "https://www.aaaschool.in/gallery/video",
              },
              {
                "@type": "ListItem",
                position: 3,
                url: "https://www.aaaschool.in/gallery/news-bulletin",
              },
            ],
          },
        })}
      </Script>

      {/* Global Site Tag for Analytics (optional) */}
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

      <main className="flex-grow">{children}</main>
    </div>
  );
}
