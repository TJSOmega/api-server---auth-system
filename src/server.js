'use strict';

const express = require('express');

// const notFoundHandler = require('./error-handlers/404.js');
// const errorHandler = require('./error-handlers/500.js');

const app = express();
app.use(express.json());


module.exports = {
    server: app,
    start: port => {
        if (!port) { throw new Error("worng port"); }
        app.listen(port, () => console.log(`Listening on ${port}`));
    },
};