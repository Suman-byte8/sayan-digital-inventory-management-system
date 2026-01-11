import { Router } from 'express';
import cors from 'cors';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Route-specific CORS for settings and preflight handling (applied before auth)
const settingsCors = cors({ origin: 'http://localhost:3000', credentials: true, methods: ['GET', 'POST', 'PUT', 'OPTIONS'] });

// Handle preflight OPTIONS requests for this route before authentication
router.options('/', settingsCors, (_req, res) => res.sendStatus(204));

// Simple request logger for settings route to confirm hits on deployed environment
router.use((req, _res, next) => {
    console.log(`[settingsRoutes] ${new Date().toISOString()} ${req.method} ${req.originalUrl} origin=${req.headers.origin || 'none'} auth=${req.headers.authorization ? 'present' : 'none'}`);
    next();
});

router.get('/', settingsCors, protect, getSettings);
router.put('/', settingsCors, protect, upload.single('logo'), updateSettings);

export default router;
