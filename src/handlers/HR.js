const db = require('../models');
const nodemailer = require('nodemailer');

const updateEmpolyeeStatus = async (req, res) => {
  try {
    const {username, type, status} = req.body;
    const user = await db.User.findOne({name: username});
    if (user) {
      user.visaStatus[type].status = status;
      await user.save(); // Save the changes to the database
      return res.status(200).json('updateEmpolyeeStatus success');
    } else {
      return res.status(400).json({message: 'updateEmpolyeeStatus error'});
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: 'updateEmpolyeeStatus error'});
  }
};

const sendNotification = async (req, res, next) => {
  try {
    const email = req.body.email;

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
      subject: 'Work Authorization Status Update',
      text: `Please check your work authorization status.`,
    });

    res.status(200).send('Token generated and email sent.');
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = {updateEmpolyeeStatus, sendNotification};
