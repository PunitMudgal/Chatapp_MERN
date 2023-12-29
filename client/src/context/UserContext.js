import { createContext, useContext, useEffect, useReducer } from "react";
import { getDataFromToken } from "../helper/helper";
import axios from "axios";
import reducer from "./UserReducer";

const UserContext = createContext();
const initialState = {
  isError: null,
  isLoading: false,
  user: null,
  friendData: null,
  searchFriendHistory: [],
  contacts: [],
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");

  // fetches user's data after login
  const fetchUserData = async () => {
    try {
      dispatch({ type: "USER_DATA_LOADING" });
      const { userId } = await getDataFromToken();
      const { data, status } = await axios.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 201) {
        dispatch({ type: "USER_DATA_SUCCESS", payload: data });
        console.log("user data", data);
      }
    } catch (error) {
      dispatch({ type: "USER_DATA_ERROR", payload: error });
    }
  };

  // for fetching friend's profile data
  const fetchFriendData = async (query) => {
    console.log("fetch friend called");

    try {
      dispatch({ type: "FRIEND_DATA_LOADING" });
      const { data, status } = await axios.get(`/user/${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (status === 201) {
        dispatch({ type: "FRIEND_DATA_SUCCESS", payload: data });
        console.log("friend data", data);
      }
    } catch (error) {
      dispatch({ type: "FRIEND_DATA_ERROR", payload: error });
    }
  };

  useEffect(() => {
    fetchUserData();
    console.log("useEffect called");
  }, [token]);
  return (
    <UserContext.Provider value={{ ...state, fetchFriendData, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

function UseUserContext() {
  return useContext(UserContext);
}
export { UserProvider, UseUserContext };
