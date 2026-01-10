import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            if (!user.isAdmin) {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar,
                role: user.role,
                token: generateToken((user._id as unknown) as string),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password (DEBUG)' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getProfile = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

import { uploadToCloudinary } from '../utils/cloudinary';
import fs from 'fs';

export const updateProfile = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.address = req.body.address || user.address;
            user.role = req.body.role || user.role;

            const file = req.file;
            if (file) {
                try {
                    const imageUrl = await uploadToCloudinary(file.path);
                    user.avatar = imageUrl;
                    // Clean up local file after upload
                    fs.unlinkSync(file.path);
                } catch (uploadError) {
                    console.error('Error uploading avatar:', uploadError);
                }
            } else {
                user.avatar = req.body.avatar || user.avatar;
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                phone: updatedUser.phone,
                address: updatedUser.address,
                avatar: updatedUser.avatar,
                role: updatedUser.role,
                token: generateToken((updatedUser._id as unknown) as string),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Clean up file if it exists and error occurred
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Server error', error });
    }
};
