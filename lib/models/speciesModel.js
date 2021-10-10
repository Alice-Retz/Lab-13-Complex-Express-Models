import pool from '../utils/pool.js';
import Order from './orderModel.js';

export default class Species {
  id;
  orderID;
  species;
  extinct;

  constructor(row) {
    this.id = row.id;
    this.orderID = row.order_id;
    this.species = row.animal_species;
    this.extinct = row.extinct;
  }

  static async insert({ orderID, species, extinct }) {
    const { rows } = await pool.query(
      'INSERT INTO species (order_id, animal_species, extinct) VALUES ($1, $2, $3) RETURNING *',
      [orderID, species, extinct]
    );

    return new Species(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM species WHERE id = $1', [
      id,
    ]);
    return new Species(rows[0]);
  }

  static async updateSpecies(id, { orderID, species, extinct }) {
    const { rows } = await pool.query(
      `UPDATE  species
      SET order_id = $2, animal_species = $3, extinct = $4
      WHERE id = $1 RETURNING *`,
      [id, orderID, species, extinct]
    );
    return new Species(rows[0]);
  }

  static async deleteSpecies(id) {
    const { rows } = await pool.query(
      'DELETE FROM species WHERE id = $1 RETURNING *',
      [id]
    );
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT animal_species AS species, 
      extinct, 
      order_name AS order
      FROM species
      JOIN orders
      ON species.order_id = orders.id `
    );
    return rows;
  }
}
