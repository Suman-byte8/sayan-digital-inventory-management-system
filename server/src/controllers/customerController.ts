import { Request, Response } from 'express';
import Customer from '../models/Customer';

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error });
    }
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        // Fetch orders for this customer
        const Order = (await import('../models/Order')).default;
        const orders = await Order.find({ customer: id }).sort({ orderDate: -1 });

        res.json({ customer, orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer', error });
    }
};

export const createCustomer = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, address, company, status } = req.body;

        // Check if customer with same phone already exists
        if (phone) {
            const existingPhone = await Customer.findOne({ phone });
            if (existingPhone) {
                return res.status(400).json({ message: 'Mobile number already exists' });
            }
        }

        // Check if customer with same email already exists
        if (email) {
            const existingEmail = await Customer.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email address already exists' });
            }
        }

        const customer = new Customer({ name, email, phone, address, company, status });
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);

        // Handle Mongoose validation errors
        if (errorMsg.includes('validation failed') || errorMsg.includes('is required')) {
            return res.status(400).json({ message: 'Validation Error', error: errorMsg });
        }

        // Handle Mongoose duplicate key error (E11000)
        if (errorMsg.includes('E11000')) {
            return res.status(400).json({ message: 'Duplicate field error: A customer with this information already exists.' });
        }

        res.status(500).json({ message: 'Error creating customer', error: errorMsg });
    }
};

export const searchCustomerByPhone = async (req: Request, res: Response) => {
    try {
        const { phone } = req.query;
        if (!phone) return res.status(400).json({ message: 'Phone number or name is required' });

        const searchStr = phone as string;
        let customers = [];

        // Normalize search string: remove +91 prefix if present for searching
        const normalizedSearch = searchStr.replace(/^\+91/, '').trim();

        // 1. Try exact phone match (with and without +91)
        customers = await Customer.find({
            $or: [
                { phone: searchStr },
                { phone: normalizedSearch },
                { phone: `+91${normalizedSearch}` }
            ]
        });

        // 2. Try regex phone match (ignore non-numeric characters)
        if (customers.length === 0) {
            const numericPhone = normalizedSearch.replace(/\D/g, '');
            if (numericPhone.length > 0) {
                // Create a regex that matches the digits in order with anything in between
                const phoneRegex = new RegExp(numericPhone.split('').join('.*'));
                customers = await Customer.find({ phone: { $regex: phoneRegex } });
            }
        }

        // 3. Try name match as fallback
        if (customers.length === 0) {
            customers = await Customer.find({ name: { $regex: new RegExp(searchStr, 'i') } });
        }

        // Return empty array instead of 404 to avoid frontend errors
        res.json(customers);
    } catch (error) {
        console.error('Error in searchCustomerByPhone:', error);
        res.status(500).json({ message: 'Error searching customer', error });
    }
};

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByIdAndUpdate(id, req.body, { new: true });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error });
    }
};

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
};
