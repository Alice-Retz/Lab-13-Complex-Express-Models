import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should save a new species', () => {
    const newSpecies = {
      order_id: '2',
      animal_species: 'Sperm Whale',
      extinct: false,
    };
    return request(app)
      .post('/api/v1/species')
      .send(newSpecies)
      .then((res) => {
        expect(res.body).toEqual({
          id: '5',
          order_id: '2',
          animal_species: 'Sperm Whale',
          extinct: false,
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
