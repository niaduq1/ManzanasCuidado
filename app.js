// This app already use environment variables
require('dotenv').config();
const express = require("express");
// Initial express
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { sequelize, connection } = require("./config/database");
const routes = require("./src/routes")

// Use logger morgan(dev) in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  app.use(morgan('dev'));
}

// Global middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handling globals errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error'
  });
});

// The function that initializes the database is called
connection();

app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 