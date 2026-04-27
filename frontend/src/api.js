import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend-r72q.onrender.com",
  baseURL: "http://localhost:5000",
  withCredentials: true
});

export default api;