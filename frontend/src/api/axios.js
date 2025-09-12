import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/auth", // match your backend PORT
  withCredentials: true, // send cookies
});

export default api;