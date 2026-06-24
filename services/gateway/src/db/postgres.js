const { Pool } = require('pg');
const logger = require('../middleware/logger');

let pool;

const getDb = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      logger.error('PostgreSQL pool error:', err);
    });

    logger.info('PostgreSQL connection pool initialized');
  }
  return pool;
};

module.exports = { getDb };
