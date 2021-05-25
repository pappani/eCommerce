// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import express from 'express';
const router = express.Router();
import { newOrder, getOrderById, payOrder, getMyOrders, getOrders, deliverOrder } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, newOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').get(protect, payOrder);
router.route('/:id/deliver').get(protect, deliverOrder);

export default router;