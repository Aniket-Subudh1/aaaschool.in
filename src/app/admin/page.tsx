"use client";

import { useState, useEffect } from 'react';
import { Home, BellRing, CalendarDays, MessageSquare } from 'lucide-react';
import AdminStats from '@/components/admin/AdminStats';
import RecentFeedback from '@/components/admin/RecentFeedback';
import { authFetch } from '@/lib/authFetch';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    announcements: 0,
    notifications: 0,
    holidays: 0,
    feedback: {
      total: 0,
      new: 0,
      responded: 0,
    },
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch announcements
        const announcementsRes = await authFetch('/api/announcements');
        const announcements = await announcementsRes.json();
        
        // Fetch notifications
        const notificationsRes = await authFetch('/api/notifications');
        const notifications = await notificationsRes.json();
        
        // Fetch holidays
        const holidaysRes = await authFetch('/api/holidays');
        const holidays = await holidaysRes.json();
        
        // Fetch feedback
        const feedbackRes = await authFetch('/api/feedback');
        
        if (!feedbackRes.ok) {
          throw new Error('Failed to fetch feedback');
        }
        
        const feedback = await feedbackRes.json();
        
        // Make sure feedback is an array before filtering
        const feedbackArray = Array.isArray(feedback) ? feedback : [];
        
        // Count feedback by status
        const newFeedback = feedbackArray.filter((f: any) => f.status === 'new').length;
        const respondedFeedback = feedbackArray.filter((f: any) => f.status === 'responded').length;
        
        setStats({
          announcements: announcements.length,
          notifications: notifications.length,
          holidays: holidays.length,
          feedback: {
            total: feedbackArray.length,
            new: newFeedback,
            responded: respondedFeedback,
          },
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#8b1a1a] mb-2">Admin Dashboard</h1>
        <p className="text-[#5a3e36]">
          Welcome to the Aryavart Ancient Academy admin panel. Manage your website content from here.
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStats 
          title="Announcements" 
          count={stats.announcements} 
          icon={<BellRing className="h-6 w-6" />} 
          bgColor="bg-blue-50" 
          iconColor="text-blue-500" 
          isLoading={isLoading} 
          href="/admin/announcements"
        />
        <AdminStats 
          title="Notifications" 
          count={stats.notifications} 
          icon={<Home className="h-6 w-6" />} 
          bgColor="bg-green-50" 
          iconColor="text-green-500" 
          isLoading={isLoading} 
          href="/admin/notifications"
        />
        <AdminStats 
          title="Holiday Calendar" 
          count={stats.holidays} 
          icon={<CalendarDays className="h-6 w-6" />} 
          bgColor="bg-amber-50" 
          iconColor="text-amber-500" 
          isLoading={isLoading} 
          href="/admin/holidays"
        />
        <AdminStats 
          title="New Feedback" 
          count={stats.feedback.new} 
          icon={<MessageSquare className="h-6 w-6" />} 
          bgColor="bg-purple-50" 
          iconColor="text-purple-500" 
          isLoading={isLoading} 
          href="/admin/feedback"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentFeedback isLoading={isLoading} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-[#8b1a1a] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/announcements/new"
              className="block w-full py-2 px-4 text-sm bg-[#8b1a1a]/10 text-[#8b1a1a] rounded-md hover:bg-[#8b1a1a]/20 transition-colors text-center"
            >
              Add New Announcement
            </a>
            <a
              href="/admin/notifications/new"
              className="block w-full py-2 px-4 text-sm bg-[#8b1a1a]/10 text-[#8b1a1a] rounded-md hover:bg-[#8b1a1a]/20 transition-colors text-center"
            >
              Add New Notification
            </a>
            <a
              href="/admin/holidays/new"
              className="block w-full py-2 px-4 text-sm bg-[#8b1a1a]/10 text-[#8b1a1a] rounded-md hover:bg-[#8b1a1a]/20 transition-colors text-center"
            >
              Add New Holiday
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}