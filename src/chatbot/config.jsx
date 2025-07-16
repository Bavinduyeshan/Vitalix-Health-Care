import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./widgets/Options.jsx";
import AppointmentOptions from "./widgets/AppointmentOptions.jsx";
import ProfileOptions from "./widgets/ProfileOptions.jsx";
import RegisterOptions from "./widgets/RegisterOptions.jsx";
import LoginOptions from "./widgets/LoginOptions.jsx";
import HelpOptions from "./widgets/HelpOptions.jsx";




const config = {
  botName: "HealthBot",
  initialMessages: [
    createChatBotMessage(
      "Hello! I'm HealthBot, your assistant for Unity Health Care. How can I help you today?",
      { widget: "options" }
    ),
  ],
  customStyles: {
    // Chat container background transparent dark
    chatContainer: {
      backgroundColor: "rgba(15, 23, 42, 0.85)", // dark slate blue, semi-transparent
      color: "#f9fafb", // light text
      fontFamily: "'Inter', sans-serif",
    },
    botMessageBox: {
      backgroundColor: "#2563eb", // bright blue for bot messages
      color: "#fff",
      fontWeight: "500",
    },
    userMessageBox: {
      backgroundColor: "#1e40af", // darker blue for user messages
      color: "#e0e7ff",
      fontWeight: "500",
    },
    chatButton: {
      backgroundColor: "#4ade80", // teal-green send button to pop
      color: "#1f2937",
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      minWidth: "36px",
      boxShadow: "0 2px 8px rgba(74, 222, 128, 0.6)",
      transition: "background-color 0.3s ease",
    },
    chatInputContainer: {
      backgroundColor: "rgba(31, 41, 55, 0.9)", // dark gray-blue input container
      borderTop: "1px solid #374151", // subtle border
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      borderRadius: "0 0 12px 12px",
    },
    chatInput: {
      backgroundColor: "rgba(55, 65, 81, 0.8)", // input background darker
      color: "#f3f4f6", // light input text
      border: "none",
      borderRadius: "24px",
      padding: "10px 16px",
      fontSize: "15px",
      flex: 1,
      outline: "none",
      boxShadow: "inset 0 0 6px rgba(255,255,255,0.1)",
      transition: "box-shadow 0.2s ease",
    },
  },
  widgets: [
    { widgetName: "options", widgetFunc: (props) => <Options {...props} /> },
    {
      widgetName: "appointmentOptions",
      widgetFunc: (props) => <AppointmentOptions {...props} />,
    },
    { widgetName: "profileOptions", widgetFunc: (props) => <ProfileOptions {...props} /> },
    { widgetName: "registerOptions", widgetFunc: (props) => <RegisterOptions {...props} /> },
    { widgetName: "loginOptions", widgetFunc: (props) => <LoginOptions {...props} /> },
    { widgetName: "helpOptions", widgetFunc: (props) => <HelpOptions {...props} /> },
  ],
};

export default config;
