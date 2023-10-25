/* eslint-disable new-cap */
const express = require('express');
const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const User = require('../models/User');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({storage: storage});

router.post('', upload.single('file'), async (req, res) => {
  try {
    const {username} = req.body;
    const file = req.file; // Uploaded files will be stored in req.file

    console.log(username);
    console.log(file);

    const user = await User.findOne({name: username});
    const newDocument = new Document({
      filename: file.filename, // 'file' comes from req.file
      filePath: file.path,
      user: user._id,
    });

    await newDocument.save();
    res.status(200).send({
      documentId: newDocument._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({message: 'Error uploading file.'});
  }
});

router.get('/documents', async (req, res) => {
  const documents = await Document.find({});
  res.status(200).json(documents);
});

router.put('/update/:id', async (req, res) => {
  const {id} = req.params;
  const {status, feedback} = req.body;

  const updatedDocument = await Document.findByIdAndUpdate(id,
      {status, feedback}, {new: true});

  if (!updatedDocument) {
    return res.status(404).send({message: 'Document not found.'});
  }

  res.status(200).send(updatedDocument);
});

module.exports = router;