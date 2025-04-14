"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Plus, Edit, Trash2, Search, EyeOff, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import NoData from '@/components/admin/NoData';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import { Holiday } from '@/lib/models';
import { authFetch } from '@/lib/authFetch';

const holidayTypeLabels = {
  'national': 'National Holiday',
  'religious': 'Religious Holiday',
  'school': 'School Event',
  'exam': 'Examination'
};

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    holiday: Holiday | null;
  }>({
    isOpen: false,
    isDeleting: false,
    holiday: null,
  });
  
  useEffect(() => {
    fetchHolidays();
  }, [showInactive]);
  
  const fetchHolidays = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await authFetch(`/api/holidays${showInactive ? '' : '?active=true'}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch holidays');
      }
      
      setHolidays(data.holidays || []);
    } catch (err) {
      console.error('Error fetching holidays:', err);
      setError(err instanceof Error ? err.message : 'Failed to load holidays');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleHolidayStatus = async (id: string, currentActive: boolean) => {
    try {
      const res = await authFetch(`/api/holidays/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ active: !currentActive }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update holiday');
      }
      
      setHolidays((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, active: !currentActive } : item
        )
      );
    } catch (err) {
      console.error('Error updating holiday:', err);
      setError(err instanceof Error ? err.message : 'Failed to update holiday');
    }
  };
  
  const openDeleteModal = (holiday: Holiday) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      holiday,
    });
  };
  
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      holiday: null,
    });
  };
  
  const confirmDelete = async () => {
    if (!deleteModal.holiday?._id) return;
    
    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
      
      const res = await authFetch(`/api/holidays/${deleteModal.holiday._id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to delete holiday');
      }
      
      // Remove deleted holiday from state
      setHolidays((prev) =>
        prev.filter((item) => item._id !== deleteModal.holiday?._id)
      );
      
      closeDeleteModal();
    } catch (err) {
      console.error('Error deleting holiday:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete holiday');
    }
  };
  
  // Filter holidays based on search query
  const filteredHolidays = holidays.filter((holiday) =>
    holiday.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    holiday.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">School Holidays</h1>
          <p className="text-gray-600">Manage and view all school holidays</p>
        </div>
        <Link
          href="/admin/holidays/new"
          className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
        >
          <Plus size={16} className="mr-2" />
          Add New Holiday
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6 flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
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
              placeholder="Search holidays..."
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
        ) : filteredHolidays.length === 0 ? (
          <NoData
            message="No holidays found"
            buttonText="Add Holiday"
            href="/admin/holidays/new"
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredHolidays.map((holiday) => (
              <div
                key={holiday._id}
                className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
                  !holiday.active ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${holiday.active ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${holiday.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {holiday.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(holiday.date).toLocaleDateString()}
                      {' '}•{' '}
                      {holidayTypeLabels[holiday.type]}
                      {!holiday.active && ' • Inactive'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleHolidayStatus(holiday._id as string, holiday.active)}
                    className={`p-1 rounded-full ${
                      holiday.active
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={holiday.active ? 'Deactivate' : 'Activate'}
                  >
                    {holiday.active ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <Link
                    href={`/admin/holidays/${holiday._id}`}
                    className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(holiday)}
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
        title={`Are you sure you want to delete the holiday "${deleteModal.holiday?.name}"?`}
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}