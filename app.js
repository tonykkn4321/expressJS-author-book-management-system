const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./lib/db'); // ✅ Environment-aware Sequelize instance
const authorsRoutes = require('./routes/authors');
const booksRoutes = require('./routes/books');
const errorHandler = require('./middleware/errorHandler');

// Load models to register associations
require('./models'); // This loads models and sets up associations

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*', credentials: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

// Error handler
app.use(errorHandler);

// Sync DB and start server
// .sync({ alter: true }) to auto-create tables
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database synced and tables updated');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Failed to sync database:', err);
});
