const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  name: {
    required: true,
    fisrtName: {
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
  profilePicture: {
    type: String,
  },
  address: {
    required: true,
    building: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
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
  workAuth: {
    type: String,
    enum: ['citizen', 'green card', 'H1B/L2/H4', 'F1(CPT/OPT)', 'other'],
    required: true,
  },
  workAuthOther: {
    type: String,
  },
  workAuthStartDate: {
    type: String,
  },
  workAuthEndDate: {
    type: String,
  },
  referr: {
    name: {
      fisrtName: {
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
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
  },


});

module.exports = mongoose.model('Application', applicationSchema);


