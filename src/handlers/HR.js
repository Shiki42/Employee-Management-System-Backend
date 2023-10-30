const db = require('../models');
const nodemailer = require('nodemailer');

const getEmployeesStatusOngoing = async (req, res) => {
  try {
    const users = await db.User.find({role: 'employee'});

    const usersStatusOngoing = users.filter((user) => {
      return user.visaStatus.status !== 'approved';
    });

    const visaStatuses = usersStatusOngoing.map((user) => {
      return {
        id: user._id,
        name: user.name,
        workAuth: user.workAuth,
        visaStatus: user.visaStatus,
      };
    });
    return res.status(200).json({
      visaStatuses,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: 'getEmployeesStatusOngoing error'});
  }
};

const updateEmpolyeeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const {type, status} = req.body;
    const user = await db.User.findOne({_id: id});
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
module.exports = {getEmployeesStatusOngoing, updateEmpolyeeStatus,
  sendNotification};
