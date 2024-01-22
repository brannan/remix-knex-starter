import knex, { Knex } from 'knex';
import config from './knexfile';

const db = knex(config.development as Knex.Config<any>)

export default db;