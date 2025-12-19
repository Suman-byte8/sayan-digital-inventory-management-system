import { Request, Response } from 'express';
import Category from '../models/Category';

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                error: 'A category with this name already exists'
            });
        }

        // Create new category
        const category = new Category({
            name,
            description
        });

        await category.save();

        res.status(201).json({
            success: true,
            data: category
        });
    } catch (error: any) {
        console.error('Error creating category:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create category'
        });
    }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const { includeInactive } = req.query;

        const filter = includeInactive === 'true' ? {} : { isActive: true };

        const categories = await Category.find(filter)
            .sort({ name: 1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error: any) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch categories'
        });
    }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id).select('-__v');

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error: any) {
        console.error('Error fetching category:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to fetch category'
        });
    }
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, isActive } = req.body;

        // Check if new name conflicts with existing category
        if (name) {
            const existingCategory = await Category.findOne({
                _id: { $ne: id },
                name: { $regex: new RegExp(`^${name}$`, 'i') }
            });

            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    error: 'A category with this name already exists'
                });
            }
        }

        const category = await Category.findByIdAndUpdate(
            id,
            { name, description, isActive },
            { new: true, runValidators: true }
        ).select('-__v');

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error: any) {
        console.error('Error updating category:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to update category'
        });
    }
};

// Delete category (soft delete)
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        ).select('-__v');

        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            data: category
        });
    } catch (error: any) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to delete category'
        });
    }
};
