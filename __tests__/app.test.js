import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Species from '../lib/models/speciesModel.js';

describe('species routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should save a new species', () => {
    const newSpecies = {
      orderID: '2',
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

  it('should return a species by id', async () => {
    const species1 = {
      id: '1',
      orderID: '1',
      species: 'Thylacine',
      extinct: true,
    };

    return request(app)
      .get('/api/species/1')
      .then((res) => {
        expect(res.body).toEqual(species1);
      });
  });

  it('should save a new order', async () => {
    const newOrder = {
      order: 'Squamata',
    };
    return request(app)
      .post('/api/orders')
      .send(newOrder)
      .then((res) => {
        expect(res.body).toEqual({
          ...newOrder,
          id: '4',
        });
      });
  });

  it('should return all orders', async () => {
    return request(app)
      .get('/api/orders')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            order: 'Dasyuromorphia',
          },
          {
            id: '2',
            order: 'Artiodactyla',
          },
          {
            id: '3',
            order: 'Rodentia',
          },
        ]);
      });
  });

  it('should update an animal by id', async () => {
    const patchedSpecies = {
      id: '1',
      orderID: '1',
      species: 'Tasmanian Tiger',
      extinct: true,
    };

    return request(app)
      .patch('/api/species/1')
      .send(patchedSpecies)
      .then((res) => {
        expect(res.body).toEqual(patchedSpecies);
      });
  });

  it('should delete a species', async () => {
    const species2 = await Species.insert({
      order: '2',
      species: 'Sperm Whale',
      extinct: false,
    });
    return request(app)
      .delete(`/api/species/${species2.id}`)
      .then((res) => {
        expect(res.body).toEqual({});
      });
  });

  it('should return all species and their orders', async () => {
    return request(app)
      .get('/api/species')
      .then((res) => {
        expect(res.body).toEqual([
          {
            species: 'Thylacine',
            order: 'Dasyuromorphia',
            extinct: true,
          },
          {
            species: 'Numbat',
            order: 'Dasyuromorphia',
            extinct: false,
          },
          {
            species: 'Okapi',
            order: 'Artiodactyla',
            extinct: false,
          },
          {
            species: 'Jerboa',
            order: 'Rodentia',
            extinct: false,
          },
        ]);
      });
  });

  it('should get a count of animals by order', async () => {
    return request(app)
      .get('/api/species/count')
      .then((res) => {
        expect(res.body).toEqual([
          { order: 'Dasyuromorphia', species: '2' },
          { order: 'Artiodactyla', species: '1' },
          { order: 'Rodentia', species: '1' },
        ]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
