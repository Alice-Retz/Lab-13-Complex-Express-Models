import { Router } from 'express';
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

  .get('/', async (req, res, next) => {
    try {
      const savedSpecies = await Species.getAll();
      res.send(savedSpecies);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/alive', async (req, res, next) => {
    try {
      const getAllAlive = await Species.getAllAlive();
      res.send(getAllAlive);
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
  })


  .patch('/:id', async (req, res, next) => {
    try {
      const patchSpecies = await Species.updateSpecies(req.params.id, req.body);
      res.send(patchSpecies);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const speciesDeleted = await Species.deleteSpecies(id);
      res.send(speciesDeleted);
    } catch (error) {
      next(error);
    }
  });
