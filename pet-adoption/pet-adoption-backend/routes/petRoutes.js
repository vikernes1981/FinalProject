const express = require('express');
const { getAllPets, createPet, getPetById, submitInquiry } = require('../controllers/petController');
const Pet = require('../models/Pet'); // Import the Pet model directly for the new routes
const router = express.Router();

// Existing routes
router.get('/', getAllPets);
router.post('/', createPet);
router.get('/:id', getPetById);
router.post('/:petId/inquiry', submitInquiry);

// Add a Pet (Admin only)
router.post('/', async (req, res) => {
  const { name, age, breed, location, description, image } = req.body;
  try {
    const newPet = new Pet({ name, age, breed, location, description, image });
    await newPet.save();
    res.json(newPet);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add pet' });
  }
});

// Delete a Pet (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete pet' });
  }
});

module.exports = router;
