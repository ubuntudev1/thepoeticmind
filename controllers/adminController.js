// controllers/adminController.js

const User = require('../models/User');

exports.getAllPoems = async (req, res) => {
  const poems = await User.find();
  res.render('adminPoems', { poems });
};

exports.approvePoem = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.redirect('/admin/poems');
};

exports.rejectPoem = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: 'rejected' });
  res.redirect('/admin/poems');
};

exports.viewApprovedPoem = async (req, res) => {
  const poem = await User.findById(req.params.id);
  if (poem.status !== 'approved') {
    return res.send("This poem has not been approved yet.");
  }
  res.render('approvedPoem', { poem });
};

