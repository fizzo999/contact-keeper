const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth.js');
const { check, validationResult } = require('express-validator');

const User = require('../models/User.js');
const router = express.Router();

// @route  GET api/auth
// @desc   get logged in user
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  POST api/auth
// @desc   auth user and get token
// @access public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Passowrd is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      console.log(
        'here is the user from mongoDB ======================>>>>>>>',
        user
      );

      if (!user) {
        return res
          .status(400)
          .json({ msg: 'Invalid email - user does NOT exist' });
      }

      //checking the password from req.body to the stored (hashed) password in the db
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'invalid password' });
      }

      // if it is a match (the password matches the encrypted password in the database)
      // then we send the user.id as an object inside the encrypted token
      const payload = {
        user: {
          id: user.id,
        },
      };

      console.log('here it gets interesting ------->>>> user.id', user.id);
      console.log('here it gets interesting ------->>>> user._id', user._id);

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
