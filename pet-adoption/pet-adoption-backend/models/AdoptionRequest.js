const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User schema
    required: true,
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet', // Reference to the Pet schema
    required: true,
  },
  message: {
    type: String, // User's message or any questions they might have
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('AdoptionRequest', adoptionRequestSchema);