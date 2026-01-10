import express from 'express';
import { loginUser, getProfile, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('avatar'), updateProfile);

export default router;
