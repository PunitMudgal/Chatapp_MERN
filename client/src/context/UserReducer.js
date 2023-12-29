const UserReducer = (state, action) => {
  switch (action.type) {
    case "USER_DATA_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "USER_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "USER_DATA_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    // case "FRIEND_DATA_LOADING":
    //   return {
    //     ...state,
    // isLoading: true,
    //   };
    case "FRIEND_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        friendData: action.payload,
      };
    case "FRIEND_DATA_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
