const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const checkRequired = () => {
//   return this.status !== 'draft';
// };
const profileSchema = new Schema({
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
  profilePicture: {
    type: String,
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
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    relationship: {
      type: String,
      required: true,
    },
  },
  emergencyContact: [{
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
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    relationship: {
      type: String,
      required: true,
    },
  }],
  workAuthFile: {
    type: Schema.Types.ObjectId,
    ref: 'File',
  },
  driverLicense: {
    type: Schema.Types.ObjectId,
    ref: 'File',
  },
});

module.exports = mongoose.model('Profile', profileSchema);
