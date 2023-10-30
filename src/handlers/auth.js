/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const db = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const create_test_users = async () => {
  try {
    const user1 = await db.User.create({
      name: 'user3',
      email: '1@3.cn',
      password: '123qwe',
      role: 'employee',
    });
    const profile1 = await db.Profile.create({
      'name': {
        'firstName': 'Shuyuan',
        'lastName': 'Hu',
      },
      'address': {
        'building': '08',
        'street': '1051 Southern Dr',
        'city': 'Columbia',
        'state': 'SC',
        'zip': '29201',
      },
      'workAuth': {
        'type': 'F1(CPT/OPT)',
        'StartDate': '2023-10-24T00:00:00.000Z',
        'EndDate': '2023-10-04T00:00:00.000Z',
      },
      'referrer': {
        'name': {
          'firstName': '1',
          'lastName': '2',
        },
        'relationship': '3',
      },
      'status': 'pending',
      'phoneNumber': '12137091760',
      'email': 'hushuyuan42+job@gmail.com',
      'SSN': '99922',
      'DOB': '2023-10-04T00:00:00.000Z',
      'gender': 'i do not wish to answer',
      'citizenship': 'no',
      'emergencyContacts': [],
    });
    user1.application = profile1._id;
    profile1.creator = user1._id;
    await user1.save();
    await profile1.save();
  } catch (err) {
    console.log(err);
  }
};

// create_test_users();
const signup = async (req, res) => {
  try {
    // const token = req.headers.authorization.split(' ')[1];


    const {name, email, password, token} = req.body;
    // const DBtoken = db.Token.findOne({token: token});
    // const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // if (decoded.email !== email || DBtoken.expireDate < Date.now()) {
    //   return res.status(400).json({
    //     message: 'Invalid token',
    //   });
    // }

    const user = await db.User.create({email, password, name});
    console.log(user);
    const {role} = user;
    const jwtToken = jwt.sign(
        {
          name,
          email,
          role,
        },
        process.env.SECRET_KEY,
    );
    return res.status(200).json({
      name,
      email,
      jwtToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: 'Invalid token'});
  }
};

const signin = async (req, res, next) => {
  const {name, password} = req.body;
  try {
    const user = await db.User.findOne({name});
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const application = await db.Profile.findOne({creator: user._id});
      const {role, email, visaStatus, workAuthType} = user;
      const token = jwt.sign(
          {
            email,
            name,
            role,
          },
          process.env.SECRET_KEY,
      );
      return res.status(200).json({
        name,
        email,
        applicationId: application?._id || null,
        applicationStatus: application?.status || null,
        role,
        token,
        visaStatus,
        workAuthType,
      });
    }
    return res.status(400).json({
      message: 'Invalid Email/Password',
    });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};


const getProfileStatus = async (req, res, next) => {
  try {
    const {token} = req.body;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await db.User.findOne({email: decoded.email});
    const application = await db.Profile.findOne({creator: user._id});
    return res.status(200).json({
      applicationId: application?._id || null,
      applicationStatus: application?.status || null,
      visaStatus: user?.visaStatus || null,
    });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};


// Invite new employee
// params: req.body.email
const invite = async (req, res) => {
  // Generate a unique token
  try {
    const email = req.body.email;
    const token = jwt.sign(
        {
          email,
        },
        process.env.JWT_SECRET_KEY, {
          expiresIn: '3h',
        });

    const registrationLink = `http://localhost:5173/register?token=${token}&email=${encodeURIComponent(email)}`;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hushuyuan42@gmail.com',
        pass: process.env.emailPassword,
      },
    });

    // Send email to new employee
    await transporter.sendMail({
      from: '"Chuwa Human Resource" <hushuyuan42@gmail.com>',
      to: email,
      subject: 'Registration Link',
      text: `Please click on the link to register: ${registrationLink}`,
    });

    res.status(200).send('Token generated and email sent.');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {signup, signin, invite, getProfileStatus};
