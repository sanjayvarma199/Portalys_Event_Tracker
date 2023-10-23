const express = require('express');
const cors = require('cors');
const db = require('./dbConfig');
const trackingLinkRoutes = require('./routes/trackingLink');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use('/api', trackingLinkRoutes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
