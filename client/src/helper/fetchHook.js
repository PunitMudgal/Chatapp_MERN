import axios from "axios";
import { getDataFromToken } from "./helper";
import { useEffect, useState } from "react";

// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:8080";

export default async function useFetch(query) {
  const token = localStorage.getItem("token");

  const [getData, setData] = useState({
    isLoading: false,
    status: null,
    serverError: null,
  });
  console.log("fetch hook called");
  const fetchData = async () => {
    try {
      setData((prev) => ({ ...prev, isLoading: true }));

      if (!query) {
        const { userId } = await getDataFromToken();
        const { data, status } = await axios.get(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false, status }));
          //todo
          console.log("data inside constum hook", data);
        }
      }
      // for friend data fetching
      else {
        const { data, status } = await axios.get(`/user/${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (status === 201) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            status,
          }));
          // todo
        }
      }

      setData((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        isLoading: false,
        serverError: error,
      }));
    }
  };

  // useEffect for calling the above function
  useEffect(() => {
    fetchData();
  }, [token, query]);
  return [getData, setData];
}
