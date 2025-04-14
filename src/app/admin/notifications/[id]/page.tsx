"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, BookOpen, AlertCircle, Award, Dumbbell, Trash2 } from 'lucide-react';
import { FormControls } from '@/components/admin/FormControls';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';

// Icon options for notifications
const iconOptions = [
  { value: 'Bell', label: 'Bell', icon: <Bell size={16} /> },
  { value: 'BookOpen', label: 'Book', icon: <BookOpen size={16} /> },
  { value: 'AlertCircle', label: 'Alert', icon: <AlertCircle size={16} /> },
  { value: 'Award', label: 'Award', icon: <Award size={16} /> },
  { value: 'Dumbbell', label: 'Sports', icon: <Dumbbell size={16} /> },
];

interface EditNotificationPageProps {
  params: {
    id: string;
  };
}

export default function EditNotificationPage({ params }: EditNotificationPageProps) {
  const { id } = params;
  const [formData, setFormData] = useState({
    title: '',
    icon: 'Bell',
    date: '',
    active: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  });
  const router = useRouter();
  
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch(`/api/notifications/${id}`);
        if (!res.ok) throw new Error('Failed to fetch notification');
        
        const data = await res.json();
        setFormData({
          title: data.title || '',
          icon: data.icon || 'Bell',
          date: data.date || '',
          active: data.active || false,
        });
      } catch (err) {
        console.error('Error fetching notification:', err);
        setError('Failed to load notification. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNotification();
  }, [id]);
  
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
      setError('Notification title is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update notification');
      }
      
      router.push('/admin/notifications');
      router.refresh();
    } catch (err: any) {
      console.error('Error updating notification:', err);
      setError(err.message || 'Failed to update notification');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    router.back();
  };
  
  const openDeleteModal = () => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
    });
  };
  
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
    });
  };
  
  const confirmDelete = async () => {
    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
      
      const res = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete notification');
      
      router.push('/admin/notifications');
      router.refresh();
    } catch (err) {
      console.error('Error deleting notification:', err);
      alert('Failed to delete notification');
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Notifications
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-green-50 text-green-600 mr-3">
            <Bell size={24} />
          </div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Edit Notification</h1>
        </div>
        
        <button
          type="button"
          onClick={openDeleteModal}
          className="inline-flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
        >
          <Trash2 size={16} className="mr-2" />
          Delete
        </button>
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
                Notification Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Enter notification title"
                required
              />
            </div>
            
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {iconOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                      formData.icon === option.value
                        ? 'border-[#8b1a1a] bg-[#8b1a1a]/5'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="icon"
                      value={option.value}
                      checked={formData.icon === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="flex items-center">
                      <span className="mr-2">{option.icon}</span>
                      <span>{option.label}</span>
                    </span>
                  </label>
                ))}
              </div>
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
                If this notification is for a specific event, you can set the date
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
            submitText="Update Notification"
          />
        </form>
      </div>
      
      <DeleteConfirmation
        title="Are you sure you want to delete this notification?"
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}