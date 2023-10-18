const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  documents: [{
    type: Schema.Types.ObjectId,
    ref: 'Document',
  }],
  visaStatus: {
    type: String,
    enum: ['citizen', 'green card', 'H1B', 'F1'],
    default: 'citizen',
    required: true,
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application',
  }],
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
