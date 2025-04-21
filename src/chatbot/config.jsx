import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./widgets/Options.jsx"; // Updated extension
import AppointmentOptions from "./widgets/AppointmentOptions.jsx"; // Updated extension
import ProfileOptions from "./widgets/ProfileOptions.jsx"; // Updated extension
import RegisterOptions from "./widgets/RegisterOptions.jsx"; // Updated extension
import LoginOptions from "./widgets/LoginOptions.jsx"; // Updated extension
import HelpOptions from "./widgets/HelpOptions.jsx"; // Updated extension

const config = {
  botName: "HealthBot",
  initialMessages: [
    createChatBotMessage("Hello! I'm HealthBot, your assistant for Unity Health Care. How can I help you today?", {
      widget: "options",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#3B82F6", // Blue background for bot messages
    },
    chatButton: {
      backgroundColor: "#3B82F6", // Blue chat button
    },
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "appointmentOptions",
      widgetFunc: (props) => <AppointmentOptions {...props} />,
    },
    {
      widgetName: "profileOptions",
      widgetFunc: (props) => <ProfileOptions {...props} />,
    },
    {
      widgetName: "registerOptions",
      widgetFunc: (props) => <RegisterOptions {...props} />,
    },
    {
      widgetName: "loginOptions",
      widgetFunc: (props) => <LoginOptions {...props} />,
    },
    {
      widgetName: "helpOptions",
      widgetFunc: (props) => <HelpOptions {...props} />,
    },
  ],
};

export default config;