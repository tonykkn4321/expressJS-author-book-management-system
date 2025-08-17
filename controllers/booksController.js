const Book = require('../models/books');
const Author = require('../models/authors');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.createBook = async (req, res) => {
  const { title, year, author_id } = req.body;
  if (!title || isNaN(year) || isNaN(author_id)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  try {
    const author = await Author.findByPk(author_id);
    if (!author) return res.status(400).json({ error: 'Author does not exist' });

    const book = await Book.create({ title, year, author_id });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};

exports.updateBook = async (req, res) => {
  const updateFields = {};
  if (req.body.title) updateFields.title = req.body.title.trim();
  if (!isNaN(parseInt(req.body.year))) updateFields.year = parseInt(req.body.year, 10);
  if (!isNaN(parseInt(req.body.author_id))) updateFields.author_id = parseInt(req.body.author_id, 10);

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  try {
    await Book.update(updateFields, { where: { id: req.params.id } });
    res.json({ message: 'Book updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { author_id: req.params.author_id } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books by author' });
  }
};
