import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
import orderRoutes from './routes/orderRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import supplierRoutes from './routes/supplierRoutes';
import stockMovementRoutes from './routes/stockMovementRoutes';
import reportRoutes from './routes/reportRoutes';
import settingsRoutes from './routes/settingsRoutes';

import { SpeedInsights } from "@vercel/speed-insights/next"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration: safe dynamic origin callback
const whitelist = [
    'http://localhost:3000',
    'https://sayan-digital-inventory-management.vercel.app',
    'https://server-steel-five-62.vercel.app'
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow non-browser requests (e.g. server-to-server) with no origin
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Apply CORS middleware globally with the dynamic callback
app.use(cors(corsOptions));
// Ensure express can parse JSON bodies
app.use(express.json());

// Global preflight handling is provided by the CORS middleware above.
// We removed app.options('*', ...) because using '*' caused a path-to-regexp error in this Express/router version.

// Route-specific CORS for /api/settings (if settings API needs to accept credentials from localhost only)
// This ensures strict control over which origin can include credentials to this endpoint.
app.use('/api/settings', settingsRoutes);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/stock-movements', stockMovementRoutes);
app.use('/api/reports', reportRoutes);
// Note: /api/settings is mounted above with route-specific CORS

// Basic route
app.get('/', (req, res) => {
    res.send('Inventory Management System API');
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not defined in the environment variables');
} else {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

// Only listen if not in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
