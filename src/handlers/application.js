const db = require('../models');

const submitApplication = async (req, res) => {
  try {
    const token = db.Token.findOne({token: req.query.token});
    if (!token) {
      return res.status(400).send('Invalid token');
    }
    if (token.expireDate < Date.now()) {
      return res.status(400).send('Token has expired');
    }
    if (token.email!= req.body.email) {
      return res.status(400).send('Email does not match');
    }
    const application = await db.Application.create(req.body);
    return res.status(200).json({
      application,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {submitApplication};
