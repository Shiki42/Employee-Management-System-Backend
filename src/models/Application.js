const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const checkRequired = () => {
  return this.status !== 'draft';
};
const applicationSchema = new Schema({
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected'],
    default: 'draft',
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    required: checkRequired,
    fisrtName: {
      type: String,
      required: checkRequired,
    },
    lastName: {
      type: String,
      required: checkRequired,
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
    required: checkRequired,
    building: {
      type: String,
      required: checkRequired,
    },
    street: {
      type: String,
      required: checkRequired,
    },
    city: {
      type: String,
      required: checkRequired,
    },
    state: {
      type: String,
      required: checkRequired,
    },
    zip: {
      type: String,
      required: checkRequired,
    },
  },
  phoneNumber: {
    type: String,
    required: checkRequired,
  },
  email: {
    type: String,
    required: checkRequired,
  },
  SSN: {
    type: String,
    required: checkRequired,
  },
  DOB: {
    type: Date,
    required: checkRequired,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'i do not wish to answer'],
    required: checkRequired,
  },
  workAuth: {
    type: String,
    enum: ['citizen', 'green card', 'H1B/L2/H4', 'F1(CPT/OPT)', 'other'],
    required: checkRequired,
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
        required: checkRequired,
      },
      lastName: {
        type: String,
        required: checkRequired,
      },
      middleName: {
        type: String,
      },
    },
    phoneNumber: {
      type: String,
      required: checkRequired,
    },
    email: {
      type: String,
      required: checkRequired,
    },
    relationship: {
      type: String,
      required: checkRequired,
    },
  },
});

applicationSchema.pre('validate', function(next) {
  if (this.status === 'draft') {
    // Bypass Mongoose's automatic validation
    this.$__.validationError = null;
  }
  next();
});

module.exports = mongoose.model('Application', applicationSchema);


