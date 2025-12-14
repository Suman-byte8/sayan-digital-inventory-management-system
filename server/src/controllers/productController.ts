import { Request, Response } from 'express';
import Product from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
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
        const { name, price, inStock, buyingPrice, sellingPrice } = req.body;
        let imageUrl = '';

        const files = (req as any).file;
        if (files) {
            try {
                imageUrl = await uploadToCloudinary(files.path);
                // Clean up local file after upload
                fs.unlinkSync(files.path);
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                // Continue without image or handle error as needed
            }
        }

        const newProduct = new Product({
            name,
            price,
            inStock,
            buyingPrice,
            sellingPrice,
            imageUrl
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        // Clean up file if it exists and error occurred before upload completion
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: 'Error creating product', error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
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
