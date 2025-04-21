import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../chatbot/config.jsx";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const chatbotVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0px 0px 10px rgba(59, 130, 246, 0.5)",
        "0px 0px 20px rgba(59, 130, 246, 0.7)",
        "0px 0px 10px rgba(59, 130, 246, 0.5)",
      ],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        variants={glowVariants}
        animate="animate"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chatbot Window */}
      {isOpen && (
        <motion.div
          className="absolute bottom-16 right-0 w-80 bg-white/10 backdrop-blur-md border border-blue-200/30 rounded-lg shadow-lg overflow-hidden"
          variants={chatbotVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ChatbotComponent;