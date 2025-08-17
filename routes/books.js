const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/', booksController.getAllBooks);
router.post('/', booksController.createBook);
router.get('/:id', booksController.getBookById);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);
router.get('/author/:author_id', booksController.getBooksByAuthor);

module.exports = router;
