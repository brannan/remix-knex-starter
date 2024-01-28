import knex, { Knex } from 'knex';
import config from './knexfile';

const env = process.env.NODE_ENV || "development";
console.log("db config: ", JSON.stringify(config[env], null, 3));
console.log("db filename: ", config[env].connection.filename);
const db = knex(config[env] as Knex.Config<any>)

export default db;