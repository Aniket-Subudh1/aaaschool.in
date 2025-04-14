interface FormControlsProps {
    isSubmitting: boolean;
    onCancel: () => void;
    submitText?: string;
  }
  
  export function FormControls({ 
    isSubmitting, 
    onCancel, 
    submitText = "Save" 
  }: FormControlsProps) {
    return (
      <div className="flex items-center justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 disabled:opacity-50 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            submitText
          )}
        </button>
      </div>
    );
  }