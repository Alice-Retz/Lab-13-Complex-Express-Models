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
    console.log('!!!!!', species);
    const { rows } = await pool.query(
      'INSERT INTO species (order_id, animal_species, extinct) VALUES ($1, $2, $3) RETURNING *',
      [order, species, extinct]
    );

    return new Species(rows[0]);
  }
}
