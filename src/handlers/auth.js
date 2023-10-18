const db = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const signup = async (req, res) => {
    try {
        const token = req.query.token;

        const foundToken = await db.Token.findOne({ token });
      
        if (!foundToken) {
          return res.status(400).send('Invalid token');
        }
      
        if (foundToken.expireDate < Date.now()) {
          return res.status(400).send('Token has expired');
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
    const { name, password } = req.body;
    try {
      const user = await db.User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: 'User not found',
        });
      }
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        const { role } = user;
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
    const uniqueToken = crypto.randomBytes(32).toString('hex');

     // Assume email is coming from the request body
    // Create a new token instance
    const newToken = await db.Token.create({ token: uniqueToken});

    // Save the token to the database
    

    // Set up email data
    console.log(req.body);
    const email = req.body.email;
    const registrationLink = `http://localhost:5173/register?token=${uniqueToken}`;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'hushuyuan42@gmail.com',
        pass: process.env.emailPassword
        }
    });

    // Send email to new employee
    await transporter.sendMail({
        from: '"Chuwa Human Resource" <hushuyuan42@gmail.com>',
        to: email,
        subject: 'Registration Link',
        text: `Please click on the link to register: ${registrationLink}`
    });

    res.status(200).send('Token generated and email sent.');
};

module.exports = { signup, signin, invite };
