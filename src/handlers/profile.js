const db = require('../models');
const moment = require('moment');

const getProfileByUser = async (req, res, next) => {
  try {
    const user = await db.User.findOne({name: req.params.username});
    const profile = await db.Profile.findOne({creator: user._id});

    if (!profile) {
      return res.status(404).json({message: 'Profile not found'});
    }

    return res.status(200).json({
      profile,
    });
  } catch (err) {
    next(err);
  }
};

const getProfileByAppId = async (req, res, next) => {
  try {
    const application = await db.Profile.findOne({_id: req.params.id});

    if (!application) {
      return res.status(404).json({message: 'Profile not found'});
    }

    return res.status(200).json({
      application,
    });
  } catch (err) {
    next(err);
  }
};


const getProfileByUserId = async (req, res, next) => {
  try {
    const profile = await db.Profile.findOne({creator: req.params.id});

    if (!profile) {
      return res.status(404).json({message: 'Profile not found'});
    }

    return res.status(200).json({
      profile,
    });
  } catch (err) {
    next(err);
  }
};

const getProfiles = async (req, res, next) => {
  try {
    const profiles = await db.Profile.find({});

    if (!profiles) {
      return res.status(404).json({message: 'Profile not found'});
    }

    return res.status(200).json({
      profiles,
    });
  } catch (err) {
    next(err);
  }
};

const searchProfiles = async (req, res, next) => {
  try {
    const regex = new RegExp(req.query.name, 'i');

    const users = await db.User.find({
      $or: [
        {firstName: regex},
        {lastName: regex},
      ],
    });

    const userIds = users.map((user) => user._id);

    const profiles = await db.Profile.find({creator: {$in: userIds}});

    if (profiles.length === 0) {
      return res.status(404).json({message: 'Profile not found'});
    }

    return res.status(200).json({profiles});
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const author = await db.User.findOne({name: req.body.username});

    const profile = await db.Profile.findOne({creator: author._id});

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


    author.applicationStatus = 'pending';
    author.application = profile._id;
    if (req.body.workAuth) {
      author.workAuthType = req.body.workAuth.type;
    }
    if (req.body.visaStatus) {
      author.visaStatus = req.body.visaStatus;
    }
    await author.save();

    return res.status(200).json(
        profile,
    );
  } catch (err) {
    next(err);
  }
};

const createProfile = async (req, res, next) => {
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
    const application = await db.Profile.create({...req.body,
      creator: author._id});

    author.applicationStatus = 'pending';
    author.application = application._id;
    if (req.body.workAuth) {
      author.workAuth = req.body.workAuth;
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


module.exports = {createProfile, updateProfile,
  getProfileByUser, getProfiles, searchProfiles,
  getProfileByUserId, getProfileByAppId};
