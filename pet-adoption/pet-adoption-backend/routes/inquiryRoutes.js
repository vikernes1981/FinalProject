// backend/routes/inquiryRoutes.js

const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries } = require('../controllers/inquiryController');

// @route   POST /api/pets/:id/inquiry
// @desc    Create a new inquiry
// @access  Public
router.post('/:id/inquiry', createInquiry);

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Public
router.get('/inquiries', getAllInquiries);

module.exports = router;
