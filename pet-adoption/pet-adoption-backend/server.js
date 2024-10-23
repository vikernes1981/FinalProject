const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const petRoutes = require('./routes/petRoutes');
const adoptionRoutes = require('./routes/adoptionRoutes');
const postRequestRoutes = require('./routes/postRequestRoutes');
const authRoutes = require('./routes/authRoutes');
//const inquiryRoutes = require('./routes/inquiryRoutes');



const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
}));


dotenv.config();
app.use(express.json());
app.use('/api/pets', petRoutes);
//app.use('/api/pets', inquiryRoutes);
app.use('/admin', adoptionRoutes);
app.use('/admin', authRoutes);
app.use('/api', authRoutes); // Add auth routes
app.use('/api/adoption-requests', postRequestRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(5000, () => console.log('Server running on port 5000'));
