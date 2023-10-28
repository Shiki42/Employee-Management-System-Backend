const db = require('../models');


const getProfileByUser = async (req, res, next) => {
  try {
    const user = await db.User.findOne({name: req.params.username});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const profile = await db.Profile.findOne({_id: user.profile});


    return res.status(200).json({
      profile,
    });
  } catch (err) {
    next(err);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const user = await db.User.findOne({name: req.body.username});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const profile = await db.Profile.create(req.body);

    user.profile= profile._id;

    await user.save();

    return res.status(200).json({
      profile,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await db.User.findOne({name: req.body.username});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const profile = await db.Profile.findOne({_id: user.profile});

    Object.assign(profile, req.body);

    await profile.save();

    return res.status(200).json({
      profile,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {getProfileByUser, createProfile, updateProfile};
