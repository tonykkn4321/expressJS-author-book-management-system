#   Project Structure:
expressJS-author-book-maangement-system/
├── config/
│   └── index.js              # Sequelize DB config
├── models/
│   ├── authors.js            # Author model
│   └── books.js              # Book model
├── routes/
│   ├── authors.js            # Author-related routes
│   └── books.js              # Book-related routes
├── controllers/
│   ├── authorsController.js  # Author controller logic
│   └── booksController.js    # Book controller logic
├── middleware/
│   └── errorHandler.js       # Centralized error handling
├── app.js                    # Express app setup
└── package.json              # Project metadata and dependencies



#   Initilize the project and Install dependencies:
npm init -y
npm install express sequelize sqlite3 body-parser cors dotenv morgan
npm install --save-dev nodemon

#   Add a Start Script
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
