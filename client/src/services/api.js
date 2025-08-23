import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://192.168.1.21:3000/api",
  withCredentials: true,
});

export default API;
