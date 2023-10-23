const mongoose = require('mongoose');

const uri =  // Replace with your MongoDB Atlas connection URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

module.exports = mongoose.connection;

