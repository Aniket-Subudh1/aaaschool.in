import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN || '';

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !BUCKET_NAME) {
  console.warn('AWS S3 configuration is incomplete. File uploads may fail.');
}

interface UploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
}


export const uploadToS3 = async (
  fileBuffer: Buffer,
  folder: string,
  filename: string,
  fileType: string = 'application/octet-stream'
): Promise<UploadResult> => {
  try {
    const sanitizedFilename = `${filename.replace(/\s+/g, '-')}-${Date.now()}`;
    const fileExtension = getFileExtension(fileType);
    const key = `${folder}/${sanitizedFilename}.${fileExtension}`;
    
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: fileType,
      CacheControl: 'max-age=31536000', 
    });
    
    await s3Client.send(command);
    

    const fileUrl = CLOUDFRONT_DOMAIN 
      ? `https://${CLOUDFRONT_DOMAIN}/${key}`
      : `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
    
    return {
      secure_url: fileUrl,
      public_id: key, 
      resource_type: getResourceType(fileType),
      format: fileExtension
    };
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};


export const deleteFromS3 = async (
  publicId: string
): Promise<{ result: string }> => {
  try {
    if (!publicId) {
      console.warn('Empty publicId provided to deleteFromS3, skipping deletion');
      return { result: 'not_found' };
    }
    
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: publicId,
    });
    
    await s3Client.send(command);
    return { result: 'ok' };
  } catch (error) {
    console.error('Error deleting from S3:', error);
    return { result: 'error' };
  }
};

export const getS3ImageUrl = (
  key: string,
  options: {
    width?: number,
    height?: number,
    crop?: string,
    quality?: number
  } = {}
) => {

  if (!CLOUDFRONT_DOMAIN) {
    return `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
  }
  
  if (!options.width && !options.height && !options.crop && !options.quality) {
    return `https://${CLOUDFRONT_DOMAIN}/${key}`;
  }
  
  const params: string[] = [];
  if (options.width) params.push(`w_${options.width}`);
  if (options.height) params.push(`h_${options.height}`);
  if (options.crop) params.push(`c_${options.crop}`);
  if (options.quality) params.push(`q_${options.quality}`);
  
  const transformParams = params.length > 0 ? `/${params.join(',')}` : '';
  return `https://${CLOUDFRONT_DOMAIN}${transformParams}/${key}`;
};

function getFileExtension(mimeType: string): string {
  const extensions: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'text/plain': 'txt',
    'text/csv': 'csv',
    'application/json': 'json',
    'application/xml': 'xml',
    'text/html': 'html',
    'text/css': 'css',
    'application/javascript': 'js',
    'application/zip': 'zip'
  };
  
  return extensions[mimeType] || 'bin';
}

function getResourceType(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'raw';
  if (mimeType.includes('document')) return 'raw';
  if (mimeType.includes('text/')) return 'raw';
  if (mimeType.includes('application/')) return 'raw';
  return 'auto';
}