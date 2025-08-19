// lib/db.js
const { Sequelize } = require('sequelize');
const dbConfig = require('./config');

let sequelize;

if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], {
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: dbConfig.logging,
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      storage: dbConfig.storage, // used only for SQLite
      logging: dbConfig.logging,
    }
  );
}

module.exports = sequelize;