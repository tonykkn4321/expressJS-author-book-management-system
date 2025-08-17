const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config');
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:8000', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

// Error handler
app.use(errorHandler);

// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
