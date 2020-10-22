const action = {
  type: "Test",
  payloadLoad: [
    {
      id: 2,
      name: "world best",
    },
  ],
};

export default function (state = {}, action) {
  switch (action.type) {
    case "Test":
      //   console.log("Test is working"); 
      return {
        ...state,
        name: "New world best",
      };
      break;
    default:
      return state;
      break;
  }
}
