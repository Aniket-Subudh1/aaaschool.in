import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientWrapper } from "@/components/ui/client-wrapper";
import clsx from "clsx";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8b1a1a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aaaschool.in"),
  title: {
    default: "Aryavart Ancient Academy – Holistic Education in Khordha, Odisha",
    template: "%s | Aryavart Ancient Academy",
  },
  description:
    "Aryavart Ancient Academy offers a transformative educational experience blending modern curriculum with ancient wisdom. Located in Khordha, Odisha, we nurture well-rounded global citizens.",
  applicationName: "Aryavart Ancient Academy",
  authors: [
    { name: "Aryavart Ancient Academy", url: "https://www.aaaschool.in" },
  ],
  generator: "Next.js",
  referrer: "origin",
  keywords: [
    "Aryavart Ancient Academy",
    "AAA",
    "best school in Odisha",
    "School in Khordha",
    "Holistic Education",
    "Ancient Wisdom",
    "Modern Curriculum",
    "Odisha School",
    "Indian Culture and Heritage",
    "transformative education",
    "quality schooling in Odisha",
  ],
  publisher: "Aryavart Ancient Academy",
  category: "Education",
  classification: "School",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-site-verification-code",
    other: {
      // Add other verification codes as needed
      // 'yandex': 'your-yandex-verification-code',
    },
  },
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
    url: "https://www.aaaschool.in",
    title: "Aryavart Ancient Academy – Premier School in Khordha, Odisha",
    description:
      "Join a pioneering institution embracing both modern and ancient educational approaches to nurture well-rounded global citizens.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy in Khordha, Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AryavartAcademy",
    creator: "@AryavartAcademy",
    title: "Aryavart Ancient Academy – Premier School in Khordha, Odisha",
    description:
      "Discover a world-class educational experience that fuses modern curriculum with India's ancient heritage.",
    images: "/seo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/fonts/dm-sans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.aaaschool.in" />
      </head>

      <body className={clsx(dmSans.className, "antialiased bg-white pt-24")}>
        {/* Structured Data for School */}
        <Script
          id="school-structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalInstitution",
            name: "Aryavart Ancient Academy",
            description:
              "A premier educational institution dedicated to holistic student development",
            url: "https://www.aaaschool.in",
            logo: "https://www.aaaschool.in/logo.png",
            foundingDate: "2010",
            address: {
              "@type": "PostalAddress",
              streetAddress: "School Address Line",
              addressLocality: "Khordha",
              addressRegion: "Odisha",
              postalCode: "000000",
              addressCountry: "IN",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-1234567890",
              email: "info@aaaschool.in",
              contactType: "Customer Service",
            },
            sameAs: [
              "https://www.facebook.com/AryavartAcademy",
              "https://www.instagram.com/aryavart_academy",
              "https://twitter.com/AryavartAcademy",
            ],
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

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
