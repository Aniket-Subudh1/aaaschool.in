import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientWrapper } from "@/components/ui/client-wrapper";
import clsx from "clsx";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
    "AAA School",
    "best CBSE school in Odisha",
    "School in Khordha",
    "Holistic Education",
    "Ancient Wisdom",
    "Modern Curriculum",
    "Odisha Education",
    "Indian Culture and Heritage",
    "transformative education",
    "quality schooling in Odisha",
    "top school in Bhubaneswar",
    "best educational institute in Khordha",
    "cultural values education",
  ],
  publisher: "Aryavart Ancient Academy",
  category: "Education",
  classification: "School",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8b1a1a",
      },
    ],
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-domain-verification",
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
        url: "/aaa.png",
        width: 600,
        height: 600,
        alt: "Aryavart Ancient Academy Logo",
      },
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
    site: "@aaaschool",
    creator: "@aaaschool",
    title: "Aryavart Ancient Academy – Premier School in Khordha, Odisha",
    description:
      "Discover a world-class educational experience that fuses modern curriculum with India's ancient heritage.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Campus and Facilities",
      },
    ],
  },
  alternates: {
    canonical: "https://www.aaaschool.in",
    languages: {
      "en-US": "https://www.aaaschool.in",
      "hi-IN": "https://www.aaaschool.in/hi",
    },
  },
  other: {
    "msapplication-TileColor": "#8b1a1a",
    "theme-color": "#8b1a1a",
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
          href="/aaa.png"
          as="image"
          type="image/png"
          crossOrigin="anonymous"
        />

        {/* Social Media Integration */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="Aryavart Ancient Academy" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="hi_IN" />
        <meta name="twitter:image:alt" content="Aryavart Ancient Academy - Holistic Education in Khordha, Odisha" />
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
            "@type": "EducationalOrganization",
            "name": "Aryavart Ancient Academy",
            "alternateName": "AAA School",
            "description": "A premier CBSE educational institution in Khordha, Odisha, dedicated to holistic student development by blending modern education with ancient wisdom",
            "url": "https://www.aaaschool.in",
            "logo": "https://www.aaaschool.in/aaa.png",
            "image": "https://www.aaaschool.in/seo.png",
            "foundingDate": "2010",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "School Address Line",
              "addressLocality": "Khordha",
              "addressRegion": "Odisha",
              "postalCode": "752056",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "20.1744",
              "longitude": "85.6179"
            },
            "telephone": "+91-9124654094",
            "email": "aryavartaa.krd@gmail.com",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-9124654094",
                "email": "aryavartaa.krd@gmail.com",
                "contactType": "Customer Service",
                "areaServed": "Khordha, Odisha",
                "availableLanguage": ["English", "Hindi", "Odia"]
              },
              {
                "@type": "ContactPoint",
                "telephone": "+91-9124654094",
                "email": "admission@aaaschool.in",
                "contactType": "Admissions",
                "areaServed": "Khordha, Odisha",
                "availableLanguage": ["English", "Hindi", "Odia"]
              }
            ],
            "sameAs": [
              "https://www.instagram.com/aaaschoolkrd/?hl=en",
              "http://facebook.com/aaaschoolkrd/?locale=ms_MY",
              "https://x.com/aaaschool",
              "https://www.youtube.com/@aaaschool"
            ],
            "knowsLanguage": ["English", "Hindi", "Sanskrit", "Odia"],
            "keywords": "CBSE school, Odisha education, holistic learning, ancient wisdom, modern curriculum, Khordha school, Aryavart Academy",
            "areaServed": "Khordha, Odisha",
            "numberOfEmployees": {
              "@type": "QuantitativeValue",
              "value": "50+"
            },
            "award": "Best School in Khordha region",
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "CBSE Affiliation",
              "educationalLevel": "Primary and Secondary Education",
              "recognizedBy": "Central Board of Secondary Education, India"
            },
            "alumni": {
              "@type": "OrganizationRole",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Aryavart Ancient Academy"
              }
            }
          })}
        </Script>

        {/* BreadcrumbList Structured Data */}
        <Script
          id="breadcrumb-structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
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
                "name": "About",
                "item": "https://www.aaaschool.in/about"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Academics",
                "item": "https://www.aaaschool.in/academics"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Admission",
                "item": "https://www.aaaschool.in/admission"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Contact",
                "item": "https://www.aaaschool.in/contact"
              }
            ]
          })}
        </Script>

        {/* LocalBusiness Structured Data */}
        <Script
          id="localbusiness-structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Aryavart Ancient Academy",
            "image": "https://www.aaaschool.in/aaa.png",
            "url": "https://www.aaaschool.in",
            "telephone": "+91-9124654094",
            "email": "aryavartaa.krd@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "School Address Line",
              "addressLocality": "Khordha",
              "addressRegion": "Odisha",
              "postalCode": "752056",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "20.1744",
              "longitude": "85.6179"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "16:00"
              }
            ],
            "sameAs": [
              "https://www.instagram.com/aaaschoolkrd/?hl=en",
              "http://facebook.com/aaaschoolkrd/?locale=ms_MY",
              "https://x.com/aaaschool",
              "https://www.youtube.com/@aaaschool"
            ]
          })}
        </Script>

        {/* FAQ Structured Data */}
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What curriculum does Aryavart Ancient Academy follow?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aryavart Ancient Academy follows the CBSE curriculum while integrating traditional knowledge systems and cultural values to provide a holistic education experience."
                }
              },
              {
                "@type": "Question",
                "name": "How can I apply for admission to Aryavart Ancient Academy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To apply for admission, you can visit our Admission page on the website, submit an enquiry form, and once approved, proceed with the full application process. You can also contact our admissions office directly at +91-9124654094."
                }
              },
              {
                "@type": "Question",
                "name": "What extracurricular activities are offered at Aryavart Ancient Academy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer a wide range of extracurricular activities including sports (cricket, basketball, taekwondo), clubs (art, music, coding, photography), and service units (NCC, Scout & Guide, Junior Red Cross) to develop well-rounded students."
                }
              },
              {
                "@type": "Question",
                "name": "What are the school hours at Aryavart Ancient Academy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our school operates from 8:00 AM to 4:00 PM, Monday through Saturday. The specific timings for different grades may vary slightly."
                }
              }
            ]
          })}
        </Script>

        {/* WebSite Structured Data */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.aaaschool.in",
            "name": "Aryavart Ancient Academy",
            "alternateName": "AAA School",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.aaaschool.in/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
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
          <ClientWrapper>
            
            <main className="overflow-x-hidden">{children}</main>
          
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}