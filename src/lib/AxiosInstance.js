"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://full-stack-backend-4ag5.onrender.com/api", // change if needed
  withCredentials: true,
});

// Attach token automatically
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

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