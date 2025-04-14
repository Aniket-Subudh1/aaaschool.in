"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BellRing, Plus, Edit, Trash2, Search, EyeOff, Eye } from 'lucide-react';
import NoData from '@/components/admin/NoData';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import { Announcement } from '@/lib/models';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    announcement: Announcement | null;
  }>({
    isOpen: false,
    isDeleting: false,
    announcement: null,
  });
  
  useEffect(() => {
    fetchAnnouncements();
  }, [showInactive]);
  
  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await fetch(`/api/announcements${showInactive ? '' : '?active=true'}`);
      if (!res.ok) throw new Error('Failed to fetch announcements');
      
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError('Failed to load announcements. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleAnnouncementStatus = async (id: string, currentActive: boolean) => {
    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !currentActive }),
      });
      
      if (!res.ok) throw new Error('Failed to update announcement');
      
      setAnnouncements((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, active: !currentActive } : item
        )
      );
    } catch (err) {
      console.error('Error updating announcement:', err);
      alert('Failed to update announcement status');
    }
  };
  
  const openDeleteModal = (announcement: Announcement) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      announcement,
    });
  };
  
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      announcement: null,
    });
  };
  
  const confirmDelete = async () => {
    if (!deleteModal.announcement?._id) return;
    
    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
      
      const res = await fetch(`/api/announcements/${deleteModal.announcement._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete announcement');
      
      // Remove deleted announcement from state
      setAnnouncements((prev) =>
        prev.filter((item) => item._id !== deleteModal.announcement?._id)
      );
      
      closeDeleteModal();
    } catch (err) {
      console.error('Error deleting announcement:', err);
      alert('Failed to delete announcement');
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };
  
  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Announcements</h1>
          <p className="text-gray-600">Manage announcements shown on the website</p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Plus size={16} className="mr-2" />
          Add New
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setShowInactive(!showInactive)}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              {showInactive ? (
                <>
                  <EyeOff size={16} className="mr-1" /> Hide Inactive
                </>
              ) : (
                <>
                  <Eye size={16} className="mr-1" /> Show Inactive
                </>
              )}
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <NoData
            message="No announcements found"
            buttonText="Add Announcement"
            href="/admin/announcements/new"
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement._id}
                className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
                  !announcement.active ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${announcement.active ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <BellRing size={18} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${announcement.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                      {announcement.date && ` • Event: ${announcement.date}`}
                      {!announcement.active && ' • Inactive'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAnnouncementStatus(announcement._id as string, announcement.active)}
                    className={`p-1 rounded-full ${
                      announcement.active
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={announcement.active ? 'Deactivate' : 'Activate'}
                  >
                    {announcement.active ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <Link
                    href={`/admin/announcements/${announcement._id}`}
                    className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(announcement)}
                    className="p-1 rounded-full text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <DeleteConfirmation
        title={`Are you sure you want to delete the announcement "${deleteModal.announcement?.title}"?`}
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
