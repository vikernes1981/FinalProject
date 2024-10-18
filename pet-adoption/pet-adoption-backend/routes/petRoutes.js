const express = require('express');
const { getAllPets, createPet, getPetById, updatePet, submitInquiry } = require('../controllers/petController');
const Pet = require('../models/Pet'); // Import the Pet model directly for the new routes
const router = express.Router();

// Existing routes
router.get('/', getAllPets);
router.post('/', createPet);
router.get('/:id', getPetById);
router.post('/:petId/inquiry', submitInquiry);

// Update a Pet (Admin only)
router.put('/:id', updatePet);

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
