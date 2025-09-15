import axios from "axios";
import { clearAuthData } from "../utils";
import { safeLocalStorage } from "../utils/localStorage";

export const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const isServer = typeof window === "undefined";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;

    if (!isServer) {
      token =
        JSON.parse(safeLocalStorage.getItem("barkToken")) ||
        JSON.parse(safeLocalStorage.getItem("registerTokens")) ||
        JSON.parse(safeLocalStorage.getItem("createRequestToken")) ||
        null;
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 && !isServer) {
      clearAuthData();
    }
    console.log(error, error?.response?.status, "error");
    return Promise.reject(error);
  }
);

export default axiosInstance;
