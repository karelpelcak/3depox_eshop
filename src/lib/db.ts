import mysql from 'mysql2/promise';
import { config } from './variables';

const pool = mysql.createPool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_DB
});

export default pool;
