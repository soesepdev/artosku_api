require('dotenv').config();
const pgp = require('pg-promise')();
const pg = require('pg');

pg.types.setTypeParser(20, val => parseInt(val, 10));

const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = db;