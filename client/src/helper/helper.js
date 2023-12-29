import axios from "axios";
import { jwtDecode } from "jwt-decode";

// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:8080";

export async function getDataFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("token not found!");
  let decode = await jwtDecode(token);
  return decode;
}

// REGISTER USER
export async function registerUser(userData) {
  try {
    const { data } = await axios.post(`/auth/register`, userData);
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

// LOGIN
export async function loginUser({ email, password }) {
  try {
    const { data } = await axios.post("/auth/login", { email, password });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

// DELETE ACCOUNT PERMANENTLY
export async function deleteUserAccount(userData) {
  try {
    await axios.delete(`/auth/delete_account`, userData);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject({ error });
  }
}

// SEARCH USER
export async function searchUser(userId) {
  try {
    const searchResult = await axios.get(`/user/search/${userId}`);
    return searchResult;
  } catch (error) {
    return Promise.reject(error);
  }
}

// EDIT USER DATA
export async function editUserData(userData) {
  const token = localStorage.getItem("token");
  try {
    const updatedResult = await axios.patch(`/user/updateUser`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve({ updatedResult });
  } catch (error) {
    return Promise.reject(error);
  }
}
