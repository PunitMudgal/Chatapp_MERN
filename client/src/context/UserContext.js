import { createContext, useContext, useEffect, useReducer } from "react";
import { getDataFromToken } from "../helper/helper";
import axios from "axios";
import reducer from "../reducer/UserReducer";

const UserContext = createContext();
const initialState = {
  isUserDataError: null,
  isUserDataLoading: false,
  user: [],
  friendData: null,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = localStorage.getItem("token");

  //? fetches user's data after login
  // const fetchUserData = async () => {
  //   console.log("fetchUser called");
  //   try {
  //     dispatch({ type: "USER_DATA_LOADING" });
  //     const { userId } = await getDataFromToken();
  //     console.log(userId);
  //     const { data, status } = await axios.get(`/user/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     if (status === 201) {
  //       dispatch({ type: "USER_DATA_SUCCESS", payload: data });
  //     }
  //   } catch (error) {
  //     dispatch({ type: "USER_DATA_ERROR", payload: error });
  //   }
  // };

  //? for fetching friend's profile data
  // const fetchFriendData = async (query) => {
  //   console.log("fetch friend called");

  //   try {
  //     // dispatch({ type: "FRIEND_DATA_LOADING" });
  //     const { data } = await axios.get(`/user/${query}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return Promise.resolve(data);
  //     // if (status === 201) {
  //     //   dispatch({ type: "FRIEND_DATA_SUCCESS", payload: data });
  //     //   console.log("friend data", data);
  //     // }
  //   } catch (error) {
  //     // dispatch({ type: "FRIEND_DATA_ERROR", payload: error });
  //     return Promise.reject();
  //   }
  // };

  /** new methpd */
  function FetchHook(query) {
    useEffect(() => {
      console.log("useEffect called");

      const fetchData = async () => {
        try {
          dispatch({ type: "USER_DATA_LOADING" });

          const endPoint = query
            ? `/user/${query}`
            : `/user/${await getUserIdFromToken()}`;
          const { data, status } = await axios.get(endPoint, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (status === 201) {
            {
              !query
                ? dispatch({ type: "USER_DATA_SUCCESS", payload: data })
                : dispatch({ type: "FRIEND_DATA_SUCCESS", payload: data });
            }
          }
        } catch (error) {
          {
            !query
              ? dispatch({ type: "USER_DATA_ERROR", payload: error })
              : console.log(error);
          }
        }
      };
      token && fetchData();
    }, [token, query, dispatch]);

    const getUserIdFromToken = async () => {
      const { userId } = await getDataFromToken();
      return userId;
    };
  }
  return (
    <UserContext.Provider value={{ ...state, FetchHook }}>
      {children}
    </UserContext.Provider>
  );
};

function UseUserContext() {
  return useContext(UserContext);
}
export { UserProvider, UseUserContext };
