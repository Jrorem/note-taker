const router = require("express").Router()
const { v4: uuidv4 } = require('uuid');
const {
   readFromFile, 
   readAndAppend,
   writeToFile,
} = require('../helpers/fsUtils');

router.get('/', (req, res) => {
   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
   console.log(req.body);

   const { note } = req.body;

   if (req.body) {
      const newNote = {
         note,
         noteId: uuidv4(),
      };
      
      readAndAppend(newNote, './db/db.json');
      res.json('Note added succesfully');
   } else {
      res.errored('Failed to add note')
   }
});


module.exports = router;