// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// View all poems
router.get('/admin/poems', adminController.getAllPoems);

// Approve or reject
router.post('/admin/approve/:id', adminController.approvePoem);
router.post('/admin/reject/:id', adminController.rejectPoem);
router.get('/approved/:id', adminController.viewApprovedPoem);
router.get('/admin/poems', adminController.getAllPoems);


module.exports = router;
