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
    'https://server-steel-five-62.vercel.app',
    'https://sayandigitalstore-inventory.netlify.app',
    'https://inventory-client-sayan-v1.netlify.app'
];

// Add runtime-detected client origin (if NEXT_PUBLIC_API_URL is set) so deployments don't require code changes
const runtimeOrigins = new Set<string>(whitelist);
if (process.env.NEXT_PUBLIC_API_URL) {
    try {
        const clientUrl = new URL(process.env.NEXT_PUBLIC_API_URL);
        runtimeOrigins.add(clientUrl.origin);
    } catch (e) {
        // ignore invalid URL
    }
}

// Add CLIENT_URL from environment if set
if (process.env.CLIENT_URL) {
    runtimeOrigins.add(process.env.CLIENT_URL);
}

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow non-browser requests (no origin) like server-to-server or curl
        if (!origin) return callback(null, true);

        // Allow localhost variants (3000, 5173 etc.) to ease local development
        if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
            return callback(null, true);
        }

        if (runtimeOrigins.has(origin)) {
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
app.use('/api/settings', settingsRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Inventory Management System API');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// 404 handler - must be last
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    const mongooseConnected = require('mongoose').connection.readyState === 1;
    console.log('Health check called - Mongoose state:', require('mongoose').connection.readyState);
    res.status(200).json({
        status: 'ok',
        mongooseConnected: mongooseConnected,
        mongooseState: require('mongoose').connection.readyState,
        timestamp: new Date().toISOString(),
        nodeEnv: process.env.NODE_ENV,
        dbUri: process.env.MONGODB_URI ? 'configured' : 'NOT CONFIGURED',
        message: 'Server is running with environment variables loaded'
    });
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
