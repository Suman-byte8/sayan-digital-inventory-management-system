import express from 'express';
import { getInvoices, createInvoice, updateInvoice, deleteInvoice } from '../controllers/invoiceController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(protect, getInvoices)
    .post(protect, createInvoice);

router.route('/:id')
    .put(protect, updateInvoice)
    .delete(protect, deleteInvoice);

export default router;
