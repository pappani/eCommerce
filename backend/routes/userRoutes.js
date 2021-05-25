// Pappani Federico - UniPR 298223
// Progetto eCommerce per corso Tecnologie Internet

import express from 'express';
const router = express.Router();
import { authUser, getUser, registerUser, updateUser, getAllUsers, deleteUser, getUserById, updateAnyUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getAllUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUser)
                        .put(protect,updateUser);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateAnyUser);

export default router;