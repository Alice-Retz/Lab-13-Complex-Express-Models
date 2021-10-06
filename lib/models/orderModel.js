import pool from '../utils/pool';

export default class Order {
  id;
  order_name;

  constructor(row) {
    this.id = row.id;
    this.order = row.order_name;
  }

  static async insert({ order }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (order_name) VALUES ($1) RETURNING *',
      [order]
    );

    return new Order(rows[0]);
  }

  static async getAllOrders() {
    const { rows } = await pool.query('SELECT * FROM orders');
    return rows.map((row) => new Order(row));
  }
}
