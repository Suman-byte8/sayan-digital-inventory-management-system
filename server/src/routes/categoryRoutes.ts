import express from 'express';
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController';
import {
    validateCategoryCreate,
    validateCategoryUpdate
} from '../middleware/categoryValidation';

const router = express.Router();

// POST /api/categories - Create new category
router.post('/', validateCategoryCreate, createCategory);

// GET /api/categories - Get all categories
router.get('/', getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', getCategoryById);

// PUT /api/categories/:id - Update category
router.put('/:id', validateCategoryUpdate, updateCategory);

// DELETE /api/categories/:id - Soft delete category
router.delete('/:id', deleteCategory);

export default router;
