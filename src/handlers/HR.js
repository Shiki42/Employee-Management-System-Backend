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
        email: user.email,
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

const getAllEmployeesStatus = async (req, res) => {
  try {
    const users = await db.User.find({role: 'employee'});


    const usersStatusOngoing = users.filter((user) => {
      return true;
    });

    const visaStatuses = usersStatusOngoing.map((user) => {
      return {
        id: user._id,
        name: user.name,
        workAuth: user.workAuth,
        visaStatus: user.visaStatus,
        email: user.email,
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


const getEmployeeApplications = async (req, res, next) => {
  try {
    const originalapplications = await db.Profile.find(
        {});
    const applications = originalapplications.map((application) => {
      return {
        userId: application.creator,
        id: application._id,
        name: application.name.firstName + ' ' + application.name.lastName,
        email: application.email,
        status: application.status,
      };
    });
    return res.status(200).json({
      applications,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const VisaStatusNextSteps = {
  'optReceipt': 'optEad',
  'optEad': 'i983',
  'i983': 'i20',
};

const updateEmpolyeeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const {type, status} = req.body;
    const user = await db.User.findOne({_id: id});
    if (user) {
      user.visaStatus[type].status = status;
      if (status === 'approved' && VisaStatusNextSteps[type] &&
      user.visaStatus[VisaStatusNextSteps[type]].status == 'N/A') {
        user.visaStatus[VisaStatusNextSteps[type]].status = 'need to upload';
        user.visaStatus.status = VisaStatusNextSteps[type];
      } else if (status === 'approved' && !VisaStatusNextSteps[type]) {
        user.visaStatus.status = 'approved';
      }
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

const updateApplicationStatus = async (req, res, next) => {
  try {
    const {id, status, feedback} = req.body;

    const application = await db.Profile.findOne({_id: id});
    if (application) {
      application.status = status;
      application.feedback = feedback;
      await application.save();
      return res.status(200).json('update Application Status success');
    } else {
      return res.status(404).json({message: 'User/Application not found'});
    }
  } catch (err) {
    console.log(err);
    next(err);
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

const getAllTokens = async (req, res, next) => {
  try {
    const tokens = await db.Token.find({});
    return res.status(200).json({tokens});
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {getEmployeeApplications, getEmployeesStatusOngoing,
  getAllEmployeesStatus, updateEmpolyeeStatus, updateApplicationStatus,
  sendNotification, getAllTokens};
