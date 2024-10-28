import { createChatBotMessage } from "react-chatbot-kit";

const initialMessages = [
  createChatBotMessage("Hello! How can I help you today?"),
  // createChatBotMessage("Hi there! What questions do you have about pet adoption?"),
  // createChatBotMessage("Greetings! Let me know how I can assist you with pets."),
];

const config = {
  initialMessages: initialMessages,
  botName: "PetBot",
};

export default config;
