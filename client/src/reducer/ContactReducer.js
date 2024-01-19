const ContactReducer = (action, state) => {
  switch (action.type) {
    case "SET_MENU_ITEM":
      return {
        ...state,
        isMenuItem: action.payload,
      };
    case "SET_CONVERSATION_LOADING":
      return {
        ...state,
        isContactLoading: true,
      };
    case "SET_CONVERSATION_SUCCESS":
      return {
        ...state,
        isContactLoading: false,
        conversation: action.payload,
      };
    case "SET_CONVERSATION_ERROR":
      return {
        ...state,
        isContactLoading: false,
        isContactError: action.payload,
      };

    default:
      return state;
  }
};
export default ContactReducer;
