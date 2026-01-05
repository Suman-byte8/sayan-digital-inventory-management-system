import express from 'express';
import { getDashboardStats, getSalesReport, getInventoryReport } from '../controllers/reportController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);
router.get('/sales', protect, getSalesReport);
router.get('/inventory', protect, getInventoryReport);

export default router;
