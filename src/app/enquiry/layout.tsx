import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Footer from "@/components/ui/footer";
import NavBar from "@/components/ui/nav-bar";

export const metadata: Metadata = {
  title: {
    default: "Admission Enquiry | Aryavart Ancient Academy",
    template: "%s | Aryavart Ancient Academy Enquiries",
  },
  description:
    "Submit your admission enquiry for Aryavart Ancient Academy. Start your educational journey with us through a simple and straightforward enquiry process.",
  keywords: [
    "school enquiry",
    "admission inquiry",
    "Aryavart Ancient Academy",
    "school application",
    "education enquiry",
  ],
  applicationName: "Aryavart Ancient Academy Enquiry Portal",
  authors: [{ name: "Aryavart Ancient Academy Admission Team" }],
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
    url: "https://www.aaaschool.in/enquiry",
    title: "Admission Enquiry | Aryavart Ancient Academy",
    description:
      "Easily submit your enquiry and take the first step towards joining Aryavart Ancient Academy.",
    siteName: "Aryavart Ancient Academy",
    images: [
      {
        url: "https://www.aaaschool.in/og-enquiry.jpg",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy Admission Enquiry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Admission Enquiry | Aryavart Ancient Academy",
    description:
      "Easily submit your enquiry and take the first step towards joining Aryavart Ancient Academy.",
    images: ["https://www.aaaschool.in/twitter-enquiry.jpg"],
  },
  verification: {
    google: "your-google-site-verification-code",
    // Add other verification codes as needed
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

export default function EnquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen flex flex-col`}>
      {/* Structured Data for School Enquiry */}
      <Script
        id="school-enquiry-structured-data"
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
            addressLocality: "City",
            addressRegion: "State",
            postalCode: "000000",
            addressCountry: "IN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-1234567890",
            email: "admission@aaaschool.in",
            contactType: "Admission Enquiry",
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

      <NavBar />

      <main
        className="flex-grow container mx-auto px-4 py-8"
        aria-label="Main Content"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
