import Knex from 'knex';
import dotenv from 'dotenv'

dotenv.config();

export const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'screener',
    port: 5432,
  },
});
