import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';

// Validation middleware for product creation
export const validateProductCreate = async (req: Request, res: Response, next: NextFunction) => {
    const { name, sku, category, unit } = req.body;
    let { price, cost, stockQuantity } = req.body;

    // Check required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Product name is required and must be a non-empty string'
        });
    }

    if (!sku || typeof sku !== 'string' || sku.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'SKU is required and must be a non-empty string'
        });
    }

    if (!category || typeof category !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Category is required'
        });
    }

    // Validate category exists
    try {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                error: 'Invalid category ID'
            });
        }
        if (!categoryExists.isActive) {
            return res.status(400).json({
                success: false,
                error: 'Selected category is not active'
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'Invalid category ID format'
        });
    }

    // Convert and validate price
    if (price === undefined || price === null || price === '') {
        return res.status(400).json({
            success: false,
            error: 'Price is required'
        });
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({
            success: false,
            error: 'Price must be a non-negative number'
        });
    }
    req.body.price = parsedPrice;

    // Convert and validate cost if provided
    if (cost !== undefined && cost !== null && cost !== '') {
        const parsedCost = parseFloat(cost);
        if (isNaN(parsedCost) || parsedCost < 0) {
            return res.status(400).json({
                success: false,
                error: 'Cost must be a non-negative number'
            });
        }
        req.body.cost = parsedCost;
    }

    // Convert and validate stockQuantity
    if (stockQuantity === undefined || stockQuantity === null || stockQuantity === '') {
        return res.status(400).json({
            success: false,
            error: 'Stock quantity is required'
        });
    }
    const parsedStock = parseInt(stockQuantity, 10);
    if (isNaN(parsedStock) || parsedStock < 0) {
        return res.status(400).json({
            success: false,
            error: 'Stock quantity must be a non-negative integer'
        });
    }
    req.body.stockQuantity = parsedStock;

    // Validate unit
    const validUnits = ['pcs', 'kg', 'liter', 'meter', 'box', 'pack'];
    if (unit && !validUnits.includes(unit)) {
        return res.status(400).json({
            success: false,
            error: `Unit must be one of: ${validUnits.join(', ')}`
        });
    }

    // Sanitize string fields
    req.body.name = name.trim();
    req.body.sku = sku.trim().toUpperCase();
    if (req.body.description) {
        req.body.description = req.body.description.trim();
    }

    next();
};

// Validation middleware for product update
export const validateProductUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { name, sku, category, unit } = req.body;
    let { price, cost, stockQuantity } = req.body;

    // Validate name if provided
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Product name must be a non-empty string'
            });
        }
        req.body.name = name.trim();
    }

    // Validate SKU if provided
    if (sku !== undefined) {
        if (typeof sku !== 'string' || sku.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'SKU must be a non-empty string'
            });
        }
        req.body.sku = sku.trim().toUpperCase();
    }

    // Validate category if provided
    if (category !== undefined) {
        if (typeof category !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Category must be a valid ID'
            });
        }
        try {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid category ID'
                });
            }
            if (!categoryExists.isActive) {
                return res.status(400).json({
                    success: false,
                    error: 'Selected category is not active'
                });
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: 'Invalid category ID format'
            });
        }
    }

    // Validate price if provided
    if (price !== undefined && price !== null && price !== '') {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice < 0) {
            return res.status(400).json({
                success: false,
                error: 'Price must be a non-negative number'
            });
        }
        req.body.price = parsedPrice;
    }

    // Validate cost if provided
    if (cost !== undefined && cost !== null && cost !== '') {
        const parsedCost = parseFloat(cost);
        if (isNaN(parsedCost) || parsedCost < 0) {
            return res.status(400).json({
                success: false,
                error: 'Cost must be a non-negative number'
            });
        }
        req.body.cost = parsedCost;
    }

    // Validate stockQuantity if provided
    if (stockQuantity !== undefined && stockQuantity !== null && stockQuantity !== '') {
        const parsedStock = parseInt(stockQuantity, 10);
        if (isNaN(parsedStock) || parsedStock < 0) {
            return res.status(400).json({
                success: false,
                error: 'Stock quantity must be a non-negative integer'
            });
        }
        req.body.stockQuantity = parsedStock;
    }

    // Validate unit if provided
    const validUnits = ['pcs', 'kg', 'liter', 'meter', 'box', 'pack'];
    if (unit !== undefined && !validUnits.includes(unit)) {
        return res.status(400).json({
            success: false,
            error: `Unit must be one of: ${validUnits.join(', ')}`
        });
    }

    // Sanitize description if provided
    if (req.body.description !== undefined) {
        req.body.description = req.body.description.trim();
    }

    next();
};
