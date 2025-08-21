const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const formController = require('../controllers/formController');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });


router.post('/form/submit', upload.single('file'), formController.postForm);

module.exports = router;
