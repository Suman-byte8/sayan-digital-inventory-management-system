import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import dotenv from 'dotenv';
import streamifier from 'streamifier';

// Explicitly load .env from server root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Configure Cloudinary
// If CLOUDINARY_URL is present, the SDK automatically uses it.
// We only need manual config if using individual keys.

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
        const url = process.env.CLOUDINARY_URL;
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
