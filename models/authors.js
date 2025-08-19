const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');
const Book = require('./books');

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'First name cannot be empty' }
    }
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Last name cannot be empty' }
    }
  }
}, {
  tableName: 'authors',
  timestamps: false
});

module.exports = Author;
