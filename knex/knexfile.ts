const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URL || "./knex/data.db",
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URL || "./knex/data.db",
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URL || "./knex/data.db",
    },
    useNullAsDefault: true,
  },
};

export default config;
