import { Request, Response } from 'express';
import Settings from '../models/Settings';
import { uploadToCloudinary } from '../utils/cloudinary';
import fs from 'fs';

export const getSettings = async (req: Request, res: Response) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error });
    }
};

export const updateSettings = async (req: Request, res: Response) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
        }

        const { shopName, taxId, address, email, phone, currency, timezone } = req.body;

        settings.shopName = shopName || settings.shopName;
        settings.taxId = taxId !== undefined ? taxId : settings.taxId;
        settings.address = address !== undefined ? address : settings.address;
        settings.email = email !== undefined ? email : settings.email;
        settings.phone = phone !== undefined ? phone : settings.phone;
        settings.currency = currency || settings.currency;
        settings.timezone = timezone || settings.timezone;

        const file = req.file;
        if (file) {
            try {
                const imageUrl = await uploadToCloudinary(file.path);
                settings.logoUrl = imageUrl;
                // Clean up local file after upload
                fs.unlinkSync(file.path);
            } catch (uploadError) {
                console.error('Error uploading logo:', uploadError);
            }
        } else if (req.body.logoUrl === '') {
            // Explicitly remove logo if logoUrl is set to empty string
            settings.logoUrl = '';
        }

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        // Clean up file if it exists and error occurred
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error updating settings', error });
    }
};
