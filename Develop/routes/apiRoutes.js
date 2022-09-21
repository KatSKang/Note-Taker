const notes = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving stored notes from database if any
notes.get('/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding new note
notes.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;
// new note is stored in a new variable object and assigned an ID
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
// Pulls current data and writes in new note
    readAndAppend(newNote, './db/db.json');
    res.json(`New note added successfully!`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
