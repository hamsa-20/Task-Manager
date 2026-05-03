import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend-r72q.onrender.com"
});

// attach userId to every request
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    config.headers.userid = userId;
  }
  return config;
});

export default api;