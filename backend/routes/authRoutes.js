import express from 'express';
import { registerUser, loginUser, updateProfile, updatePassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);

export default router;