class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowercase = message.toLowerCase();
  
      if (lowercase.includes("hello") || lowercase.includes("hi")) {
        this.actionProvider.greet();
      } else if (lowercase.includes("book") || lowercase.includes("appointment")) {
        this.actionProvider.handleAppointment();
      } else if (lowercase.includes("profile") || lowercase.includes("records")) {
        this.actionProvider.handleProfile();
      } else if (lowercase.includes("register") || lowercase.includes("signup")) {
        this.actionProvider.handleRegister();
      } else if (lowercase.includes("login") || lowercase.includes("signin")) {
        this.actionProvider.handleLogin();
      } else if (lowercase.includes("help") || lowercase.includes("faq")) {
        this.actionProvider.handleHelp();
      } else {
        this.actionProvider.handleDefault();
      }
    }
  }
  
  export default MessageParser;