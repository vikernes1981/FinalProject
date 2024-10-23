// backend/controllers/inquiryController.js

const Inquiry = require('../models/Inquiry');

// @desc    Create a new inquiry
// @route   POST /api/pets/:id/inquiry
// @access  Public
const createInquiry = async (req, res) => {
    const { name, email, message } = req.body;
    const petId = req.params.id;

    // Log the incoming data to verify the request body
    console.log('Incoming data:', { name, email, message, petId });

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const inquiry = new Inquiry({
            name,
            email,
            message,
            petId
        });

        // Log the inquiry object before saving
        console.log('Saving inquiry:', inquiry);

        const createdInquiry = await inquiry.save();
        res.status(201).json(createdInquiry);
    } catch (error) {
        console.log('Error saving inquiry:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Public
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { createInquiry, getAllInquiries };
