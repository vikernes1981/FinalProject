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
