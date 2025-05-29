import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "@/components/theme-provider";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aaaschool.in"),
  title: "Aryavart Ancient Academy - Premier CBSE School in Khordha, Odisha",
  description:
    "Aryavart Ancient Academy offers transformative holistic education blending modern CBSE curriculum with ancient wisdom. Located in Khordha, Odisha, we nurture well-rounded global citizens through quality education, extracurricular activities, and cultural values.",
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
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Aryavart Ancient Academy - Premier CBSE School in Khordha, Odisha",
    description:
      "Join a pioneering educational institution that blends modern CBSE curriculum with ancient Indian wisdom to nurture well-rounded global citizens in Khordha, Odisha.",
    url: "https://aaaschool.in",
    type: "website",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Aryavart Ancient Academy - Premier School in Khordha, Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aaaschool",
    title: "Aryavart Ancient Academy - Premier CBSE School in Khordha, Odisha", 
    description:
      "Discover world-class holistic education that fuses modern CBSE curriculum with India's ancient heritage and cultural values at Aryavart Ancient Academy.",
    images: "/seo.png",
  },
  robots: "index, follow",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  try {
  } catch (error) {
    console.error("Error verifying user:", error);
  }

  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <body className={clsx(dmSans.className, "antialiased bg-white pt-20 sm:pt-20 lg:pt-24 md:pt-24")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}