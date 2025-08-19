const Author = require('./authors');
const Book = require('./books');

// Define associations here
Author.hasMany(Book, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Book.belongsTo(Author, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = {
  Author,
  Book
};
