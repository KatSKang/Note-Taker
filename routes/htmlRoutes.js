const path = require('path');
const router = require('express').Router();


//GET Route for the notes.html
router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//GET Route for the landing page index.html
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;