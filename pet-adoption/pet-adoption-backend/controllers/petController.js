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
    console.error('Error fetching pets:', err);
    res.status(500).send('Server Error');
  }
};

// Create a new pet (Admin only)
exports.createPet = async (req, res) => {
  const { name, age, breed, type, description, image } = req.body;
  console.log('Creating pet with data:', req.body);
  try {
    const pet = new Pet({ name, age, breed, type, description, image });
    await pet.save();
    res.json(pet);
  } catch (err) {
    console.error('Error creating pet:', err);
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
    console.error('Error fetching pet by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a pet by ID (Admin only)
exports.updatePet = async (req, res) => {
  const { id } = req.params;
  const { name, age, breed, location, description, image } = req.body;
  console.log('Updating pet with ID:', id, 'and data:', req.body);

  try {
    const pet = await Pet.findByIdAndUpdate(
      id,
      { name, age, breed, location, description, image },
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json(pet);
  } catch (err) {
    console.error('Error updating pet:', err);
    res.status(500).send('Server Error');
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