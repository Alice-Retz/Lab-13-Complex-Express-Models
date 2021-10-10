import { Router } from 'express';
import Order from '../models/orderModel.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const savedOrder = await Order.insert(req.body);
      res.send(savedOrder);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const savedOrders = await Order.getAllOrders();
      res.send(savedOrders);
    } catch (error) {
      next(error);
    }
  })

  .get('/count', async (req, res, next) => {
    try {
      const savedOrderData = await Order.getCount();
      res.send(savedOrderData);
    } catch (error) {
      next(error);
    }
  });
