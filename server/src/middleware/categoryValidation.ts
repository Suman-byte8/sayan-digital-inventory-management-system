import { Request, Response, NextFunction } from 'express';

// Validation middleware for category creation
export const validateCategoryCreate = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    // Check required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: 'Category name is required and must be a non-empty string'
        });
    }

    // Sanitize name
    req.body.name = name.trim();

    // Validate description if provided
    if (req.body.description) {
        if (typeof req.body.description !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Description must be a string'
            });
        }
        req.body.description = req.body.description.trim();
    }

    next();
};

// Validation middleware for category update
export const validateCategoryUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, isActive } = req.body;

    // Validate name if provided
    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Category name must be a non-empty string'
            });
        }
        req.body.name = name.trim();
    }

    // Validate description if provided
    if (description !== undefined) {
        if (typeof description !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Description must be a string'
            });
        }
        req.body.description = description.trim();
    }

    // Validate isActive if provided
    if (isActive !== undefined && typeof isActive !== 'boolean') {
        return res.status(400).json({
            success: false,
            error: 'isActive must be a boolean'
        });
    }

    next();
};
