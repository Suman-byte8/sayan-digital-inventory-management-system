import express from 'express';
import { loginUser, getProfile, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';

const router = express.Router();
// Use memory storage to avoid writing files to disk in serverless environments
const upload = multer({ storage: multer.memoryStorage() });

router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('avatar'), updateProfile);

export default router;
