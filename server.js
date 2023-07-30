const express = require('express');
const path = require('path');
const noteRoutes = require("./routes/noteRoutes.js")


const router = express();
const PORT = process.env.PORT || 3001;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static('public'));
router.use("/api", noteRoutes)

router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

router.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './index.html'))
);



router.listen(PORT, () => console.log("welcome to localhost:${PORT}"))

