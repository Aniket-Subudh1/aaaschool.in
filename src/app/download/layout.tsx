import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Download Materials | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Downloads",
  },
  description:
    "Access and download academic resources, study materials, syllabus, and important documents from Aryavart Ancient Academy. Keep up with your educational needs with our comprehensive collection of downloadable resources.",
  keywords: [
    "school downloads",
    "study materials",
    "educational resources",
    "Aryavart Ancient Academy",
    "academic downloads",
    "syllabus download",
    "school documents",
    "educational PDFs",
  ],
  applicationName: "Aryavart Ancient Academy Download Center",
  authors: [{ name: "Aryavart Ancient Academy Academic Team" }],
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.aaaschool.in/download",
    title: "Download Center | Aryavart Ancient Academy",
    description:
      "Access and download academic materials, syllabus, and important documents. Find all the resources you need for your academic journey.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-download.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Download Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Center | Aryavart Ancient Academy",
    description:
      "Access and download academic materials, syllabus, and important documents for your educational needs.",
    images: ["https://www.aaaschool.in/twitter-download.jpg"],
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

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      {/* Structured Data for Download Center */}
      <Script
        id="download-center-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Aryavart Ancient Academy Download Center",
          description:
            "Access and download academic resources, study materials, syllabus, and important documents from Aryavart Ancient Academy.",
          url: "https://www.aaaschool.in/download",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Academic Materials",
              description:
                "Syllabus, textbooks, and study guides for all classes",
              url: "https://www.aaaschool.in/download#academic",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Official Documents",
              description:
                "School brochures, annual reports, and official documents",
              url: "https://www.aaaschool.in/download#official",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Forms & Applications",
              description:
                "Admission forms, transfer certificates, and other application forms",
              url: "https://www.aaaschool.in/download#forms",
            },
          ],
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://www.aaaschool.in/download",
          },
          provider: {
            "@type": "Organization",
            name: "Aryavart Ancient Academy",
            logo: "https://www.aaaschool.in/logo.png",
          },
        })}
      </Script>

      {/* Google Analytics */}
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
        aria-label="Download Center"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
