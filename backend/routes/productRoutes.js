// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import express from 'express';
const router = express.Router();
import { deleteProduct, getProductById, getProducts, createProduct, updateProduct, createReview } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createReview);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

export default router