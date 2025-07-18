import express from 'express';
import { createOrder, getInvoice } from '../controllers/orderController.js';

const router = express.Router();
router.post('/', createOrder);
router.get('/:id/invoice', getInvoice);

export default router;
