import type { Metadata } from "next";
import NavBar from "@/components/ui/nav-bar";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "School Gallery | Aryavart Ancient Academy",
  description:
    "Browse photos, videos, and news from Aryavart Ancient Academy's cultural events, educational activities, and student achievements.",
  keywords: [
    "school gallery",
    "Aryavart Ancient Academy photos",
    "school events",
    "student activities",
    "school videos",
    "news bulletins",
  ],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-24">{children}</main>

      <Footer />
    </div>
  );
}
