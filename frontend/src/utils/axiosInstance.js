import axios from "axios";
import { BASE_URL } from "./apiPath.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 sec
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request intercepters
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// response intercepters
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/";
      } else if (error.response.status === "500") {
        console.error("Server Error");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request Timeout");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
