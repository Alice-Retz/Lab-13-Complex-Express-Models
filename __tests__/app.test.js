import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('species routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should save a new species', () => {
    const newSpecies = {
      order: '2',
      species: 'Sperm Whale',
      extinct: false,
    };
    return request(app)
      .post('/api/species')
      .send(newSpecies)
      .then((res) => {
        expect(res.body).toEqual({
          ...newSpecies,
          id: '5',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
