const ADD_MESSAGE = "ADD_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";

const initialState = {
  messages: [],
  message: [],
};
const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
export const addMessage = (state:any, action:any):any => {
  return updateObject(state, {
    messages: [...state.messages, action.message],
  });
};
export const setMessages = (state:any, action:any):any => {
  return updateObject(state, {
    messages: action.messages.reverse(),
  });
};

const msgReducer: any = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return addMessage(state, action);
    case SET_MESSAGES:
      return setMessages(state, action);
    default:
      return state;
  }
};

export default msgReducer;
