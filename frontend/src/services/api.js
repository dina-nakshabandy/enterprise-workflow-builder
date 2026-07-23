import axios from "axios";

const apiBaseUrl =
  window.APP_CONFIG?.API_URL ||
  "http://localhost:5001/api";

const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;