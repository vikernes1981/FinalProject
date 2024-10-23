const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Dog', 'Cat', 'Bird', 'Fish', 'Turtle'], // Define the types of pets
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to the pet’s image
    required: false,
  },
  status: {
    type: String,
    enum: ['Available', 'Adopted'],
    default: 'Available',
    required: true,
  },
  adoptionDate: {
    type: Date, // Only if the pet is adopted
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Pet', petSchema);