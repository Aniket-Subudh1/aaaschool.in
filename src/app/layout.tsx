import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClientWrapper } from "@/components/ui/client-wrapper"
import clsx from "clsx"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: {
    default: "Aryavart Ancient Academy - Premier CBSE School in Khordha, Odisha",
    template: "%s | Aryavart Ancient Academy"
  },
  description: "Aryavart Ancient Academy offers transformative holistic education blending modern CBSE curriculum with ancient wisdom. Located in Khordha, Odisha, we nurture well-rounded global citizens through quality education, extracurricular activities, and cultural values.",
  generator: "Next.js",
  applicationName: "Aryavart Ancient Academy",
  authors: [{ name: "Aryavart Ancient Academy", url: "https://aaaschool.in" }],
  keywords: [
    "Aryavart Ancient Academy",
    "AAA School",
    "Best CBSE school in Odisha",
    "School in Khordha",
    "Holistic Education Odisha",
    "Ancient Wisdom Modern Curriculum",
    "Top school in Bhubaneswar",
    "Quality schooling in Odisha",
    "Best educational institute in Khordha",
    "Cultural values education",
    "Premier school Odisha",
    "CBSE affiliated school",
    "Transformative education",
    "Indian Culture and Heritage education",
  ],
  creator: "Aryavart Ancient Academy",
  publisher: "Aryavart Ancient Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "education",
  openGraph: {
    type: "website",
    url: "https://aaaschool.in/",
    title: "Aryavart Ancient Academy - Premier CBSE School in Khordha, Odisha",
    description: "Join a pioneering educational institution that blends modern CBSE curriculum with ancient Indian wisdom to nurture well-rounded global citizens in Khordha, Odisha.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy - Premier School in Khordha, Odisha",
      }
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryavart Ancient Academy - Premier CBSE School in Khordha, Odisha",
    description: "Discover world-class holistic education that fuses modern CBSE curriculum with India's ancient heritage and cultural values at Aryavart Ancient Academy.",
    images: ["/seo.png"],
    creator: "@aaaschool",
    site: "@aaaschool",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://aaaschool.in",
    languages: {
      'en': 'https://aaaschool.in',
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Aryavart Ancient Academy",
  "description": "A premier CBSE educational institution in Khordha, Odisha, dedicated to holistic student development by blending modern education with ancient wisdom",
  "url": "https://aaaschool.in",
  "logo": "https://aaaschool.in/aaa.png",
  "image": "https://aaaschool.in/seo.png",
  "foundingDate": "2010",
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
  ]
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aryavart Ancient Academy",
  "url": "https://aaaschool.in",
  "logo": "https://aaaschool.in/aaa.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9124654094",
    "contactType": "customer service",
    "email": "aryavartaa.krd@gmail.com",
    "availableLanguage": ["English", "Hindi", "Odia"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://aaaschool.in" />
        <meta name="geo.region" content="IN-OD" />
        <meta name="geo.placename" content="Khordha" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Aryavart Ancient Academy" />
        
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={clsx(dmSans.className, "antialiased bg-white pt-20")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}