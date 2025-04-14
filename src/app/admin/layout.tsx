import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import "../globals.css";
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard - Aryavart Ancient Academy',
  description: 'Admin dashboard for managing Aryavart Ancient Academy website content',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <AdminHeader />
          <div className="flex flex-col md:flex-row flex-1">
            <AdminSidebar />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}