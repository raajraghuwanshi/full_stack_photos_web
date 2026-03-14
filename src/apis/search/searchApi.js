import axiosInstance from "../../lib/AxiosInstance";

export const searchApi = async (query) => {
  
  const res = await axiosInstance.get(`/search/posts?q=${query}`);
  return res.data.data;
};
