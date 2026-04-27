import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend-r72q.onrender.com/api",
  withCredentials: true
});

export default api;