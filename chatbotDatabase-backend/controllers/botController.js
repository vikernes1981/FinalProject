// controllers/botController.js
import { sendMessage } from '../services/telegramService.js';
import dbService from '../services/dbService.js';

// Function to handle incoming Telegram messages
export const handleMessage = async (req, res) => {
    try {
        console.log('Incoming request:', req.body); // Log the incoming request
        const message = req.body?.message;

        if (!message) {
            return res.sendStatus(400); // Bad Request if message is not found
        }

        const chatId = message.chat.id;
        const text = message.text;

        // Handle different messages
        if (text === '/start') {
            const user = await dbService.registerUser(chatId);
            await sendMessage(chatId, `Welcome to the bot, ${user?.name ?? 'user'}!`);
        } else if (text === '/profile') {
            const user = await dbService.getUserByTelegramId(chatId);
            const name = user?.name ?? 'unknown';
            const age = user?.age ?? 'not set';
            
            await sendMessage(chatId, `Your profile: Name - ${name}, Age - ${age}`);
        } else if (text === 'hi' || text === 'hey') {
            await sendMessage(chatId, 'Hello! How can I assist you today?');
        } else {
            await sendMessage(chatId, 'Sorry, I did not understand that. Can you please try again?');
        }

        // Acknowledge receipt of the message
        res.sendStatus(200);
    } catch (error) {
        console.error('Error handling message:', error);
        res.sendStatus(500); // Internal Server Error
    }
};
