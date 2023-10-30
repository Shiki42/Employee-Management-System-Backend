/* eslint-disable no-unused-vars */
const db = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const getEmployeesStatus = async (req, res) => {
  try {
    const users = await db.User.find({role: 'employee'});

    return res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: 'getEmployeesStatus error'});
  }
};


module.exports = {getEmployeesStatus};
