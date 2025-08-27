import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ proxy to Vite
  withCredentials: true,
});

export default api;