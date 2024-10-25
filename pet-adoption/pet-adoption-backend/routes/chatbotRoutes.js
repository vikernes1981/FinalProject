import express from 'express';
import { handleMessage } from '../controllers/chatbotController.js';

const router = express.Router();

// Route to handle Telegram webhook requests
router.post('/telegram', handleMessage);

export default router;
