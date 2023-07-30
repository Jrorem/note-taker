const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
   readFromFile, 
   readAndAppend,
   writeToFile,
} = require('../helpers/fsUtils');


router.get('/notes', (req, res) => {
   const noteId = req.params.id;
   readFromFile('./db/db.json')
   .then((data) => res.json(JSON.parse(data)))
   .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve note'});
   })
});

router.get('/notes/:noteId', (req, res) => {
   const noteId = req.params.id;
   readFromFile('./db/db.json')
     .then((data) => JSON.parse(data))
     .then((json) => {
      
       const result = json.filter((note) => note.id.toString() === noteId);
       return result.length > 0
         ? res.json(result)
         : res.json('note not found');
     });
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
         console.log(newNote.noteId);
      })
      .catch((err) => {
         console.error(err);
         res.status(500).json({ error: 'Failed to add note'});
         
      })
   } else {
      res.status(400)({ error: 'Failed to add note, title and text required'});;
   }
});

notes.delete('/:id', (req, res) => {
   const noteId = req.params.id;
   readFromFile('./db/notes.json')
     .then((data) => JSON.parse(data))
     .then((json) => {

       const result = json.filter((note) => note.id !== noteId);
 
       writeToFile('./db/notes.json', result);
       res.json(`Item ${noteId} has been deleted`);
     });
 });


module.exports = router;

