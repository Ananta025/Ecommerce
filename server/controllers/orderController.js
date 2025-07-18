import Order from '../models/Order.js';
import generateInvoice from '../utils/generateInvoice.js';

export const createOrder = async (req, res) => {
  try {
    const { customerName, email, address, items } = req.body;
    const order = new Order({ customerName, email, address, items });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    const pdfBuffer = await generateInvoice(order, type);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${id}.pdf`,
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating invoice:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
