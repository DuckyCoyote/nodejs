import mysql, { ConnectionOptions } from 'mysql2/promise';
import config from '../config/config';

const { HOST, PASSWORD, USER, DATABASE, PORT } = config;

const access: ConnectionOptions = {
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
};

export const db = mysql.createPool(access);
