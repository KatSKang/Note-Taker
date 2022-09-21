const express = require('express');

// Import the routers
const apiRouter = require('./htmlRoutes');
const notesRouter = require('./notesRouter');

const app = express();

app.use('/tips', apiRouter);
app.use('/feedback', notesRouter);

module.exports = app;
