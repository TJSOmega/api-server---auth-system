'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const server = require('./src/server.js');

const PORT = process.env.PORT || 3333;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-system';
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

mongoose.connect(MONGODB_URI, options)
  .then(
    server.start(PORT)
  )



