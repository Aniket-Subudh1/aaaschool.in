"use client";

import { useState } from 'react';
import { Trash2, AlertCircle, X } from 'lucide-react';

interface DeleteConfirmationProps {
  title: string;
  message?: string;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({
  title,
  message = "This action cannot be undone.",
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmationProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center text-red-600">
            <AlertCircle size={20} className="mr-2" />
            <h3 className="text-lg font-medium">Confirm Delete</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isDeleting}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <p className="mb-4 text-gray-700">{title}</p>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <Trash2 size={16} className="mr-2" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}