const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { check, validationResult } = require('express-validator');

const User = require('../models/User.js');
const Contact = require('../models/Contact.js');

// @route  GET api/contacts
// @desc   get all users contacts
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
// @route  POST api/contacts
// @desc   add new contact
// @access private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name: name,
        email: email,
        phone: phone,
        type: type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.status(200).json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error for getting contacts');
    }
  }
);
// @route  PUT api/contacts/:id
// @desc   update contact
// @access private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  //create new ContactFields object
  const contactFields = {};
  // check if any of the fields were included in the req.body - if so add them to the contactFields obj
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    // accessing the db to find the contact by id
    let contact = await Contact.findById(req.params.id);

    //
    if (!contact) {
      return res.status(404).json({ msg: 'Contact NOT found' });
    }

    // make sure user owns contact by comparing user-id from db to user-id from token
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error for updating this contact');
  }
});
// @route  DELETE api/contacts/:id
// @desc   delete a contact
// @access private
router.delete('/:id', (req, res) => {
  res.send('delete a contact');
});

module.exports = router;
