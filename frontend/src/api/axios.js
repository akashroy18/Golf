import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://golf-backend-d2hg.onrender.com",
  withCredentials: true,
});

export default API;
