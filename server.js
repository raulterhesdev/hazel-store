const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Dev imports
const colors = require('colors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env file
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

// Route files imports

// express app
const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Mount routers

// use error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
