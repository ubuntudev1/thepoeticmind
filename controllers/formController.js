const bcrypt = require('bcryptjs');
const Poem = require('../models/poem');

exports.getForm = (req, res) => {
  res.render('form');
};

exports.success = (req, res) => {
  res.render('success', { author: req.body.author });
};

exports.postForm = async (req, res) => {
  const { title, content, category, author } = req.body;
  const file = req.file;

  const newUser = new Poem({
    title,
    content,
    category,
    author,
    file: file ? file.path : null,
    status: 'pending' // ✅ New field for vetting
  });

  await newUser.save();
  res.render('success', { author });
};

