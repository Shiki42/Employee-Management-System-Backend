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
    const {username, type} = req.body;
    const file = req.file; // Uploaded files will be stored in req.file

    const user = await User.findOne({name: username});
    const newDocument = new Document({
      filename: file.filename, // 'file' comes from req.file
      filePath: file.path,
      user: user._id,
    });

    if (type === 'optReceipt') {
      user.visaStatus.optReceipt.docId = newDocument._id;
      user.visaStatus.optReceipt.status = 'pending';
    } else if (type === 'optEad') {
      user.visaStatus.optEad.docId = newDocument._id;
      user.visaStatus.optEad.status = 'pending';
    } else if (type === 'i983') {
      user.visaStatus.i983.docId = newDocument._id;
      user.visaStatus.i983.status = 'pending';
    } else if (type === 'i20') {
      user.visaStatus.i20.docId = newDocument._id;
      user.visaStatus.i20.status = 'pending';
    } else if (type === 'driverLicense') {
      user.driverLicense = newDocument._id;
    } else if (type === 'profilePicture') {
      user.profilePicture = newDocument._id;
    }

    await user.save();
    await newDocument.save();
    console.log('documentId: newDocument._id', newDocument._id);
    res.status(200).json({
      type,
      documentId: newDocument._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({message: 'Error uploading file.'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({message: 'Document not found'});
    }

    const filePath = path.join(__dirname, '../uploads/', document.filename);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    } else {
      return res.status(404).json({message: 'File not found'});
    }
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
});

router.put('/:id', async (req, res) => {
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
