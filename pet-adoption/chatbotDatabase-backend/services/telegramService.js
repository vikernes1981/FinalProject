import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env


const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;
console.log('Telegram api:', TELEGRAM_API_URL); // Add this line

// Send a message via Telegram bot
export const sendMessage = async (chatId, text) => {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    try {
        await axios.post(url, {
            chat_id: chatId,
            text: text,
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
