const express = require('express');
const path = require('path');
const api = require("./routes/index.js")

const router = express();
const PORT = process.env.PORT || 3001;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use("/api", api)
router.use(express.static('public'));

router.get('/', (req, res) => 
res.sendFile(path.join(__dirname, './public/index.html'))
);

router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

router.listen(PORT, () => console.log("welcome to localhost:${PORT}"))