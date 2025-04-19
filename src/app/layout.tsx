import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import clsx from "clsx";
import { ClientWrapper } from "@/components/ui/client-wrapper";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aaaschool.in"),
  title: "Aryavart Ancient Academy",
  description:
    "Aryavart Ancient Academy is a leading school located in Khordha, Odisha, offering a transformative blend of modern curriculum and ancient wisdom for holistic student development.",
  keywords: [
    "Aryavart Ancient Academy",
    "AAA",
    "AAA school",
    "best school in Odisha",
    "top school in Khordha",
    "top school 10 in Khordha",
    "top school 5 in Khordha",
    "top school 20 in Khordha",
    "top school in Bhubaneswar",
    "top school 10 in Bhubaneswar",
    "top school 5 in Bhubaneswar",
    "top school 20 in Bhubaneswar",
    "top school in Bbsr",
    "top school 10 in Bbsr",
    "top school 5 in Bbsr",
    "top school 20 in Bbsr",
    "School in Khordha",
    "School in Odisha",
    "Holistic Education",
    "Ancient Wisdom",
    "Modern Curriculum",
    "Khordha Education",
    "Odisha School",
    "Holistic Learning",
    "Indian Culture and Heritage",
    "leading educational institution",
    "transformative education",
    "quality schooling in Odisha",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Aryavart Ancient Academy – Premier School in Khordha, Odisha",
    description:
      "Join Aryavart Ancient Academy, a pioneering institution in Odisha embracing both modern and ancient educational approaches to nurture well-rounded global citizens.",
    url: "https://www.aaaschool.in",
    type: "website",
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
    title: "Aryavart Ancient Academy – Premier School in Khordha, Odisha",
    description:
      "Discover a world-class educational experience that fuses modern curriculum with India's ancient heritage at Aryavart Ancient Academy in Khordha, Odisha.",
    images: "/seo.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="relative" suppressHydrationWarning>
      <body className={clsx(dmSans.className, "antialiased bg-white pt-24")}>
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
