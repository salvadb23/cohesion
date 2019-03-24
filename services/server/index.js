// app.js
// DEPENDENCIES
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cohesion';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
});

// MIDDLEWARE
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// ROUTES
app.use(require('./controllers'));

// LISTENER
if (require.main === module) {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
}

module.exports = app;
