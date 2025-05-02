import { uploadToS3, deleteFromS3, getS3ImageUrl } from './s3';


export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string,
  filename: string,
  fileType?: string
): Promise<{ 
  secure_url: string; 
  public_id: string; 
  resource_type: string; 
  format: string 
}> => {
  return uploadToS3(fileBuffer, folder, filename, fileType || 'application/octet-stream');
};

export const deleteFromCloudinary = async (
  publicId: string
) => {
  return deleteFromS3(publicId);
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

  const qualityNum = typeof options.quality === 'string' 
    ? parseInt(options.quality) 
    : options.quality;
  

  return getS3ImageUrl(publicId, {
    ...options,
    quality: qualityNum
  });
};
