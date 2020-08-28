const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload');

// Dev imports
// const colors = require('colors');
// const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env file
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

// Route files imports
const products = require('./routes/products');
const auth = require('./routes/auth');
const orders = require('./routes/orders');
const reviews = require('./routes/reviews');
// express app
const app = express();

// Body parser
app.use(express.json());

// File Upload
app.use(fileUpload());

// Dev logging middleware
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// Mount routers
app.use('/api/products', products);
app.use('/api/auth', auth);
app.use('/api/orders', orders);
app.use('/api/reviews', reviews);

// use error handler
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
