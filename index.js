'use strict';

require('dotenv').config();

const mongoose = require('mongoose');

const MONGOD_URI = process.env.MONGOD_URI || 'mongodb://localhost:27017/food'

const options = {useNewUrlParser: true, useUnifiedTopology: true}


mongoose.connect(MONGOD_URI, options );

const server = require('./src/server.js');

server.start(3000);