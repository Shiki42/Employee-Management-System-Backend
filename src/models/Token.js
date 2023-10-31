const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
    default: (Date.now() + 3 * 60 * 60 * 1000),
  },
  status: {
    type: String,
    enum: ['pending', 'used', 'expired'],
    default: 'pending',
  },
  link: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'N/A',
  },
});

module.exports = mongoose.model('Token', tokenSchema);
