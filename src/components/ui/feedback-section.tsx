"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Star,
  Send,
  User,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react";

export default function FeedbackSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    rating: 0,
    type: "parent",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim() ||
      !formData.type
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit feedback");
      }

      setIsSubmitted(true);

      // Reset form after some time
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          rating: 0,
          type: "parent",
        });
      }, 5000);
    } catch (err: any) {
      console.error("Error submitting feedback:", err);
      setError(
        err.message || "Failed to submit feedback. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-[#f0e6d2] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-cultural-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
        <div className="flex justify-center w-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`top-${i}`}
              className="w-6 h-8 bg-[#8b1a1a]/10 mx-0.5 rounded-b-lg"
            />
          ))}
        </div>
      </div>

      {/* Decorative temple silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M600,0 Q750,60 750,60 L450,60 Q450,60 600,0 Z"
            fill="#8b1a1a"
          />
          <path
            d="M400,40 Q450,60 450,60 L350,60 Q350,60 400,40 Z"
            fill="#8b1a1a"
          />
          <path
            d="M800,40 Q850,60 850,60 L750,60 Q750,60 800,40 Z"
            fill="#8b1a1a"
          />
          <rect x="300" y="60" width="600" height="80" fill="#8b1a1a" />
          <rect x="0" y="140" width="1200" height="60" fill="#8b1a1a" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-md"></div>
              <div className="relative z-10 bg-[#f0e6d2] border-2 border-[#8b1a1a]/20 rounded-full p-3">
                <MessageSquare className="h-8 w-8 text-[#8b1a1a]" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#8b1a1a] mb-4 font-serif">
            Your Feedback Matters
          </h2>
          <p className="text-[#5a3e36] max-w-2xl mx-auto">
            We value your opinions and suggestions to continuously improve our
            services and provide the best education for your children.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-[#d4b483]/20 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-[#8b1a1a] to-[#a52a2a] p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <p className="mb-6 text-white/90">
                  We'd love to hear from you. Your feedback helps us serve you
                  better.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-white/90">
                        aryavartaa.krd@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-sm text-white/90">9124654094</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="w-12 h-1 bg-white/50 mb-4"></div>
                  <p className="text-sm text-white/90">
                    "Education is not the filling of a pail, but the lighting of
                    a fire."
                  </p>
                  <p className="text-sm text-white/70 mt-1">
                    - William Butler Yeats
                  </p>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="h-full flex flex-col items-center justify-center text-center py-8"
                    >
                      <div className="bg-green-100 text-green-800 p-3 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-[#8b1a1a] mb-2">
                        Thank You!
                      </h3>
                      <p className="text-[#5a3e36]">
                        Your feedback has been submitted successfully. We
                        appreciate your input!
                      </p>
                      <p className="text-[#5a3e36] mt-4">
                        We've sent a confirmation to your email address.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                          {error}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-[#5a3e36] mb-1">
                          I am a
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white text-[#5a3e36] border border-[#d4b483]/30 rounded-lg 
                                     focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                          required
                        >
                          <option value="parent">Parent</option>
                          <option value="student">Student</option>
                          <option value="alumni">Alumni</option>
                          <option value="visitor">Visitor</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#5a3e36] mb-1">
                            Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-[#8b1a1a]/50" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full bg-white text-[#5a3e36] pl-10 pr-4 py-2 border border-[#d4b483]/30 rounded-lg 
                              focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                              placeholder="Your name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#5a3e36] mb-1">
                            Email
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-[#8b1a1a]/50" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-white text-[#5a3e36] pl-10 pr-4 py-2 border border-[#d4b483]/30 rounded-lg 
                              focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                              placeholder="Your email"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5a3e36] mb-1">
                          Phone (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-[#8b1a1a]/50" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white text-[#5a3e36] pl-10 pr-4 py-2 border border-[#d4b483]/30 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5a3e36] mb-1">
                          Your Feedback
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-white text-[#5a3e36] px-4 py-2 border border-[#d4b483]/30 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                          placeholder="Share your thoughts, suggestions, or concerns..."
                          required
                        ></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5a3e36] mb-2">
                          Rate Your Experience
                        </label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => handleRatingClick(rating)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  rating <= formData.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#8b1a1a] text-white py-3 px-6 rounded-lg hover:bg-[#8b1a1a]/90 transition-colors flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <>
                              Submit Feedback <Send className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
