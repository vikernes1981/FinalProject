import express from 'express';
import mongoose from 'mongoose';
import botRoutes from './routes/botRoutes.js';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

const app = express();
const port = process.env.PORT ?? 5000;

// Middleware for parsing incoming JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up routes for Telegram webhook
app.use('/webhook', botRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
