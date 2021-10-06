import pool from '../utils/pool.js';

export default class Species {
  id;
  order_id;
  animal_species;
  extinct;

  constructor(row) {
    this.id = row.id;
    this.order = row.order_id;
    this.species = row.animal_species;
    this.extinct = row.extinct;
  }

  static async insert({ order, species, extinct }) {
    const { rows } = await pool.query(
      'INSERT INTO species (order_id, animal_species, extinct) VALUES ($1, $2, $3) RETURNING *',
      [order, species, extinct]
    );

    return new Species(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM species WHERE id = $1', [
      id,
    ]);
    return new Species(rows[0]);
  }

  static async updateSpecies(id, { order, species, extinct }) {
    const { rows } = await pool.query(
      `UPDATE  species
      SET order_id = $2, animal_species = $3, extinct = $4
      WHERE id = $1 RETURNING *`,
      [id, order, species, extinct]
    );
    return new Species(rows[0]);
  }
}
