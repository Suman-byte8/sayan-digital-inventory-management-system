import { Request, Response } from 'express';
import Order from '../models/Order';
import Customer from '../models/Customer';
import Product from '../models/Product';

export const getOrders = async (req: Request, res: Response) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            status,
            paymentStatus,
            startDate,
            endDate
        } = req.query;

        const query: any = {};

        // Filtering by status
        if (status && status !== 'All') {
            query.status = status;
        }

        // Filtering by paymentStatus
        if (paymentStatus && paymentStatus !== 'All') {
            query.paymentStatus = paymentStatus;
        }

        // Filtering by date range
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate as string);
            if (endDate) query.createdAt.$lte = new Date(endDate as string);
        }

        // Searching by Customer Name or Order ID
        if (search) {
            const customers = await Customer.find({
                name: { $regex: search as string, $options: 'i' }
            }).select('_id');
            const customerIds = customers.map(c => c._id);

            query.$or = [
                { customer: { $in: customerIds } }
            ];

            // If search looks like a MongoDB ID, add it to $or
            if ((search as string).match(/^[0-9a-fA-F]{24}$/)) {
                query.$or.push({ _id: search });
            }
        }

        const skip = (Number(page) - 1) * Number(limit);

        const orders = await Order.find(query)
            .populate('customer')
            .populate('products.product')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const total = await Order.countDocuments(query);

        res.json({
            orders,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        console.log('Incoming Order Request:', JSON.stringify(req.body, null, 2));
        const { customer, products, totalAmount, status, paymentStatus, notes } = req.body;

        if (!customer || !products || products.length === 0) {
            return res.status(400).json({ message: 'Customer and products are required' });
        }

        // Deduct stock for each product (only if it has a product ID)
        for (const item of products) {
            if (item.product) {
                const product = await Product.findById(item.product);
                if (product) {
                    if (product.quantity < item.quantity) {
                        return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
                    }
                    product.quantity -= item.quantity;
                    await product.save();
                }
            }
        }

        const order = new Order({
            customer,
            products,
            totalAmount,
            status: status || 'pending',
            paymentStatus: paymentStatus || 'unpaid',
            notes
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error('Order Creation Error:', errorMsg);

        // Handle Mongoose validation errors
        if (errorMsg.includes('validation failed') || errorMsg.includes('Cast to ObjectId failed')) {
            return res.status(400).json({ message: 'Validation Error', error: errorMsg });
        }

        res.status(500).json({ message: 'Error creating order', error: errorMsg });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};
