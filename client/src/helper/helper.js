// import jwt_decode from jwt-decode;
import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL;
axios.defaults.baseURL = "http://localhost:8080";

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
