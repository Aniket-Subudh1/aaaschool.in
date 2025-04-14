"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BellRing } from 'lucide-react';
import { FormControls } from '@/components/admin/FormControls';
import { authFetch } from '@/lib/authFetch';
import Cookies from 'js-cookie';

export default function NewAnnouncementPage() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Announcement title is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Check if token exists before making request
      const token = Cookies.get('admin-token');
      console.log("Token exists before fetch:", !!token);
      
      if (!token) {
        // If no token, try setting a test token to see if cookies are working
        console.log("No token found, testing cookie functionality...");
        Cookies.set('test-cookie', 'working');
        const testCookie = Cookies.get('test-cookie');
        console.log("Test cookie set and retrieved:", !!testCookie);
        
        setError("Authentication token not found. Please log in again.");
        return;
      }
      
      // Manual implementation instead of using authFetch to better debug
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);
      
      console.log("Sending request with headers:");
      console.log("- Content-Type:", headers.get('Content-Type'));
      console.log("- Authorization:", "Bearer " + token.substring(0, 10) + "...");
      
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });
      
      console.log("Response status:", res.status, res.statusText);
      
      // Try to get the response body
      let errorData;
      try {
        errorData = await res.json();
        console.log("Response body:", errorData);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
      }
      
      if (!res.ok) {
        throw new Error(errorData?.message || 'Failed to create announcement');
      }
      
      router.push('/admin/announcements');
      router.refresh();
    } catch (err: any) {
      console.error('Error creating announcement:', err);
      setError(err.message || 'Failed to create announcement');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    router.back();
  };
  
  // Check token on page load
  const checkToken = () => {
    const token = Cookies.get('admin-token');
    console.log("Admin token exists on page load:", !!token);
    if (token) {
      console.log("Token begins with:", token.substring(0, 10) + "...");
    }
  };
  
  // Run token check
  checkToken();
  
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Announcements
        </button>
      </div>
      
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
          <BellRing size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#8b1a1a]">Add New Announcement</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Announcement Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Enter announcement title"
                required
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Event Date (Optional)
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
              />
              <p className="mt-1 text-sm text-gray-500">
                If this announcement is for a specific event, you can set the date
              </p>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300 rounded"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                Active (display on website)
              </label>
            </div>
          </div>
          
          <FormControls
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            submitText="Create Announcement"
          />
        </form>
      </div>
    </div>
  );
}