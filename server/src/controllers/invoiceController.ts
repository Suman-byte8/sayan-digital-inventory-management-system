import { Request, Response } from 'express';
import Invoice from '../models/Invoice';

export const getInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find().populate('order');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invoices', error });
    }
};

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const { order, amount, dueDate } = req.body;
        const invoice = new Invoice({ order, amount, dueDate });
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Error creating invoice', error });
    }
};

export const updateInvoice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndUpdate(id, req.body, { new: true });
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Error updating invoice', error });
    }
};

export const deleteInvoice = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndDelete(id);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting invoice', error });
    }
};
