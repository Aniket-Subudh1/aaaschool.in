import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your-api-key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your-api-secret',
  secure: true
});

/**
 * Upload file buffer to Cloudinary
 * @param fileBuffer - File buffer to upload
 * @param folder - Cloudinary folder to store the image
 * @param filename - Desired filename (without extension)
 * @returns Cloudinary upload response
 */
export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string,
  filename: string
) => {
  return new Promise((resolve, reject) => {
    // Convert buffer to base64 data URL
    const b64 = Buffer.from(fileBuffer).toString('base64');
    const dataURI = `data:image/jpeg;base64,${b64}`;
    
    cloudinary.uploader.upload(
      dataURI,
      {
        folder: folder,
        public_id: `${filename}-${Date.now()}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

/**
 * Delete an image from Cloudinary
 * @param publicId - Cloudinary public ID of the image
 * @returns Cloudinary deletion response
 */
export const deleteFromCloudinary = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};

/**
 * Get Cloudinary image URL with transformations
 * @param publicId - Cloudinary public ID of the image
 * @param width - Desired width
 * @param height - Desired height
 * @param crop - Crop mode
 * @returns Transformed image URL
 */
export const getCloudinaryUrl = (
  publicId: string,
  width = 400,
  height = 400,
  crop = 'fill'
) => {
  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality: 'auto',
    fetch_format: 'auto',
  });
};

export default cloudinary;