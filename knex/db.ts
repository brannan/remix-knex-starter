import knex from 'knex';
import config from './knexfile';

console.log('process.env.DATABASE_URL: ', process.env.DATABASE_URL);
if (!config.development.connection || !config.development.connection.filename) {
    throw new Error('No connection string provided in knexfile.ts or DATABASE_URL environment variable');
}
const db = knex(config.development)

export default db;