import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import { getAdoptionAnswer } from './answers.js'; // Import the answers function

dotenv.config();

const { TOKEN, TELEGRAM_WEBHOOK_URL, WIT_AI_ACCESS_TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = TELEGRAM_WEBHOOK_URL + URI;

const app = express();
app.use(bodyParser.json());

const init = async () => {
  await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
};

// Function to get response from Wit.ai
const getWitResponse = async (text) => {
  try {
    const response = await axios.get(`https://api.wit.ai/message?v=20241024&q=${encodeURIComponent(text)}`, {
      headers: {
        Authorization: `Bearer ${WIT_AI_ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error with Wit.ai API:", error);
    return null; // Return null if there's an error
  }
};

app.post(URI, async (req, res) => {
  const chatId = req.body.message?.chat.id;
  const text = req.body.message?.text;

  // Send "ok" response to Telegram
  res.status(200).send("ok");

  // Get Wit.ai's response
  const witResponse = await getWitResponse(text);
  
  // Check if Wit.ai returned a response
  if (witResponse && witResponse.intents && witResponse.intents.length > 0) {
    const intent = witResponse.intents[0].name;
    console.log("Detected intent:", intent); // Debugging output

    // Respond based on the intent detected
    if (intent === "adoption_proccess") {
      const answer = getAdoptionAnswer(); // Get a random answer for adoption process
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: answer,
      });
    } else if (intent === "answers_greetings") {
      const responses = [
        "Hello! I'm here to help you with pet adoption. How can I assist you today?",
        "Hi there! What can I do for you regarding pet adoption?",
        "Greetings! How can I help you with your pet adoption inquiries?",
        "Hello!",
        "Hi there.",
        "Good day",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: randomResponse,
      });
    } else {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: "I'm sorry, I didn't understand that. Can you ask something else?",
      });
    }
  } else {
    // If no intent was found
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: "I'm sorry, I didn't understand that. Can you ask something else?",
    });
  }
});

app.listen(process.env.PORT || 5000, async () => {
  console.log("🚀 app running on port", process.env.PORT || 5000);
  await init();
});
