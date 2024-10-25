import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./messageParser";
import ActionProvider from "./actionProvider";

const ChatbotComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        💬 Chat with us 🐾
      </button>
      {showChatbot && (
        <div className="w-50 h-97 bg-white border border-gray-300 rounded-lg shadow-lg mt-4 flex flex-col">
          <div className="flex-grow overflow-y-auto">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
