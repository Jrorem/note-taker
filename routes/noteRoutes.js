const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');
const {
   readFromFile, 
   readAndAppend,
   writeToFile,
} = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
   readFromFile('./db/db.json')
   .then((data) => res.json(JSON.parse(data)))
   .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve note'});
   })
});

router.post('/notes', (req, res) => {

   const { title, text } = req.body;

   if (title && text) {
      const newNote = {
         title,
         text,
         noteId: uuidv4(),
      };
      
      readAndAppend(newNote, './db/db.json')
      .then(() => {
         res.json('Note added succesfully');
      })
      .catch((err) => {
         console.error(err);
         
      })
   } else {
      res.status('Failed to add note')
   }
});


module.exports = router;