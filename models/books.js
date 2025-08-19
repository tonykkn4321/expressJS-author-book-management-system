const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');
const Author = require('./authors');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1000,
      max: new Date().getFullYear()
    }
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'books',
  timestamps: false
});


module.exports = Book;
