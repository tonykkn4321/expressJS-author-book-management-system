const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Author = sequelize.define('Author', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable createdAt and updatedAt
});

module.exports = Author;
