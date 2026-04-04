import axiosInstance from "../../lib/AxiosInstance";

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/api/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/api/login", data);
  return res.data;
};

export const getUserdetails = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const logoutUser = async ()=>{
  const res = await axiosInstance.post("/api/logout");
  return res.data;
}