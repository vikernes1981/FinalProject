// telegramService.jsx
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Ensure the backend is reachable

export const sendMessageToBot = async (chatId, message) => {
  try {
    const response = await axios.post(`${backendUrl}/api/sendMessage`, {
      chatId,
      text: message,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message to bot:', error);
    throw error;
  }
};
