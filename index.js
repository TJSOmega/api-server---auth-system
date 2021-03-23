'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const server = require('./src/server.js');

const PORT = process.env.PORT;
const MONGOD_URI = process.env.MONGOD_URI || 'mongodb://localhost:27017/auth-system';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGOD_URI, options );

server.start(PORT);
