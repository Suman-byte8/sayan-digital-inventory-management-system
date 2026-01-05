import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import StockMovement from '../models/StockMovement';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const pendingOrders = await Order.countDocuments({ status: 'Pending' });

        const lowStockProducts = await Product.countDocuments({ quantity: { $lte: 10 } }); // Assuming 10 is low stock threshold

        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            totalRevenue: totalRevenue[0]?.total || 0,
            pendingOrders,
            lowStockProducts,
            totalProducts
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
};

export const getSalesReport = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;

        const query: any = {};
        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
        }

        const sales = await Order.find(query).populate('customer', 'name');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales report', error });
    }
};

export const getInventoryReport = async (req: Request, res: Response) => {
    try {
        const inventory = await Product.find().select('name category quantity buyingPrice sellingPrice inStock');
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory report', error });
    }
};
