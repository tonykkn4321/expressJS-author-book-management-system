// lib/config.js

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    dialect: 'mysql',
    username: 'root',
    password: 'Aa161616',
    database: 'author_book_management_system',
    host: 'localhost',
    logging: true,
  },
  test: {
    dialect: 'sqlite',
    storage: './test.sqlite',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Railway uses self-signed certs
      },
    },
    logging: false,
  },
};

module.exports = config[env];