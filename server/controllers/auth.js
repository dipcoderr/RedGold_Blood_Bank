const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

exports.register = async (req, res) => {
  try {
    const { name, phone, address, email, password } = req.body;
    if (!email || !password || !name || !phone || !address) {
      return res.status(422).json({ error: 'All fields are mandatory!' });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return res.status(422).json({ error: 'User already exists with that email!' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, address, email, password: hashed });
    const saved = await user.save();
    res.status(201).json({ message: 'Registered successfully!', userId: saved._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: 'Email and password are required' });
    }
    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      return res.status(422).json({ error: 'Invalid credentials!' });
    }
    const ok = await bcrypt.compare(password, savedUser.password);
    if (!ok) {
      return res.status(422).json({ error: 'Invalid credentials!' });
    }
    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Logged in successfully!',
      token,
      userId: savedUser._id,
      isAdmin: !!savedUser.isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
