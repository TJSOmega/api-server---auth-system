'use strict';

// 3rd party resources
const express = require('express');
require('dotenv').config();

// internal resources
const authRouter = require('./auth/routes.js');
const notesRouter = require('./routes/notes-router.js');
const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

const app = express();

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
app.use(notesRouter);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
    server: app,
    start: port => {
        if (!port) { throw new Error("wrong port"); }
        app.listen(port, () => console.log(`Listening on ${port}`));
    },
};
