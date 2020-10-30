const ADD_MESSAGE = "ADD_MESSAGE";
export const SET_MESSAGES = "SET_MESSAGES";

export const addMessage = (message) => {
  console.log(message)
  return {
    type: ADD_MESSAGE,
    message: message,
  };
};

export const setMessages = (messages) => {
  console.log(messages)
  return {
    type: SET_MESSAGES,
    messages: messages,
  };
};
