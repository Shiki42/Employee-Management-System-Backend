/* eslint-disable no-unused-vars */
const db = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
      workAuth: user?.workAuth || null,
    });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};


const getEmployeesStatus = async (req, res) => {
  try {
    const users = await db.User.find({role: 'employee'});

    console.log('all users', users);
    return res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: 'getEmployeesStatus error'});
  }
};


module.exports = {getEmployeesStatus, getProfileStatus};
