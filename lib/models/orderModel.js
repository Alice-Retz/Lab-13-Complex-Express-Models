import pool from '../utils/pool';

export default class Order {
  id;
  order;

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

  static async getCount() {
    const { rows } = await pool.query(`
    SELECT order_name AS order, COUNT(*) AS species
    FROM species 
    INNER JOIN orders 
    ON orders.id = species.order_id
    GROUP BY orders.id
    `);
    return rows;
  }
}
