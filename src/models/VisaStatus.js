const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisaStatusSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  optReceipt: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  optEad: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  i983: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  i20: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
});

const VisaStatus = mongoose.model('VisaStatus', VisaStatusSchema);

module.exports = VisaStatus;
