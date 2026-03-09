import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import orderRoutes from "./routes/orderRoutes";
import invoiceRoutes from "./routes/invoiceRoutes";
import supplierRoutes from "./routes/supplierRoutes";
import stockMovementRoutes from "./routes/stockMovementRoutes";
import reportRoutes from "./routes/reportRoutes";
import settingsRoutes from "./routes/settingsRoutes";

import { SpeedInsights } from "@vercel/speed-insights/next";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration: safe dynamic origin callback
const whitelist = [
  "http://localhost:3000",
  "https://sayan-digital-inventory-management.vercel.app",
  "https://server-steel-five-62.vercel.app",
  "https://sayandigitalstore-inventory.netlify.app",
  "https://inventory-sayandigital.netlify.app",
  "https://inventory-sayandigitalstore.netlify.app",
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
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    // Allow non-browser requests (no origin) like server-to-server or curl
    if (!origin) return callback(null, true);

    // Allow localhost variants (3000, 5173 etc.) to ease local development
    if (
      origin.startsWith("http://localhost") ||
      origin.startsWith("http://127.0.0.1")
    ) {
      return callback(null, true);
    }

    if (runtimeOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS middleware globally with the dynamic callback
app.use(cors(corsOptions));

// Ensure express can parse JSON bodies
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is not defined in the environment variables");
}

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URI as string, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB via serverless wrapper");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/settings", settingsRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Inventory Management System API");
});

// Health check endpoints (both /health and /api/health for compatibility)
app.get("/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler caught:", err);
  // Ensure CORS headers are present even on errors
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
});



// Only listen if not in a serverless environment (like Vercel)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("URI:", process.env.MONGODB_URI);
  });
}

export default app;
