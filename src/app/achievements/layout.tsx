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

function StructuredData() {
  return (
    <Script
      id="achievements-structured-data"
      type="application/ld+json"
      strategy="lazyOnload"
    >
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Aryavart Ancient Academy Achievements",
        description:
          "Discover the achievements of students, alumni, and faculty at Aryavart Ancient Academy.",
        url: "https://www.aaaschool.in/achievements",
        hasPart: [
          {
            "@type": "WebPage",
            name: "Awards & Recognition",
            description:
              "Explore our achievements and accolades in various fields",
            url: "https://www.aaaschool.in/achievements/awards",
          },
          {
            "@type": "WebPage",
            name: "Sports Achievements",
            description:
              "Celebrating our students' excellence in sports competitions",
            url: "https://www.aaaschool.in/achievements/sports",
          },
          {
            "@type": "WebPage",
            name: "Alumni Network",
            description:
              "Connect with our successful graduates making a difference",
            url: "https://www.aaaschool.in/achievements/alumni",
          },
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.aaaschool.in/achievements",
        },
        publisher: {
          "@type": "Organization",
          name: "Aryavart Ancient Academy",
          logo: "https://www.aaaschool.in/logo.png",
        },
      })}
    </Script>
  );
}

function Analytics() {
  return (
    <>
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
    </>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Achievements | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Achievements",
  },
  description:
    "Explore the remarkable achievements of students, alumni, and faculty at Aryavart Ancient Academy. Discover academic excellence, sports accomplishments, and notable alumni success stories.",
  keywords: [
    "school achievements",
    "student accomplishments",
    "alumni success",
    "Aryavart Ancient Academy",
    "sports achievements",
    "academic excellence",
    "awards and recognitions",
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
      "Explore our students' and alumni's achievements in academics, sports, and beyond.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-achievements.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Achievements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Aryavart Ancient Academy",
    description:
      "Explore our students' and alumni's achievements in academics, sports, and beyond.",
    images: ["https://www.aaaschool.in/twitter-achievements.jpg"],
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

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen flex flex-col`}>
      <NavBar />
      <StructuredData />
      <Analytics />

      <main className="flex-grow" aria-label="Main Content">
        {children}
      </main>

      <Footer />
    </div>
  );
}
