import express from 'express';
import { getStockMovements, createStockMovement } from '../controllers/stockMovementController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getStockMovements);
router.post('/', protect, createStockMovement);

export default router;
