const Pet = require('../models/Pet');

// Fetch all pets with optional filters (age, breed, location)
exports.getAllPets = async (req, res) => {
  const { breed, location, age } = req.query;
  const filter = {};
  if (breed) filter.breed = breed;
  if (location) filter.location = location;
  if (age) filter.age = age;

  try {
    const pets = await Pet.find(filter);
    res.json(pets);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create a new pet (Admin only)
exports.createPet = async (req, res) => {
  const { name, age, breed, location, description, image } = req.body;
  try {
    const pet = new Pet({ name, age, breed, location, description, image });
    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Fetch a single pet by ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Handle adoption inquiry submission
exports.submitInquiry = async (req, res) => {
  const { petId } = req.params;
  const { name, email, message } = req.body;

  // Add your logic to save the inquiry to the database or send an email notification
  // (e.g., store the inquiry or send it to the admin)
  
  // For now, just send a success message
  res.json({ msg: 'Inquiry submitted successfully' });
};
