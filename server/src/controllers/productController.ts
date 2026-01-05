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
        const files = (req as any).file;
        console.log('Request File:', files);

        if (files) {
            try {
                console.log('Uploading file to Cloudinary...');
                imageUrl = await uploadToCloudinary(files.path);
                console.log('Cloudinary Upload Success. URL:', imageUrl);
                // Clean up local file after upload
                fs.unlinkSync(files.path);
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
            inStock: inStock === 'true',
            imageUrl
        });
        await newProduct.save();
        console.log('Product saved with Image URL:', newProduct.imageUrl);
        res.status(201).json(newProduct);
    } catch (error) {
        // Clean up file if it exists and error occurred before upload completion
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
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
            inStock: inStock === 'true',
        };

        const files = (req as any).file;
        if (files) {
            try {
                const imageUrl = await uploadToCloudinary(files.path);
                updateData.imageUrl = imageUrl;
                // Clean up local file after upload
                fs.unlinkSync(files.path);
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
        if ((req as any).file && fs.existsSync((req as any).file.path)) {
            fs.unlinkSync((req as any).file.path);
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
