const db = require('../models');
const moment = require('moment');
const getApplicationsById = async (req, res, next) => {
  try {
    const application = await db.Application.findOne({_id: req.params.id});

    if (!application) {
      return res.status(404).json({message: 'Application not found'});
    }

    return res.status(200).json({
      application,
    });
  } catch (err) {
    next(err);
  }
};


const updateApplication = async (req, res, next) => {
  try {
    const author = await db.User.findOne({name: req.body.username});

    if (!author) {
      return res.status(404).json({message: 'User not found'});
    }
    if (req.body.DOB) {
      req.body.DOB = moment(req.body.DOB).format('YYYY-MM-DD');
    }
    if (req.body.workAuth) {
      req.body.workAuth.StartDate =
    moment(req.body.workAuth.StartDate).format('YYYY-MM-DD');
      req.body.workAuth.EndDate =
    moment(req.body.workAuth.EndDate).format('YYYY-MM-DD');
    }
    const application = await db.Application.create({...req.body,
      creator: author._id});

    author.applicationStatus = 'pending';
    author.application = application._id;
    if (req.body.workAuth) {
      author.workAuthType = req.body.workAuth.type;
    }
    if (req.body.visaStatus) {
      author.visaStatus = req.body.visaStatus;
    }
    await author.save();

    return res.status(200).json(
        application,
    );
  } catch (err) {
    next(err);
  }
};

const createApplication = async (req, res, next) => {
  try {
    const author = await db.User.findOne({name: req.body.username});

    if (!author) {
      return res.status(404).json({message: 'User not found'});
    }
    if (req.body.DOB) {
      req.body.DOB = moment(req.body.DOB).format('YYYY-MM-DD');
    }
    if (req.body.workAuth) {
      req.body.workAuth.StartDate =
    moment(req.body.workAuth.StartDate).format('YYYY-MM-DD');
      req.body.workAuth.EndDate =
    moment(req.body.workAuth.EndDate).format('YYYY-MM-DD');
    }
    const application = await db.Application.create({...req.body,
      creator: author._id});

    author.applicationStatus = 'pending';
    author.application = application._id;
    if (req.body.workAuth) {
      author.workAuthType = req.body.workAuth.type;
    }
    if (req.body.visaStatus) {
      author.visaStatus = req.body.visaStatus;
    }
    await author.save();

    return res.status(200).json(
        application,
    );
  } catch (err) {
    next(err);
  }
};


const getApplicationsByUser = async (req, res, next) => {
  try {
    const author = await db.User.findOne({name: req.body.name});

    if (!author) {
      return res.status(404).json({message: 'User not found'});
    }

    const applications = await db.Application.find({author: author._id});

    if (!applications) {
      return res.status(404).json({message: 'Application not found'});
    }

    return res.status(200).json({
      applications,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {createApplication, updateApplication,
  getApplicationsById, getApplicationsByUser};
