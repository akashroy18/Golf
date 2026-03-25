import axios from "axios";

const API = axios.create({
  baseURL: "https://golf-backend-d2hg.onrender.com",
  withCredentials: true,
});

export default API;
