import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10, search, category, sort } = req.query;

        const query: any = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        const sortOptions: any = {};
        if (sort) {
            const [field, order] = (sort as string).split(':');
            sortOptions[field] = order === 'desc' ? -1 : 1;
        } else {
            sortOptions.createdAt = -1;
        }

        const products = await Product.find(query)
            .sort(sortOptions)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Product.countDocuments(query);

        res.status(200).json({
            products,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

import { uploadToCloudinary } from '../utils/cloudinary';
import fs from 'fs';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, category, buyingPrice, sellingPrice, inStock } = req.body;
        let imageUrl = '';

        console.log('Request Body:', req.body);
        const file = (req as any).file;
        console.log('Request File:', file);

        if (file) {
            try {
                console.log('Uploading file to Cloudinary...');
                // Use buffer if available (memoryStorage), otherwise use path
                if (file.buffer) {
                    imageUrl = await uploadToCloudinary(file.buffer);
                } else if (file.path) {
                    imageUrl = await uploadToCloudinary(file.path);
                }
                console.log('Cloudinary Upload Success. URL:', imageUrl);
                // Clean up local file after upload only if path-based
                if (file.path && fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                // Continue without image or handle error as needed
            }
        } else {
            console.log('No file received in request.');
        }

        const newProduct = new Product({
            name,
            description,
            category,
            buyingPrice: parseFloat(buyingPrice) || 0,
            sellingPrice: parseFloat(sellingPrice) || 0,
            quantity: parseInt(req.body.quantity) || 0,
            inStock: inStock === 'true' || parseInt(req.body.quantity) > 0,
            imageUrl
        });
        await newProduct.save();
        console.log('Product saved with Image URL:', newProduct.imageUrl);
        res.status(201).json(newProduct);
    } catch (error) {
        // Clean up file if it exists and error occurred before upload completion
        const file = (req as any).file;
        if (file && file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        console.error('Error in createProduct:', error);
        res.status(500).json({ message: 'Error creating product', error: (error as any).message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, category, buyingPrice, sellingPrice, inStock } = req.body;

        const updateData: any = {
            name,
            description,
            category,
            buyingPrice: parseFloat(buyingPrice) || 0,
            sellingPrice: parseFloat(sellingPrice) || 0,
            quantity: parseInt(req.body.quantity) || 0,
            inStock: inStock === 'true' || parseInt(req.body.quantity) > 0,
        };

        const file = (req as any).file;
        if (file) {
            try {
                // Use buffer if available (memoryStorage), otherwise use path
                let imageUrl = '';
                if (file.buffer) {
                    imageUrl = await uploadToCloudinary(file.buffer);
                } else if (file.path) {
                    imageUrl = await uploadToCloudinary(file.path);
                }
                updateData.imageUrl = imageUrl;
                // Clean up local file after upload only if path-based
                if (file.path && fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                // Continue without image or handle error as needed
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        // Clean up file if it exists and error occurred before upload completion
        const file = (req as any).file;
        if (file && file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }
        res.status(500).json({ message: 'Error updating product', error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
