const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {referrer, emergencyContact, workAuth} = require('./SharedFields');
// const checkRequired = () => {
//   return this.status !== 'draft';
// };
const applicationSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    preferredName: {
      type: String,
    },
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  address: {
    building: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  workPhoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  SSN: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'i do not wish to answer'],
    required: true,
  },
  citizenship: {
    type: String,
    enum: ['citizen', 'green card', 'no'],
    required: true,
  },
  workAuth: workAuth,
  referrer: referrer,
  emergencyContacts: [emergencyContact],

  driverLicense: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
  profilePicture: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
  },
});

module.exports = mongoose.model('Application', applicationSchema);


