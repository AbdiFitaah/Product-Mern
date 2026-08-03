import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const api = axios.create({
  baseURL: "https://product-mern-zc8c.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;