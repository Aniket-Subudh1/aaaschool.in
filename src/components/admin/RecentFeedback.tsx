"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Feedback } from '@/lib/models';
import { MessageSquare, ChevronRight } from 'lucide-react';

interface RecentFeedbackProps {
  isLoading: boolean;
}

export default function RecentFeedback({ isLoading }: RecentFeedbackProps) {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isLoading) {
      const fetchRecentFeedback = async () => {
        try {
          const res = await fetch('/api/feedback?status=new');
          if (!res.ok) throw new Error('Failed to fetch feedback');
          
          const data = await res.json();
          setFeedback(data.slice(0, 5)); // Get only 5 most recent
        } catch (err) {
          console.error('Error fetching recent feedback:', err);
          setError('Failed to load recent feedback');
        }
      };
      
      fetchRecentFeedback();
    }
  }, [isLoading]);
  
  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#8b1a1a]">Recent Feedback</h2>
          <Link href="/admin/feedback" className="text-sm text-[#8b1a1a] hover:underline">
            View all
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#8b1a1a]">Recent Feedback</h2>
        <Link href="/admin/feedback" className="text-sm text-[#8b1a1a] hover:underline flex items-center">
          View all <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-start p-4 border-b border-gray-100">
              <div className="bg-gray-200 rounded-full h-10 w-10"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : feedback.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare size={40} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No new feedback yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <Link key={item._id} href={`/admin/feedback/${item._id}`}>
              <div className="flex items-start p-4 border-b border-gray-100 hover:bg-gray-50 rounded-md">
                <div className="bg-[#8b1a1a]/10 text-[#8b1a1a] p-2 rounded-full">
                  <MessageSquare size={16} />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.type} • {new Date(item.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-700 line-clamp-1 mt-1">{item.message}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}