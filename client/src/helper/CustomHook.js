import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setLoading, setUser } from "../store/userSlice";
import { setContacts, setIsContactLoading } from "../store/contactSlice";

import { getDataFromToken } from "./helper";

export default function useFetchUserData(query) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Function to retrieve user ID from token
    const getUserIdFromToken = async () => {
      try {
        const { userId } = await getDataFromToken();
        return userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };

    const fetchData = async () => {
      if (!token) return; // Stop execution if no token is present

      query ? dispatch(setIsContactLoading(true)) : dispatch(setLoading(true));
      try {
        const userId = query ? query : await getUserIdFromToken();
        if (!userId) throw new Error("User ID not found");

        const endPoint = `/user/${userId}`;
        const { data, status } = await axios.get(endPoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (status === 200) {
          query ? dispatch(setContacts(data)) : dispatch(setUser(data));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        dispatch(setLoading(false));
        dispatch(setIsContactLoading(false));
      }
    };

    fetchData();
  }, [dispatch, token, query]);
}
