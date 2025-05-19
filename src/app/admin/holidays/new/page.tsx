"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { FormControls } from '@/components/admin/FormControls';
import { authFetch } from '@/lib/authFetch';

// Updated holiday type options with "Other" option
const holidayTypeOptions = [
  { value: 'national', label: 'National Holiday' },
  { value: 'religious', label: 'Religious Holiday' },
  { value: 'school', label: 'School Event' },
  { value: 'exam', label: 'Examination' },
  { value: 'other', label: 'Other' }, // Added "Other" option
];

export default function NewHolidayPage() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    endDate: '', 
    isDateRange: false, 
    type: 'national',
    customType: '',
    description: '',
    active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Holiday name is required');
      return false;
    }
    
    if (!formData.date) {
      setError('Start date is required');
      return false;
    }
    
    if (formData.isDateRange && !formData.endDate) {
      setError('End date is required when using date range');
      return false;
    }
    
    if (formData.isDateRange && formData.endDate < formData.date) {
      setError('End date must be after start date');
      return false;
    }
    
    if (formData.type === 'other' && !formData.customType.trim()) {
      setError('Custom type is required when "Other" is selected');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Prepare data for submission
      const holidayData = {
        ...formData,
        endDate: formData.isDateRange ? formData.endDate : undefined,
        customType: formData.type === 'other' ? formData.customType : undefined,
      };
      
      // Use authFetch instead of fetch
      const res = await authFetch('/api/holidays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(holidayData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create holiday');
      }
      
    
      setSuccessMessage('Holiday added successfully!');
      
      
      setFormData({
        name: '',
        date: '',
        endDate: '',
        isDateRange: false,
        type: 'national',
        customType: '',
        description: '',
        active: true,
      });
      
      setTimeout(() => {
        router.push('/admin/holidays');
      }, 2000);

    } catch (err: Error | unknown) {
      console.error('Error creating holiday:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create holiday';
      setError(errorMessage);
    } finally {
    }
  };
  
  const handleCancel = () => {
    router.back();
  };
  
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
      
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-amber-50 text-amber-600 mr-3">
          <Calendar size={24} />
        </div>
        <h1 className="text-2xl font-bold text-[#8b1a1a]">Add New Holiday</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6 flex items-center">
          <AlertCircle size={16} className="mr-2 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5" />
          {successMessage}
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
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="isDateRange"
                  name="isDateRange"
                  checked={formData.isDateRange}
                  onChange={(e) => setFormData((prev) => ({ ...prev, isDateRange: e.target.checked }))}
                  className="h-4 w-4 text-[#8b1a1a] focus:ring-[#8b1a1a]/50 border-gray-300 rounded"
                />
                <label htmlFor="isDateRange" className="ml-2 block text-sm text-gray-700">
                  Date Range (Multiple Days)
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.isDateRange ? 'Start Date' : 'Date'} <span className="text-red-500">*</span>
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
                
                {formData.isDateRange && (
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                      required={formData.isDateRange}
                    />
                  </div>
                )}
              </div>
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
            
            {formData.type === 'other' && (
              <div>
                <label htmlFor="customType" className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Holiday Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="customType"
                  name="customType"
                  value={formData.customType}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                  placeholder="Enter custom holiday type"
                  required={formData.type === 'other'}
                />
              </div>
            )}
            
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
            submitText="Create Holiday"
          />
        </form>
      </div>
    </div>
  );
}