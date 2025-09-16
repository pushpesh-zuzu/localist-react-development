import axios from "axios";
import { clearAuthData } from "../utils";
export const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
  JSON.parse(localStorage.getItem("barkToken")) ||
  JSON.parse(localStorage.getItem("registerTokens")) ||
  JSON.parse(localStorage.getItem("createRequestToken")) ||
  null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthData();
      // window.location.reload();
    }
    console.log(error, error?.response?.status, "error");
    return Promise.reject(error);
  }
);

export default axiosInstance;
