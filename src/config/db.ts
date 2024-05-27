import mysql, { ConnectionOptions } from 'mysql2/promise';

const access: ConnectionOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'wikicid',
};

export const db = mysql.createPool(access);