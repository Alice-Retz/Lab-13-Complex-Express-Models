import { Router } from 'express';
import app from '../app.js';
import Species from '../models/speciesModel.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const savedSpecies = await Species.insert(req.body);
      res.send(savedSpecies);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const speciesID = await Species.getById(id);
      res.send(speciesID);
    } catch (error) {
      next(error);
    }
  });
