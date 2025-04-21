import { useNavigate } from "react-router-dom";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.navigate = useNavigate(); // Hook to navigate programmatically
  }

  greet() {
    const message = this.createChatBotMessage("Hello! How can I assist you today?", {
      widget: "options",
    });
    this.addMessageToState(message);
  }

  handleAppointment() {
    const message = this.createChatBotMessage(
      "Would you like to book an appointment? I can guide you to the booking page!",
      {
        widget: "appointmentOptions",
      }
    );
    this.addMessageToState(message);
  }

  handleProfile() {
    const message = this.createChatBotMessage(
      "I can help you access your profile and medical records. Do you want to go to your profile page?",
      {
        widget: "profileOptions",
      }
    );
    this.addMessageToState(message);
  }

  handleRegister() {
    const message = this.createChatBotMessage(
      "Need to register? I can take you to the registration page!",
      {
        widget: "registerOptions",
      }
    );
    this.addMessageToState(message);
  }

  handleLogin() {
    const message = this.createChatBotMessage(
      "Want to log in? I can guide you to the login page!",
      {
        widget: "loginOptions",
      }
    );
    this.addMessageToState(message);
  }

  handleHelp() {
    const message = this.createChatBotMessage(
      "Here are some things I can help with:",
      {
        widget: "helpOptions",
      }
    );
    this.addMessageToState(message);
  }

  handleDefault() {
    const message = this.createChatBotMessage(
      "I'm not sure how to help with that. Try saying 'help' to see what I can do!",
      {
        widget: "options",
      }
    );
    this.addMessageToState(message);
  }

  addMessageToState(message) {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;