const Author = require('../models/authors');
const Book = require('../models/books');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll({
      include: {
        model: Book,
        attributes: ['id', 'title', 'year']
      }
    });

    // Rename "Books" to "books" for each author
    const result = authors.map(author => {
      const json = author.toJSON();
      json.books = json.Books;
      delete json.Books;
      return json;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
};

exports.createAuthor = async (req, res) => {
  const { first_name, last_name } = req.body;
  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const author = await Author.create({ first_name, last_name });
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id, {
      include: {
        model: Book,
        attributes: ['id', 'title', 'year']
      }
    });

    if (!author) return res.status(404).json({ error: 'Author not found' });

    const result = author.toJSON();
    result.books = result.Books;
    delete result.Books;

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch author' });
  }
};

exports.updateAuthor = async (req, res) => {
  const updateFields = {};
  if (req.body.first_name) updateFields.first_name = req.body.first_name.trim();
  if (req.body.last_name) updateFields.last_name = req.body.last_name.trim();

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided' });
  }

  try {
    await Author.update(updateFields, { where: { id: req.params.id } });
    res.json({ message: 'Author updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await Author.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Author deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
