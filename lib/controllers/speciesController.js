import { Router } from 'express';
import Species from '../models/speciesModel.js';

export default Router().post('/', async (req, res, next) => {
  try {
    console.log('!!', req.body);
    const savedSpecies = await Species.insert(req.body);
    res.send(savedSpecies);
  } catch (error) {
    next(error);
  }
});
