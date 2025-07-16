import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../chatbot/config.jsx";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import { Stethoscope, X, MessageSquare, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const chatbotVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      x: 50, 
      y: 50,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.4, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      x: 50, 
      y: 50,
      filter: "blur(4px)",
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      } 
    },
  };

  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: "0px 0px 12px rgba(20, 184, 166, 0.6)"
    },
    animate: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0px 0px 12px rgba(20, 184, 166, 0.6)",
        "0px 0px 20px rgba(20, 184, 166, 0.8)",
        "0px 0px 12px rgba(20, 184, 166, 0.6)",
      ],
      transition: { 
        repeat: Infinity, 
        duration: 2.5, 
        ease: "easeInOut" 
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 24px rgba(20, 184, 166, 0.9)",
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Inter',sans-serif]">
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={toggleChatbot}
        className={`relative bg-gradient-to-br from-teal-500 to-blue-600 text-white p-4 rounded-full shadow-xl ${isOpen ? 'rotate-90' : ''}`}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-tooltip-id="chatbot-tooltip"
        data-tooltip-content="Talk to VitalixCare Assistant"
      >
        {isOpen ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <Stethoscope size={24} className="transition-transform duration-300" />
        )}
        
        {/* Floating notification dot */}
        <AnimatePresence>
          {isHovered && (
            <motion.span 
              className="absolute -top-1 -right-1 bg-white text-teal-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Bot size={12} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      
      <Tooltip 
        id="chatbot-tooltip" 
        place="top" 
        className="!bg-teal-800 !text-white !rounded-lg !px-3 !py-2 !text-sm !font-medium !shadow-lg" 
        noArrow
      />

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 md:w-96 bg-gradient-to-br from-teal-600/90 to-blue-600/90 backdrop-blur-md border border-teal-200/30 rounded-xl shadow-2xl overflow-hidden"
            variants={chatbotVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              backgroundImage: `
                radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 0.2) 0px, transparent 50%),
                radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.1) 0px, transparent 50%)
              `,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-700/90 to-blue-700/90 text-white border-b border-teal-200/20">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-white/10 rounded-full">
                  <Bot size={20} className="text-teal-200" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">VitalixCare Assistant</h3>
              </div>
              <button 
                onClick={toggleChatbot} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-white/80 hover:text-white" />
              </button>
            </div>
            
            <div className="p-4 bg-white/5 border-t border-teal-200/10 rounded-b-xl h-[400px]">
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
            
            {/* Footer with subtle branding */}
            <div className="text-center text-xs text-white/50 p-2 bg-gradient-to-t from-teal-800/30 to-transparent">
              Powered by <span className="font-medium text-white/70">VitalixCare AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotComponent;