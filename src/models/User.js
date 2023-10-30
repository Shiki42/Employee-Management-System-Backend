const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['employee', 'HR', 'admin'],
    default: 'employee',
  },
  password: {
    type: String,
    required: true,
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: 'Application',
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
  },
  documents: [{
    type: Schema.Types.ObjectId,
    ref: 'Document',
  }],
  workAuth: {
    type: {
      type: String,
      enum: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other', 'N/A'],
    },
    StartDate: {
      type: Date,
    },
    EndDate: {
      type: Date,

    },
    Other: {
      type: String,
    },
  },
  visaStatus: {
    status: {
      type: String,
      enum: ['optReceipt', 'optEad', 'i983', 'i20', 'approved'],
      default: 'optReceipt',
    },
    optReceipt: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'N/A', 'need to upload'],
        default: 'N/A',
      },
      docId: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
      },
    },
    optEad: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'N/A', 'need to upload'],
        default: 'N/A',
      },
      docId: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
      },
    },
    i983: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'N/A', 'need to upload'],
        default: 'N/A',
      },
      docId: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
      },
    },
    i20: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'N/A', 'need to upload'],
        default: 'N/A',
      },
      docId: {
        type: Schema.Types.ObjectId,
        ref: 'Document',
      },
    },
  },
});

userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
