import express from 'express';
import { createOrder, getInvoice } from '../controllers/orderController.js';

const router = express.Router();
router.post('/', createOrder);
router.get('/api/:id/invoice', getInvoice);

export default router;
