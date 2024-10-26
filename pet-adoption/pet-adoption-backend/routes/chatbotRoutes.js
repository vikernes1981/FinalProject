import express from 'express';
import { handleTelegramMessage } from '../controllers/chatbotController.js';

const router = express.Router();

router.post('/telegram', handleTelegramMessage);

export default router;
