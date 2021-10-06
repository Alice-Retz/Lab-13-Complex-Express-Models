import pool from '../utils/pool';

export default class Order {
  id;
  order_id;
  order_name;

  constructor(row) {
    this.id = row.id;
    this.order_id = row.order_id;
    this.order = row.order_name;
  }

  static async insert({ order_id, order }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (order_id, order_name) VALUES ($1, $2) RETURNING *',
      [order_id, order]
    );

    return new Order(rows[0]);
  }

  static async getAllOrders() {
    const { rows } = await pool.query('SELECT * FROM orders');
    return rows.map((row) => new Order(row));
  }
}
