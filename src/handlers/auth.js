const db = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const signup = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.email !== req.body.email) {
      return res.status(400).json({
        message: 'Invalid token',
      });
    }

    const user = await db.User.create(req.body);
    const {
      name, email, role,
    } = user;
    const jwtToken = jwt.sign(
        {
          name,
          email,
          role,
        },
        process.env.SECRET_KEY,
    );
    return res.status(200).json({
      name,
      email,
      jwtToken,
    });
  } catch (err) {
    return res.status(400).json({
    });
  }
};

const signin = async (req, res, next) => {
  const {name, password} = req.body;
  try {
    const user = await db.User.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      const {role} = user;
      const token = jwt.sign(
          {
            name,
            role,
          },
          process.env.SECRET_KEY,
      );
      return res.status(200).json({
        name,
        role,
        token,
      });
    }
    return res.status(400).json({
      message: 'Invalid Email/Password',
    });
  } catch (err) {
    return next({
      status: 400,
      message: err,
    });
  }
};


const invite = async (req, res) => {
  // Generate a unique token
  const email = req.body.email;
  const token = jwt.sign(
      {
        email,
      },
      process.env.JWT_SECRET_KEY, {
        expiresIn: '3h',
      });

  const registrationLink = `http://localhost:5173/register?token=${token}`;

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
    subject: 'Registration Link',
    text: `Please click on the link to register: ${registrationLink}`,
  });

  res.status(200).send('Token generated and email sent.');
};

module.exports = {signup, signin, invite};
