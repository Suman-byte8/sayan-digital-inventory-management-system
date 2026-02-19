import { Router } from 'express';
import cors from 'cors';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { protect } from '../middleware/authMiddleware';
import multer from 'multer';

const router = Router();
// Use memory storage to avoid writing files to disk in serverless environments
const upload = multer({ storage: multer.memoryStorage() });

// Route-specific CORS for settings and preflight handling (applied before auth)
// Allow localhost dev origins and the client origin set via NEXT_PUBLIC_API_URL
const settingsCors = cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);
        if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) return callback(null, true);
        if (process.env.NEXT_PUBLIC_API_URL) {
            try {
                const clientUrl = new URL(process.env.NEXT_PUBLIC_API_URL);
                if (origin === clientUrl.origin) return callback(null, true);
            } catch (e) {
                // ignore invalid URL
            }
        }
        // allow Netlify frontend explicitly as a fallback
        if (origin === 'https://sayandigitalstore-inventory.netlify.app') return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS']
});

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
