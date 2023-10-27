const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const documentSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
  fileType: {
    type: String,
    enum: ['pdf', 'doc', 'docx', 'jpg', 'png'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  feedback: String,
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
