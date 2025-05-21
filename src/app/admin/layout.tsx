import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Admin Dashboard - Aryavart Ancient Academy",
  description: "Admin dashboard for managing Aryavart Ancient Academy website content",
  robots: "noindex, nofollow",
  authors: [{ name: "Aryavart Ancient Academy Admin Team" }],
  applicationName: "Aryavart Ancient Academy Admin Portal",
  generator: "Next.js",
  referrer: "origin",
  publisher: "Aryavart Ancient Academy",
  alternates: {
    canonical: "https://www.aaaschool.in/admin",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* No-index directive for admin pages */}
      <Script
        id="no-index-directive"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Add a meta tag to prevent indexing
            const metaRobots = document.createElement('meta');
            metaRobots.name = 'robots';
            metaRobots.content = 'noindex, nofollow';
            document.head.appendChild(metaRobots);
          `,
        }}
      />
      
      {/* Global Site Tag for Analytics with Admin tracking */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA_MEASUREMENT_ID`}
      />
      <Script
        id="gtag-init-admin"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_GA_MEASUREMENT_ID', {
              'page_path': window.location.pathname,
              'user_role': 'admin'
            });
          `,
        }}
      />
      
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto md:ml-64 ">
          {children}
        </main>
      </div>
    </div>
  );
}