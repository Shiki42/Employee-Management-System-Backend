const mongoose = require('mongoose');
const User = require('./User');
const Token = require('./Token');
const File = require('./File');
const Application = require('./Application');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};

connectDB();

module.exports = {User, Token, File, Application};
