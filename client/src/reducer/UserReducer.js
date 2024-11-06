const UserReducer = (state, action) => {
  switch (action.type) {
    case "USER_DATA_LOADING":
      return {
        ...state,
        isUserDataLoading: true,
      };
    case "USER_DATA_SUCCESS":
      return {
        ...state,
        isUserDataLoading: false,
        user: action.payload,
      };
    case "USER_DATA_ERROR":
      return {
        ...state,
        isUserDataLoading: false,
        isUserDataError: action.payload,
      };
    case "FRIEND_DATA_SUCCESS":
      return {
        ...state,
        friendData: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
