"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://full-stack-backend-4ag5.onrender.com/api", // change if needed
  withCredentials: true,
});


// Optional global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;