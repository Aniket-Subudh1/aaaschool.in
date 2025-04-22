import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary configuration is incomplete. Please check your environment variables.');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string,
  filename: string,
  fileType: string
): Promise<{ 
  secure_url: string; 
  public_id: string; 
  resource_type: string; 
  format: string 
}> => {
  return new Promise((resolve, reject) => {
    const resourceTypeMap: { [key: string]: "auto" | "image" | "raw" | "video" } = {
      'application/pdf': 'raw',
      'application/msword': 'raw',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'raw',
      'image/jpeg': 'image',
      'image/png': 'image',
      'image/gif': 'image'
    };

    const resourceType: "auto" | "image" | "raw" | "video" = resourceTypeMap[fileType] || 'auto';
    
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        public_id: `${filename}-${Date.now()}`,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            format: result.format
          });
        } else {
          reject(new Error('Unknown Cloudinary upload error'));
        }
      }
    );

    // Convert buffer to stream and upload
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};


export const deleteFromCloudinary = async (
  publicId: string, 
  resourceType: string = 'auto'
) => {
  try {
    return await cloudinary.uploader.destroy(publicId, { 
      resource_type: resourceType 
    });
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};


export const getCloudinaryUrl = (
  publicId: string,
  options: {
    width?: number,
    height?: number,
    crop?: string,
    quality?: string | number
  } = {}
) => {
  return cloudinary.url(publicId, {
    width: options.width || 400,
    height: options.height || 400,
    crop: options.crop || 'fill',
    quality: options.quality || 'auto',
    fetch_format: 'auto',
  });
};