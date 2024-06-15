import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '188.246.96.246',
  port: 3306,
  user: 'KarelPelcak',
  password: 'KajaPelcak172004!',
  database: 'eshop_dev'
});

export default pool;
