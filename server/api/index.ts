import app from '../src/index';
import { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Wrap the Express app to handle requests on Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers
    const allowedOrigins = [
        'https://delightful-platypus-0aa7aa.netlify.app',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://sayan-digital-inventory-management.vercel.app',
        'https://sayandigitalstore-inventory.netlify.app'
    ];

    const origin = req.headers.origin as string;
    
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        return await app(req, res);
    } catch (error) {
        console.error('Handler error:', error);
        res.status(500).json({ 
            error: 'Internal server error', 
            details: (error as any).message,
            timestamp: new Date().toISOString()
        });
    }
}
