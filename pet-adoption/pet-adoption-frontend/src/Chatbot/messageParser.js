class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      if (message.includes("adopt")) {
        this.actionProvider.handleAdoptionInquiry();
      }
    }
  }
  
  export default MessageParser;
  