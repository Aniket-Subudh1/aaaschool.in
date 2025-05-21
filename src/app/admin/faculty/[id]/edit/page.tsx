"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Upload, X, User, Loader2 } from "lucide-react";
import { FormControls } from "@/components/admin/FormControls";
import { authFetch } from "@/lib/authFetch";
import { ImageCropper } from "@/components/admin/ImageCropper";

interface Faculty {
  _id: string;
  name: string;
  position: string;
  department: string;
  email?: string;
  photoUrl?: string;
  bio?: string;
  qualifications?: string[];
  joinDate?: string;
  active: boolean;
}

export default function EditFacultyPage() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    bio: "",
    qualifications: "",
    joinDate: "",
    active: true,
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Image cropping state
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    fetchFaculty();
  }, [id]);

  const fetchFaculty = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await authFetch(`/api/faculty/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch faculty member");
      }

      const data = await res.json();
      setFaculty(data);

      setFormData({
        name: data.name || "",
        position: data.position || "",
        department: data.department || "",
        email: data.email || "",
        bio: data.bio || "",
        qualifications: data.qualifications
          ? data.qualifications.join(", ")
          : "",
        joinDate: data.joinDate || "",
        active: data.active || false,
      });

      setPhotoPreview(data.photoUrl || null);
    } catch (err) {
      console.error("Error fetching faculty member:", err);
      setError("Failed to load faculty member. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError(
        "Invalid file type. Only JPEG, PNG, and WebP images are allowed"
      );
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 5MB");
      return;
    }

    // Read the file and open the cropper
    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
    
    setError(null);
  };
  
  const handleCroppedImage = async (croppedImage: Blob) => {
    // Convert the cropped blob to a File object
    const croppedFile = new File([croppedImage], "cropped_image.jpg", {
      type: "image/jpeg",
    });
    
    setPhoto(croppedFile);
    setPhotoPreview(URL.createObjectURL(croppedFile));
    setShowCropper(false);
  };

  const cancelCrop = () => {
    setShowCropper(false);
    setOriginalImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePhoto = () => {
    if (!faculty?.photoUrl) {
      setPhoto(null);
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
        setPhotoPreview(null);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      // If using existing photo from faculty, just reset to that
      setPhoto(null);
      setPhotoPreview(faculty.photoUrl);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      if (
        !formData.name.trim() ||
        !formData.position.trim() ||
        !formData.department.trim()
      ) {
        throw new Error("Name, position, and department are required");
      }

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("position", formData.position);
      submitData.append("department", formData.department);
      if (formData.email) {
        submitData.append("email", formData.email);
      }
      submitData.append("bio", formData.bio);
      submitData.append("qualifications", formData.qualifications);
      submitData.append("joinDate", formData.joinDate);
      submitData.append("active", formData.active.toString());

      // Only add photo if a new one is selected
      if (photo) {
        submitData.append("photo", photo);
      }

      const res = await authFetch(`/api/faculty/${id}`, {
        method: "PUT",
        body: submitData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update faculty member");
      }

      // Redirect to faculty list
      router.push("/admin/faculty");
    } catch (err) {
      console.error("Error updating faculty member:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update faculty member"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="animate-spin text-[#8b1a1a]" />
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-md">
        <p>Faculty member not found or could not be loaded.</p>
        <button
          onClick={handleCancel}
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Faculty
        </button>
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
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-[#8b1a1a]">
            Edit Faculty Member
          </h1>
          <p className="text-gray-600">Update faculty member information</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mx-6 mt-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="e.g., Science Teacher, Principal"
                required
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="e.g., Science, Administration"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Enter email address (optional)"
              />
            </div>

            <div>
              <label
                htmlFor="joinDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Join Date
              </label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
              />
            </div>

            <div>
              <label
                htmlFor="qualifications"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Qualifications
              </label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="e.g., Ph.D., M.Sc., B.Ed. (comma separated)"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter qualifications separated by commas
              </p>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio/Description
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50"
                placeholder="Enter a brief bio or description"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Faculty Photo
              </p>

              {photoPreview ? (
                <div className="relative inline-block border border-gray-300 rounded-md p-2 mb-2">
                  <Image
                    src={photoPreview}
                    alt="Faculty photo preview"
                    width={200}
                    height={200}
                    className="object-cover h-48 w-48 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-8 mb-2 text-center inline-block">
                  <User size={64} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">No photo selected</p>
                </div>
              )}

              <div className="mt-2">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <Upload size={16} className="mr-2" />
                  {photo ? "Change Photo" : "Upload New Photo"}
                </button>
                <p className="mt-1 text-xs text-gray-500">
                  JPEG, PNG or WebP. Max 5MB. Recommended aspect ratio: 3:4.
                </p>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-[#8b1a1a] shadow-sm focus:border-[#8b1a1a] focus:ring focus:ring-[#8b1a1a]/20"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Active (visible on website)
                </span>
              </label>
            </div>
          </div>

          <FormControls
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
            submitText={isSubmitting ? "Saving..." : "Save Changes"}
          />
        </form>
      </div>
      
      {/* Image Cropper Modal */}
      {showCropper && originalImage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Adjust Faculty Photo</h3>
              <button 
                onClick={cancelCrop}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 flex-grow overflow-auto">
              <ImageCropper 
                image={originalImage} 
                onCrop={handleCroppedImage}
                aspectRatio={3/4} 
              />
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={cancelCrop}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#8b1a1a] rounded-md text-sm font-medium text-white hover:bg-[#8b1a1a]/90 focus:outline-none"
                // This button is handled in the ImageCropper component
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}