const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
}));


dotenv.config();
app.use(express.json());
app.use('/api/pets', petRoutes);
app.use('/admin', adoptionRoutes);
app.use('/admin', authRoutes);
app.use('/api', authRoutes); // Add auth routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));
