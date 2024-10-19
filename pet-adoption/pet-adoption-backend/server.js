const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User');
const Pet = require('./models/Pet');
const AdoptionRequest = require('./models/AdoptionRequest');
const cors = require('cors');
const app = express();

app.use(cors());

dotenv.config();
app.use(express.json());
app.use('/api/pets', petRoutes);
app.use('/admin', adoptionRoutes);
app.use('/admin', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));
const createDummyData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Pet.deleteMany({});
    await AdoptionRequest.deleteMany({});

    // Create users
    const user1 = new User({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'User'
    });

    const user2 = new User({
      username: 'admin_user',
      email: 'admin@example.com',
      password: 'adminpassword',
      role: 'Admin'
    });

    await user1.save();
    await user2.save();

    // Create pets
    const pet1 = new Pet({
      name: 'Buddy',
      age: 3,
      breed: 'Golden Retriever',
      type: 'Dog',
      description: 'Friendly and energetic',
      image: 'https://example.com/buddy.jpg'
    });

    const pet2 = new Pet({
      name: 'Whiskers',
      age: 2,
      breed: 'Siamese',
      type: 'Cat',
      description: 'Calm and affectionate',
      image: 'https://example.com/whiskers.jpg'
    });

    await pet1.save();
    await pet2.save();

    // Create adoption requests
    const adoptionRequest1 = new AdoptionRequest({
      user: user1._id,
      pet: pet1._id,
      message: 'I would love to adopt Buddy!',
      status: 'Pending'
    });

    await adoptionRequest1.save();

    console.log('Dummy data created successfully');
  } catch (err) {
    console.error('Error creating dummy data:', err);
  }
};

createDummyData();