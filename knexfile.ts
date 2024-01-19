import knex from "knex";

const config = {
  client: 'sqlite3',
  connection: {
    filename: './prisma/data.db'
  }
}

export default knex(config);