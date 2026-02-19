import { Request, Response } from 'express';
import StockMovement from '../models/StockMovement';
import Product from '../models/Product';

export const getStockMovements = async (req: Request, res: Response) => {
    try {
        const movements = await StockMovement.find().populate('product', 'name');
        res.status(200).json(movements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock movements', error });
    }
};

export const createStockMovement = async (req: Request, res: Response) => {
    try {
        const { product, type, quantity, reason, reference } = req.body;

        // Update product stock
        const productItem = await Product.findById(product);
        if (!productItem) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (type === 'IN') {
            productItem.quantity += quantity;
        } else if (type === 'OUT') {
            if (productItem.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }
            productItem.quantity -= quantity;
        }

        productItem.inStock = productItem.quantity > 0;
        await productItem.save();

        const newMovement = new StockMovement({
            product,
            type,
            quantity,
            reason,
            reference
        });

        await newMovement.save();
        res.status(201).json(newMovement);
    } catch (error) {
        res.status(500).json({ message: 'Error creating stock movement', error });
    }
};
