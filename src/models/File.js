const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema = new Schema({
  name: String,
  filePath: String,
  fileType: {
    type: String,
    enum: ['pdf', 'doc', 'docx', 'jpg', 'png'],
  },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

});

const File = mongoose.model('File', fileSchema);