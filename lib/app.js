import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import speciesController from './controllers/speciesController.js';
import orderController from './controllers/orderController.js';

const app = express();

app.use(express.json());

app.use('/api/species', speciesController);
app.use('/api/orders', orderController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
