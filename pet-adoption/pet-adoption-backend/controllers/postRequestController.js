const AdoptionRequest = require('../models/AdoptionRequest');

// Create a new adoption request
exports.createAdoptionRequest = async (req, res) => {
  try {
    const { user, pet, message, status } = req.body;

    // Create a new adoption request based on the schema
    const newRequest = new AdoptionRequest({
      user,
      pet,
      message,
      status: status || 'Pending', // Default status to 'Pending'
    });

    // Save the request to the database
    const savedRequest = await newRequest.save();

    res.status(201).json(savedRequest); // Respond with the created request
  } catch (error) {
    console.error('Error creating adoption request:', error);
    res.status(500).json({ error: 'Failed to create adoption request' });
  }
};
