import { Router } from 'express';
import Order from '../models/orderModel.js';

export default Router().post('/', async (req, res, next) => {
  try {
    const savedOrder = await Order.insert(req.body);
    res.send(savedOrder);
  } catch (error) {
    next(error);
  }
});
