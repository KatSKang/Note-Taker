const router = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving stored notes from database if any
router.get('/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for adding new note
router.post('/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;
// new note is stored in a new variable object and assigned an ID
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
// Pulls current data and writes in new note
    readAndAppend(newNote, './db/db.json');
    res.json(`New note added successfully!`);
  } else {
    res.error('Error in adding note');
  }
});

//DELETE Route reads current data and filters out by ID, then saves as new data
router.delete('/notes/:id', (req,res) => {
  let id = req.params.id;
  console.log(id);

  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  const updatedNotes = notes.filter( note => note.id !== id );

  fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
  res.json(updatedNotes);
});

module.exports = router;
