const mongoose = require('mongoose');
const User = require('./User');
const Token = require('./Token');

const Application = require('./Application');
const Profile = require('./Profile');
const Document = require('./Document');
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

module.exports = {User, Token, Document, Application, Profile};
