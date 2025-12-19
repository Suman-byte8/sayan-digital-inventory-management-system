import express from 'express';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomerById } from '../controllers/customerController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(protect, getCustomers)
    .post(protect, createCustomer);

router.route('/:id')
    .get(protect, getCustomerById)
    .put(protect, updateCustomer)
    .delete(protect, deleteCustomer);

export default router;
