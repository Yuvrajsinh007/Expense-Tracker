import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all expense routes
router.use(protect);

router.post('/', addExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;