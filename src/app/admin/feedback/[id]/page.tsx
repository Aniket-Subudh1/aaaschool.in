"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, User, Mail, Phone, Star, Send, Trash2 } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import DeleteConfirmation from "@/components/admin/DeleteConfirmation";
import { Feedback } from "@/lib/models";
import { use } from "react"; // Import React.use

interface FeedbackDetailPageProps {
  params: Promise<{ id: string }>; 
}

export default function FeedbackDetailPage({ params }: FeedbackDetailPageProps) {
  const { id } = use(params); // Unwrap params with React.use
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/feedback/${id}`);
        if (!res.ok) throw new Error("Failed to fetch feedback");

        const data = await res.json();
        setFeedback(data);

        // If this is the first time viewing the feedback, mark it as read
        if (data.status === "new") {
          await markAsRead();
        }

        // Pre-fill response if it exists
        if (data.responseMessage) {
          setResponseMessage(data.responseMessage);
        }
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  const markAsRead = async () => {
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "read" }),
      });

      if (!res.ok) throw new Error("Failed to update feedback status");

      const updatedFeedback = await res.json();
      setFeedback(updatedFeedback);
    } catch (err) {
      console.error("Error marking feedback as read:", err);
      // Don't show error to user for this operation
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!responseMessage.trim()) {
      setError("Response message is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "responded",
          responseMessage,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send response");
      }

      const updatedFeedback = await res.json();
      setFeedback(updatedFeedback);
      setIsSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error("Error sending response:", err);
      setError(err.message || "Failed to send response");
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

      const res = await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete feedback");

      router.push("/admin/feedback");
      router.refresh();
    } catch (err) {
      console.error("Error deleting feedback:", err);
      alert("Failed to delete feedback");
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-200",
          label: "New",
        };
      case "read":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-600",
          border: "border-yellow-200",
          label: "Read",
        };
      case "responded":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          border: "border-green-200",
          label: "Responded",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-600",
          border: "border-gray-200",
          label: status,
        };
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "parent":
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          border: "border-purple-200",
        };
      case "student":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-200",
        };
      case "alumni":
        return {
          bg: "bg-orange-50",
          text: "text-orange-600",
          border: "border-orange-200",
        };
      case "visitor":
        return {
          bg: "bg-green-50",
          text: "text-green-600",
          border: "border-green-200",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-600",
          border: "border-gray-200",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-32 bg-gray-200 rounded mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        Feedback not found or could not be loaded.
        <div className="mt-4">
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Feedback List
          </button>
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(feedback.status);
  const typeBadge = getTypeBadge(feedback.type);

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Feedback List
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-purple-50 text-purple-600 mr-3">
            <MessageSquare size={24} />
          </div>
          <h1 className="text-2xl font-bold text-[#8b1a1a]">Feedback Details</h1>
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

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
          Response sent successfully!
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
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
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} border ${statusBadge.border}`}
            >
              {statusBadge.label}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeBadge.bg} ${typeBadge.text} border ${typeBadge.border}`}
            >
              {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Message:</h4>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <p className="text-gray-700 whitespace-pre-line">{feedback.message}</p>
          </div>
        </div>

        {feedback.rating && (
          <div className="mt-4 flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Rating:</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < (feedback.rating ?? 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Received on{" "}
          {new Date(feedback.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-[#8b1a1a] mb-4">
          {feedback.status === "responded" ? "Your Response" : "Respond to Feedback"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="responseMessage" className="block text-sm font-medium text-gray-700 mb-1">
                Response Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="responseMessage"
                name="responseMessage"
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={6}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Type your response here..."
                required
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">
                This response will be sent to {feedback.name} via email.
              </p>
            </div>

            {feedback.status === "responded" && feedback.responseDate && (
              <div className="text-sm text-gray-600">
                Response sent on{" "}
                {new Date(feedback.responseDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>

          {feedback.status !== "responded" && (
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || !responseMessage.trim()}
                className="inline-flex items-center px-6 py-3 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Response
                  </>
                )}
              </button>
            </div>
          )}

          {feedback.status === "responded" && (
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || !responseMessage.trim()}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Update Response
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      <DeleteConfirmation
        title={`Are you sure you want to delete this feedback from "${feedback.name}"?`}
        message="This will permanently delete the feedback and any associated responses."
        isOpen={deleteModal.isOpen}
        isDeleting={deleteModal.isDeleting}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}