import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const animeAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
