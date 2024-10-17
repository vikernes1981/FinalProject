const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  adoptionStatus: { type: String, enum: ['available', 'adopted'], default: 'available' },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pet', PetSchema);
