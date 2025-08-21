"use client";

import { useState, useEffect } from "react";
import { 
  Home, 
  BellRing, 
  CalendarDays, 
  MessageSquare, 
  Users, 
  ClipboardCheck,
  FileText,
  Award,
  Image,
  Clock,
  AlertTriangle,
  User
} from "lucide-react";
import { authFetch } from "@/lib/authFetch";
import Link from "next/link";

interface Stats {
  announcements: { total: number; active: number };
  notifications: { total: number; active: number };
  holidays: { total: number; thisMonth: number };
  feedback: { total: number; new: number; responded: number };
  enquiries: { total: number; pending: number; approved: number };
  admissions: { total: number; pending: number; approved: number };
  faculty: { total: number; active: number };
  albums: { total: number; active: number };
  banners: { total: number; active: number };
  atatRegistrations: { total: number; pending: number };
}

interface Activity {
  type: string;
  message: string;
  time: Date;
  status: string;
}

interface PendingAction {
  type: string;
  count: number;
  message: string;
  link: string;
}

interface Holiday {
  _id: string;
  name: string;
  date: string;
  active: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    announcements: { total: 0, active: 0 },
    notifications: { total: 0, active: 0 },
    holidays: { total: 0, thisMonth: 0 },
    feedback: { total: 0, new: 0, responded: 0 },
    enquiries: { total: 0, pending: 0, approved: 0 },
    admissions: { total: 0, pending: 0, approved: 0 },
    faculty: { total: 0, active: 0 },
    albums: { total: 0, active: 0 },
    banners: { total: 0, active: 0 },
    atatRegistrations: { total: 0, pending: 0 }
  });

  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [upcomingHolidays, setUpcomingHolidays] = useState<Holiday[]>([]);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch core data
        const feedbackRes = await authFetch("/api/feedback");
        const enquiriesRes = await authFetch("/api/enquiries");
        const admissionsRes = await authFetch("/api/admissions");
        const holidaysRes = await authFetch("/api/holidays");
        const facultyRes = await authFetch("/api/faculty");

        if (!feedbackRes.ok || !enquiriesRes.ok || !admissionsRes.ok || !holidaysRes.ok || !facultyRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const feedback = await feedbackRes.json();
        const enquiries = await enquiriesRes.json();
        const admissions = await admissionsRes.json();
        const holidays = await holidaysRes.json();
        const faculty = await facultyRes.json();

        // Fetch optional data with fallbacks
        let announcements: any[] = [];
        let notifications: any[] = [];
        let albums: any[] = [];
        let banners: any[] = [];
        let atatRegistrations: any[] = [];

        try {
          const announcementsRes = await authFetch("/api/announcements");
          if (announcementsRes.ok) {
            announcements = await announcementsRes.json();
          }
        } catch (e) {
          console.warn("Failed to fetch announcements");
        }

        try {
          const notificationsRes = await authFetch("/api/notifications");
          if (notificationsRes.ok) {
            notifications = await notificationsRes.json();
          }
        } catch (e) {
          console.warn("Failed to fetch notifications");
        }

        try {
          const albumsRes = await authFetch("/api/albums");
          if (albumsRes.ok) {
            albums = await albumsRes.json();
          }
        } catch (e) {
          console.warn("Failed to fetch albums");
        }

        try {
          const bannersRes = await authFetch("/api/banners");
          if (bannersRes.ok) {
            banners = await bannersRes.json();
          }
        } catch (e) {
          console.warn("Failed to fetch banners");
        }

        try {
          const atatRes = await authFetch("/api/atat-registrations");
          if (atatRes.ok) {
            atatRegistrations = await atatRes.json();
          }
        } catch (e) {
          console.warn("Failed to fetch ATAT registrations");
        }

        // Calculate current month holidays
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const thisMonthHolidays = Array.isArray(holidays) ? holidays.filter((holiday: any) => {
          const holidayDate = new Date(holiday.date);
          return holidayDate.getMonth() + 1 === currentMonth && 
                 holidayDate.getFullYear() === currentYear;
        }) : [];

        // Get upcoming holidays (next 7 days)
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcoming = Array.isArray(holidays) ? holidays
          .filter((holiday: any) => {
            const holidayDate = new Date(holiday.date);
            return holidayDate >= today && holidayDate <= nextWeek && holiday.active;
          })
          .slice(0, 3) : [];

        setUpcomingHolidays(upcoming);

        // Set stats
        setStats({
          announcements: {
            total: Array.isArray(announcements) ? announcements.length : 0,
            active: Array.isArray(announcements) ? announcements.filter((a: any) => a.active).length : 0
          },
          notifications: {
            total: Array.isArray(notifications) ? notifications.length : 0,
            active: Array.isArray(notifications) ? notifications.filter((n: any) => n.active).length : 0
          },
          holidays: {
            total: Array.isArray(holidays) ? holidays.length : 0,
            thisMonth: thisMonthHolidays.length
          },
          feedback: {
            total: Array.isArray(feedback) ? feedback.length : 0,
            new: Array.isArray(feedback) ? feedback.filter((f: any) => f.status === "new").length : 0,
            responded: Array.isArray(feedback) ? feedback.filter((f: any) => f.status === "responded").length : 0
          },
          enquiries: {
            total: Array.isArray(enquiries) ? enquiries.length : 0,
            pending: Array.isArray(enquiries) ? enquiries.filter((e: any) => e.status === "pending").length : 0,
            approved: Array.isArray(enquiries) ? enquiries.filter((e: any) => e.status === "approved").length : 0
          },
          admissions: {
            total: Array.isArray(admissions) ? admissions.length : 0,
            pending: Array.isArray(admissions) ? admissions.filter((a: any) => a.status === "pending").length : 0,
            approved: Array.isArray(admissions) ? admissions.filter((a: any) => a.status === "approved").length : 0
          },
          faculty: {
            total: Array.isArray(faculty) ? faculty.length : 0,
            active: Array.isArray(faculty) ? faculty.filter((f: any) => f.active).length : 0
          },
          albums: {
            total: Array.isArray(albums) ? albums.length : 0,
            active: Array.isArray(albums) ? albums.filter((a: any) => a.active).length : 0
          },
          banners: {
            total: Array.isArray(banners) ? banners.length : 0,
            active: Array.isArray(banners) ? banners.filter((b: any) => b.active).length : 0
          },
          atatRegistrations: {
            total: Array.isArray(atatRegistrations) ? atatRegistrations.length : 0,
            pending: Array.isArray(atatRegistrations) ? atatRegistrations.filter((r: any) => r.status === "pending").length : 0
          }
        });

        // Calculate pending actions
        const pending: PendingAction[] = [];
        
        if (Array.isArray(feedback)) {
          const newFeedbackCount = feedback.filter((f: any) => f.status === "new").length;
          if (newFeedbackCount > 0) {
            pending.push({
              type: "feedback",
              count: newFeedbackCount,
              message: "New feedback messages",
              link: "/admin/feedback"
            });
          }
        }

        if (Array.isArray(enquiries)) {
          const pendingEnquiriesCount = enquiries.filter((e: any) => e.status === "pending").length;
          if (pendingEnquiriesCount > 0) {
            pending.push({
              type: "enquiries",
              count: pendingEnquiriesCount,
              message: "Pending enquiries",
              link: "/admin/enquiries"
            });
          }
        }

        if (Array.isArray(admissions)) {
          const pendingAdmissionsCount = admissions.filter((a: any) => a.status === "pending").length;
          if (pendingAdmissionsCount > 0) {
            pending.push({
              type: "admissions",
              count: pendingAdmissionsCount,
              message: "Pending admissions",
              link: "/admin/admissions"
            });
          }
        }

        if (Array.isArray(atatRegistrations)) {
          const pendingATATCount = atatRegistrations.filter((r: any) => r.status === "pending").length;
          if (pendingATATCount > 0) {
            pending.push({
              type: "atat",
              count: pendingATATCount,
              message: "Pending ATAT registrations",
              link: "/admin/atat-registrations"
            });
          }
        }

        setPendingActions(pending);

        // Recent activity
        const allActivity: Activity[] = [];
        
        if (Array.isArray(feedback)) {
          feedback.slice(0, 2).forEach((item: any) => {
            allActivity.push({
              type: "feedback",
              message: `New feedback from ${item.name}`,
              time: new Date(item.createdAt),
              status: item.status
            });
          });
        }

        if (Array.isArray(enquiries)) {
          enquiries.slice(0, 2).forEach((item: any) => {
            allActivity.push({
              type: "enquiry",
              message: `New enquiry for ${item.studentName}`,
              time: new Date(item.createdAt),
              status: item.status
            });
          });
        }

        if (Array.isArray(admissions)) {
          admissions.slice(0, 2).forEach((item: any) => {
            allActivity.push({
              type: "admission",
              message: `New admission for ${item.studentName}`,
              time: new Date(item.createdAt),
              status: item.status
            });
          });
        }

        setRecentActivity(
          allActivity
            .sort((a, b) => b.time.getTime() - a.time.getTime())
            .slice(0, 5)
        );

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  interface StatCardProps {
    title: string;
    value: number;
    subtitle?: string;
    icon: React.ReactNode;
    bgColor: string;
    iconColor: string;
    href: string;
  }

  const StatCard = ({ title, value, subtitle, icon, bgColor, iconColor, href }: StatCardProps) => (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{isLoading ? "..." : value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className={`${bgColor} p-3 rounded-lg`}>
            <div className={`${iconColor}`}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#8b1a1a] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#5a3e36]">
          Welcome to Aryavart Ancient Academy admin panel. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Pending Actions Alert */}
      {pendingActions.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
            <h3 className="text-sm font-medium text-amber-800">
              Action Required ({pendingActions.reduce((sum, action) => sum + action.count, 0)} items)
            </h3>
          </div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            {pendingActions.map((action, index) => (
              <Link 
                key={index} 
                href={action.link}
                className="text-sm text-amber-700 hover:text-amber-900 flex items-center justify-between p-2 bg-amber-100 rounded"
              >
                <span>{action.message}</span>
                <span className="font-medium">{action.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="New Feedback"
          value={stats.feedback.new}
          subtitle={`${stats.feedback.total} total`}
          icon={<MessageSquare className="h-6 w-6" />}
          bgColor="bg-purple-50"
          iconColor="text-purple-500"
          href="/admin/feedback"
        />
        <StatCard
          title="Pending Enquiries"
          value={stats.enquiries.pending}
          subtitle={`${stats.enquiries.approved} approved`}
          icon={<FileText className="h-6 w-6" />}
          bgColor="bg-blue-50"
          iconColor="text-blue-500"
          href="/admin/enquiries"
        />
        <StatCard
          title="Pending Admissions"
          value={stats.admissions.pending}
          subtitle={`${stats.admissions.approved} approved`}
          icon={<ClipboardCheck className="h-6 w-6" />}
          bgColor="bg-green-50"
          iconColor="text-green-500"
          href="/admin/admissions"
        />
        <StatCard
          title="ATAT Registrations"
          value={stats.atatRegistrations.pending}
          subtitle={`${stats.atatRegistrations.total} total`}
          icon={<Award className="h-6 w-6" />}
          bgColor="bg-indigo-50"
          iconColor="text-indigo-500"
          href="/admin/atat-registrations"
        />
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Faculty"
          value={stats.faculty.active}
          subtitle={`${stats.faculty.total} total`}
          icon={<Users className="h-6 w-6" />}
          bgColor="bg-emerald-50"
          iconColor="text-emerald-500"
          href="/admin/faculty"
        />
        <StatCard
          title="Active Banners"
          value={stats.banners.active}
          subtitle={`${stats.banners.total} total`}
          icon={<Image className="h-6 w-6" />}
          bgColor="bg-pink-50"
          iconColor="text-pink-500"
          href="/admin/banners"
        />
        <StatCard
          title="This Month Holidays"
          value={stats.holidays.thisMonth}
          subtitle={`${stats.holidays.total} total`}
          icon={<CalendarDays className="h-6 w-6" />}
          bgColor="bg-amber-50"
          iconColor="text-amber-500"
          href="/admin/holidays"
        />
        <StatCard
          title="Photo Albums"
          value={stats.albums.active}
          subtitle={`${stats.albums.total} total`}
          icon={<Image className="h-6 w-6" />}
          bgColor="bg-cyan-50"
          iconColor="text-cyan-500"
          href="/admin/gallery/albums"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex items-center space-x-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'feedback' ? 'bg-purple-100' :
                      activity.type === 'enquiry' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {activity.type === 'feedback' ? (
                        <MessageSquare className="h-4 w-4 text-purple-600" />
                      ) : activity.type === 'enquiry' ? (
                        <FileText className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ClipboardCheck className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.message}
                      </p>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(activity.time)}
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          activity.status === 'new' || activity.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : activity.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Holidays & Quick Actions */}
        <div className="space-y-6">
          {/* Upcoming Holidays */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Holidays</h2>
            <div className="space-y-3">
              {upcomingHolidays.length > 0 ? (
                upcomingHolidays.map((holiday, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{holiday.name}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(holiday.date).toLocaleDateString()}
                      </p>
                    </div>
                    <CalendarDays className="h-4 w-4 text-amber-600" />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-2">No upcoming holidays</p>
              )}
            </div>
            <Link 
              href="/admin/holidays" 
              className="block w-full mt-4 text-center text-sm text-[#8b1a1a] hover:text-[#6d1414] font-medium"
            >
              View all holidays →
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/announcements/new"
                className="flex items-center space-x-3 w-full py-3 px-4 text-sm bg-[#8b1a1a]/10 text-[#8b1a1a] rounded-md hover:bg-[#8b1a1a]/20 transition-colors"
              >
                <BellRing className="h-4 w-4" />
                <span>Add Announcement</span>
              </Link>
              <Link
                href="/admin/holidays/new"
                className="flex items-center space-x-3 w-full py-3 px-4 text-sm bg-[#8b1a1a]/10 text-[#8b1a1a] rounded-md hover:bg-[#8b1a1a]/20 transition-colors"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Add Holiday</span>
              </Link>
              <Link
                href="/admin/faculty/new"
                className="flex items-center space-x-3 w-full py-3 px-4 text-sm bg-[#8b1a1a]/10 text-[#8b1a1a] rounded-md hover:bg-[#8b1a1a]/20 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Add Faculty</span>
              </Link>
              <Link
                href="/admin/gallery/albums/new"
                className="flex items-center space-x-3 w-full py-3 px-4 text-sm bg-[#8b1a1a]/10 text-[#8b1a1a] rounded-md hover:bg-[#8b1a1a]/20 transition-colors"
              >
                <Image className="h-4 w-4" />
                <span>Create Album</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}