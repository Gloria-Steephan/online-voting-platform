import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API BASE URL:", import.meta.env.VITE_API_URL);

// Attach token to every request (if exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle global errors (like token expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid / expired → logout user
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Force redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
