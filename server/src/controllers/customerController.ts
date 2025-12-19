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
        const customer = new Customer({ name, email, phone, address, company, status });
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer', error });
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
