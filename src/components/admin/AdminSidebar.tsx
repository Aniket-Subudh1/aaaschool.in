"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  BellRing,
  Bell,
  Calendar,
  MessageSquare,
  Settings,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Award,
  BookOpen,
  FolderOpen,
} from "lucide-react";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  children?: {
    name: string;
    href: string;
  }[];
  expanded?: boolean;
}

export default function AdminSidebar() {
  const pathname = usePathname();

  const links: SidebarLink[] = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <Home size={20} />,
    },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: <FileText size={20} />,
    },
    {
      name: "Admissions",
      href: "/admin/admissions",
      icon: <ClipboardCheck size={20} />,
    },
    {
      name: "Announcements",
      href: "/admin/announcements",
      icon: <BellRing size={20} />,
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: <Bell size={20} />,
    },
    {
      name: "Holidays",
      href: "/admin/holidays",
      icon: <Calendar size={20} />,
    },
    {
      name: "Feedback",
      href: "/admin/feedback",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "ATAT Registrations",
      href: "/admin/atat-registrations",
      icon: <Award size={20} />,
    },
    {
      name: "Study Materials",
      href: "/admin/study-materials",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Staff",
      href: "/admin/faculty",
      icon: <GraduationCap size={20} />,
    },
    {
      name: "Gallery",
      href: "/admin/gallery",
      icon: <FolderOpen size={20} />,
      expanded: pathname?.startsWith("/admin/gallery"),
      children: [
        {
          name: "Photo Albums",
          href: "/admin/gallery/albums",
        },
        {
          name: "Videos",
          href: "/admin/gallery/videos",
        },
        {
          name: "News Bulletins",
          href: "/admin/gallery/news-bulletins",
        },
      ],
    },
    {
      name: "Achievements",
      href: "/admin/achievements",
      icon: <Award size={20} />,
      expanded: pathname?.startsWith("/admin/achievements"),
      children: [
        {
          name: "Awards",
          href: "/admin/achievements/awards",
        },
        {
          name: "Sports",
          href: "/admin/achievements/sports",
        },
        {
          name: "Alumni",
          href: "/admin/achievements/alumni",
        },
      ],
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-gray-200 hidden md:block overflow-y-auto z-30">
      <div className="p-4">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname?.startsWith(link.href));

            return (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-[#8b1a1a]/10 text-[#8b1a1a]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="flex items-center">
                    <span
                      className={`mr-3 ${
                        isActive ? "text-[#8b1a1a]" : "text-gray-500"
                      }`}
                    >
                      {link.icon}
                    </span>
                    {link.name}
                  </span>

                  {link.children && (
                    <span
                      className={`${
                        link.expanded ? "rotate-90" : ""
                      } transition-transform`}
                    >
                      ›
                    </span>
                  )}
                </Link>

                {link.children && link.expanded && (
                  <div className="mt-1 ml-8 space-y-1">
                    {link.children.map((child) => {
                      const isChildActive = pathname === child.href;

                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block px-3 py-2 rounded-md text-sm ${
                            isChildActive
                              ? "bg-[#8b1a1a]/10 text-[#8b1a1a] font-medium"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
