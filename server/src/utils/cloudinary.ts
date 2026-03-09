import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import dotenv from 'dotenv';
import streamifier from 'streamifier';
import fs from 'fs';

// Explicitly load .env from server root if file exists
const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    // If .env doesn't exist, we assume variables are provided by the environment (e.g. Vercel)
    dotenv.config();
}

// Configure Cloudinary
// If CLOUDINARY_URL is present, the SDK automatically uses it.
// We only need manual config if using individual keys or if CLOUDINARY_URL needs manual parsing.

// Store credentials for explicit usage
let cloudName = process.env.CLOUDINARY_CLOUD_NAME;
let apiKey = process.env.CLOUDINARY_API_KEY;
let apiSecret = process.env.CLOUDINARY_API_SECRET;

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
} else if (process.env.CLOUDINARY_URL) {
    // Manually parse CLOUDINARY_URL to ensure it works even if SDK auto-detection fails
    try {
        const url = process.env.CLOUDINARY_URL as string;
        if (url.startsWith('cloudinary://')) {
            const [credentials, cName] = url.replace('cloudinary://', '').split('@');
            const [key, secret] = credentials.split(':');

            if (cName && key && secret) {
                // Assign to module-level variables
                cloudName = cName.trim();
                apiKey = key.trim();
                apiSecret = secret.trim();

                cloudinary.config({
                    cloud_name: cloudName,
                    api_key: apiKey,
                    api_secret: apiSecret
                });
            } else {
                console.error('Failed to parse CLOUDINARY_URL: Missing components.');
            }
        }
    } catch (error) {
        console.error('Error parsing CLOUDINARY_URL:', error);
    }
} else {
    console.warn('Cloudinary environment variables are missing (CLOUDINARY_URL or individual keys). Image upload will fail.');
}

// Accept either a file system path (string) or a Buffer (from multer memoryStorage)
export const uploadToCloudinary = async (file: string | Buffer): Promise<string> => {
    try {
        if (Buffer.isBuffer(file)) {
            return await new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'inventory_products' },
                    (error, result) => {
                        if (error) return reject(error);
                        if (!result || !result.secure_url) return reject(new Error('No result from Cloudinary'));
                        resolve(result.secure_url);
                    }
                );
                streamifier.createReadStream(file).pipe(uploadStream);
            });
        } else {
            const result = await cloudinary.uploader.upload(file, {
                folder: 'inventory_products',
                cloud_name: cloudName,
                api_key: apiKey,
                api_secret: apiSecret
            });
            return result.secure_url;
        }
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

/**
 * Deletes an image from Cloudinary based on its secure URL.
 * @param imageUrl The full secure URL of the image to delete.
 */
export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) return;

    try {
        // Extract public ID from the URL
        // Example URL: https://res.cloudinary.com/cloud_name/image/upload/v12345678/folder/public_id.jpg
        const splitUrl = imageUrl.split('/');
        const lastPart = splitUrl[splitUrl.length - 1]; // public_id.jpg
        const publicIdWithExtension = lastPart.split('.')[0]; // public_id
        
        // If there's a folder, we need to include it in the public_id
        // The structure after /upload/v.../ is usually folder/filename
        const uploadIndex = splitUrl.indexOf('upload');
        if (uploadIndex !== -1 && splitUrl.length > uploadIndex + 2) {
            // Version starts with 'v' and followed by numbers
            const versionIndex = splitUrl.findIndex((part, idx) => idx > uploadIndex && part.startsWith('v') && !isNaN(Number(part.substring(1))));
            
            if (versionIndex !== -1) {
                // publicId is everything after the version part excluding the extension
                const publicId = splitUrl.slice(versionIndex + 1, splitUrl.length - 1).join('/') + '/' + publicIdWithExtension;
                
                await cloudinary.uploader.destroy(publicId);
                console.log(`Successfully deleted image from Cloudinary: ${publicId}`);
            }
        }
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        // We don't throw here to avoid failing the main request if deletion fails
    }
};
