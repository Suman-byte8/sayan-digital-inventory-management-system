import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
if (process.env.CLOUDINARY_URL) {
    // CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
    // The SDK automatically parses this if set in environment variables,
    // but explicit configuration ensures it's loaded correctly if we need to access properties.
    // However, for simple uploads, just importing v2 is often enough if env var is present.
    // Let's ensure it's configured.
    const url = process.env.CLOUDINARY_URL;
    // No extra config needed if CLOUDINARY_URL is set correctly in env
} else {
    console.warn('CLOUDINARY_URL is not set in environment variables');
}

export const uploadToCloudinary = async (filePath: string): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'inventory_products',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};
