import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const router = Router();

import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', upload.single('image'), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
