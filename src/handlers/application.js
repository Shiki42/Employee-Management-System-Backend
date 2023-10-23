const db = require('../models');

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
    // Find the application by _id
    const application = await db.Application.findOne({_id: req.params.id});

    // Handle case where application is not found
    if (!application) {
      return res.status(404).json({message: 'Application not found'});
    }

    // Update the application with fields from req.body.craft
    Object.assign(application, req.body);

    // Save the application to persist the changes
    await application.save();

    return res.status(200).json({
      application,
    });
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

    const application = await db.Application.create({...req.body,
      creator: author._id});
    console.log(author);
    author.application = application._id;
    await author.save();

    return res.status(200).json({
      application,
    });
  } catch (err) {
    next(err);
  }
};


// const createApplication = async (req, res, next) => {
//   try {
//     const author = await db.User.find({name: req.body.name});

//     if (!author) {
//       return res.status(404).json({message: 'User not found'});
//     }

//     const application = await db.Application.create({creator: author._id});
//     author.applications.push(application._id);
//     await author.save();

//     return res.status(200).json({
//       application,
//     });
//   } catch (err) {
//     next(err);
//   }
// };


// const submitApplication = async (req, res) => {
//   try {
//     const application = await db.Application.findOne({_id: req.params.id});

//     if (!application) {
//       return res.status(404).json({message: 'Application not found'});
//     }

//     Object.assign(application, req.body.craft);

//     await application.save();

//     return res.status(200).json({
//       application,
//     });
//   } catch (err) {
//     next(err);
//   }
// };


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
