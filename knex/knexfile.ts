const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URL,
    },
    useNullAsDefault: true,
  }
};

export default config;
