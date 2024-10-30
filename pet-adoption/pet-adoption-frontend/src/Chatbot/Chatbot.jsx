import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import ActionProvider from "./actionProvider";
import MessageParser from "./messageParser";

const ChatbotComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showChatbot ? (
        <div className="relative w-72 h-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          <button
            className="absolute top-2 right-2 bg-green-500 text-white p-1 text-xs rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShowChatbot(!showChatbot)}
          >
            X
          </button>
          <div className="flex-grow overflow-y-auto mt-6">
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          </div>
        </div>
      ) : (
        <button
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowChatbot(!showChatbot)}
        >
          💬 Chat with us 🐾
        </button>
      )}
    </div>
  );
};

export default ChatbotComponent;
