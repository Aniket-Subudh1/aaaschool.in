"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Trash2, Search, Star, Filter, User, Mail, Phone } from 'lucide-react';
import NoData from '@/components/admin/NoData';
import DeleteConfirmation from '@/components/admin/DeleteConfirmation';
import { Feedback } from '@/lib/models';
import { authFetch } from '@/lib/authFetch';

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    isDeleting: boolean;
    feedback: Feedback | null;
  }>({
    isOpen: false,
    isDeleting: false,
    feedback: null,
  });
  
  useEffect(() => {
    fetchFeedback();
  }, [filterStatus]);
  
  const fetchFeedback = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const query = filterStatus ? `?status=${filterStatus}` : '';
      const res = await authFetch(`/api/feedback${query}`);
      if (!res.ok) throw new Error('Failed to fetch feedback');
      
      const data = await res.json();
      setFeedbackList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to load feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const openDeleteModal = (feedback: Feedback) => {
    setDeleteModal({
      isOpen: true,
      isDeleting: false,
      feedback,
    });
  };
  
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      isDeleting: false,
      feedback: null,
    });
  };
  
  const confirmDelete = async () => {
    if (!deleteModal.feedback?._id) return;
    
    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }));
      
      const res = await authFetch(`/api/feedback/${deleteModal.feedback._id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete feedback');
      
      // Remove deleted feedback from state
      setFeedbackList((prev) =>
        prev.filter((item) => item._id !== deleteModal.feedback?._id)
      );
      
      closeDeleteModal();
    } catch (err) {
      console.error('Error deleting feedback:', err);
      alert('Failed to delete feedback');
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };
  
  // Get unique feedback types
  const feedbackTypes = [...new Set(feedbackList.map((feedback) => feedback.type))];
  
  // Filter feedbacks by search query, status, and type
  const filteredFeedback = feedbackList.filter((feedback) => {
    // Check if feedback matches search query
    const matchesSearch = 
      feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (feedback.message && feedback.message.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Check if feedback matches type filter (if active)
    const matchesType = filterType ? feedback.type === filterType : true;
    
    return matchesSearch && matchesType;
  });
  
  // Sort feedback by date (newest first)
  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          label: 'New',
        };
      case 'read':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-600',
          border: 'border-yellow-200',
          label: 'Read',
        };
      case 'responded':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'border-green-200',
          label: 'Responded',
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          border: 'border-gray-200',
          label: status,
        };
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'parent':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-200',
        };
      case 'student':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
        };
      case 'alumni':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-600',
          border: 'border-orange-200',
        };
      case 'visitor':
        return {
          bg: 'bg-green-50',
          text: 'text-green-600',
          border: 'border-green-200',
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          border: 'border-gray-200',
        };
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Feedback</h1>
          <p className="text-gray-600">Manage user feedback and inquiries</p>
        </div>
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
              placeholder="Search feedback..."
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
                onClick={() => setFilterStatus(filterStatus ? null : 'new')}
              >
                <Filter size={16} className="mr-2" />
                {filterStatus ? `Status: ${filterStatus}` : 'Filter by Status'}
              </button>
              
              {filterStatus !== null && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setFilterStatus(null)}
                  >
                    Show All
                  </button>
                  {['new', 'read', 'responded'].map((status) => (
                    <button
                      key={status}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        filterStatus === status ? 'bg-gray-100 font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => setFilterStatus(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-md"
                onClick={() => setFilterType(filterType ? null : 'parent')}
              >
                <User size={16} className="mr-2" />
                {filterType ? `Type: ${filterType}` : 'Filter by Type'}
              </button>
              
              {filterType !== null && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 border border-gray-200">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setFilterType(null)}
                  >
                    Show All
                  </button>
                  {feedbackTypes.map((type) => (
                    <button
                      key={type}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        filterType === type ? 'bg-gray-100 font-medium' : 'text-gray-700'
                      }`}
                      onClick={() => setFilterType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
        ) : sortedFeedback.length === 0 ? (
          <NoData
            message="No feedback found"
            buttonText="Go to Dashboard"
            href="/admin"
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedFeedback.map((feedback) => {
              const statusBadge = getStatusBadge(feedback.status);
              const typeBadge = getTypeBadge(feedback.type);
              
              return (
                <div
                  key={feedback._id}
                  className={`p-4 hover:bg-gray-50 ${
                    feedback.status === 'new' ? 'bg-blue-50/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${typeBadge.bg} ${typeBadge.text}`}>
                        <User size={18} />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">{feedback.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-0.5">
                          <Mail className="h-3 w-3 mr-1" />
                          {feedback.email}
                          {feedback.phone && (
                            <>
                              <span className="mx-2">•</span>
                              <Phone className="h-3 w-3 mr-1" />
                              {feedback.phone}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}>
                        {statusBadge.label}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeBadge.bg} ${typeBadge.text} border ${typeBadge.border}`}>
                        {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                      </span>
                      <button
                        onClick={() => openDeleteModal(feedback)}
                        className="p-1 rounded-full text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-200">
                    <p className="whitespace-pre-line">{feedback.message}</p>
                  </div>
                  
                  {feedback.rating && (
                    <div className="mt-2 flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < (feedback.rating ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <Link
                      href={`/admin/feedback/${feedback._id}`}
                      className="inline-flex items-center text-sm text-[#8b1a1a] hover:underline"
                    >
                      {feedback.status === 'responded' ? 'View Response' : 'Respond to Feedback'} →
                    </Link>
                  </div>
                  
                  {feedback.status === 'responded' && feedback.responseMessage && (
                    <div className="mt-3 bg-green-50 p-3 rounded-md border border-green-200">
                      <div className="text-xs font-medium text-green-700 mb-1">Your Response:</div>
                      <p className="text-sm text-green-800 whitespace-pre-line">{feedback.responseMessage}</p>
                      <div className="text-xs text-green-700 mt-1">
                        {feedback.responseDate && new Date(feedback.responseDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <DeleteConfirmation
        title={`Are you sure you want to delete the feedback from "${deleteModal.feedback?.name}"?`}
        message="This will permanently delete the feedback and any associated responses."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}