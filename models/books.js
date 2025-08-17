const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Author = require('./authors');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable createdAt and updatedAt
});

// Define associations
Author.hasMany(Book, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Book.belongsTo(Author, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Book;
