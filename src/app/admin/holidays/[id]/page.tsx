"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Trash2 } from 'lucide-react';
import { FormControls } from '@/components/admin/FormControls';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';

const holidayTypeOptions = [
  { value: 'national', label: 'National Holiday' },
  { value: 'religious', label: 'Religious Holiday' },
  { value: 'school', label: 'School Event' },
  { value: 'exam', label: 'Examination' },
];

interface EditHolidayPageProps {
  params: {
    id: string;
  };
}

export default function EditHolidayPage({ params }: EditHolidayPageProps) {
  const { id } = params;
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: 'national',
    description: '',
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
    const fetchHoliday = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const res = await fetch(`/api/holidays/${id}`);
        if (!res.ok) throw new Error('Failed to fetch holiday');
        
        const data = await res.json();
        setFormData({
          name: data.name || '',
          date: data.date || '',
          type: data.type || 'national',
          description: data.description || '',
          active: data.active || false,
        });
      } catch (err) {
        console.error('Error fetching holiday:', err);
        setError('Failed to load holiday. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHoliday();
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
    
    if (!formData.name.trim() || !formData.date || !formData.type) {
      setError('Name, date, and type are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const res = await fetch(`/api/holidays/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update holiday');
      }
      
      router.push('/admin/holidays');
      router.refresh();
    } catch (err: any) {
      console.error('Error updating holiday:', err);
      setError(err.message || 'Failed to update holiday');
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
      
      const res = await fetch(`/api/holidays/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete holiday');
      
      router.push('/admin/holidays');
      router.refresh();
    } catch (err) {
      console.error('Error deleting holiday:', err);
      alert('Failed to delete holiday');
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
          Back to Holidays
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-amber-50 text-amber-600 mr-3">
            <Calendar size={24} />
          </div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Edit Holiday</h1>
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Holiday Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Enter holiday name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Holiday Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                required
              >
                {holidayTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Enter additional details about this holiday"
              ></textarea>
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
            submitText="Update Holiday"
          />
        </form>
      </div>
      
      <DeleteConfirmation
        title="Are you sure you want to delete this holiday?"
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}