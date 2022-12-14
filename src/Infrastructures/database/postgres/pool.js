/* istanbul ignore file */
// istanbul let jest ignore this file

const { Pool } = require('pg');

const testConfig = {
  host: process.env.PGHOST_TEST,
  port: process.env.PGPORT_TEST,
  user: process.env.PGUSER_TEST,
  password: process.env.PGPASSWORD_TEST,
  database: process.env.PGDATABASE_TEST,
};

// NODE_ENV value is set automatically by jest ('test') when running tests
const pool = process.env.NODE_ENV === 'test' ? new Pool(testConfig) : new Pool();

module.exports = pool;
