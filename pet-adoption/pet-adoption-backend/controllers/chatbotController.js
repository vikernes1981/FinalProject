import { sendMessage } from '../services/telegramService.js';
import dbService from '../services/dbService.js';

export const handleMessage = async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.sendStatus(400);
    }

    const chatId = message.chat.id;
    const text = message.text;

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

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
