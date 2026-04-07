import axiosInstance from "../../lib/AxiosInstance";

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const getUserdetails = async (params = "") => {
  // params will look like "?saved=true" or "?saved=true&created=true"
  const res = await axiosInstance.get(`/auth/me${params}`);
  return res.data;
};

export const logoutUser = async ()=>{
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
}