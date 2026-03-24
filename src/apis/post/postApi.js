import axiosInstance from "../../lib/AxiosInstance";

export const getAllPosts = async () => {
  const res = await axiosInstance.get("/posts");
  return res.data.data;
};

export const createPost = async (formData) => {
  const res = await axiosInstance.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

export const getPostById = async (id) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data.data;
};

export const getReletatedPosts = async(id) =>{
  const res = await axiosInstance.get(`/posts/related/${id}`)
  return res.data.relatedPosts;
}

export const likePost = async(id)=>{
  const res = await axiosInstance.put(`/posts/like/${id}`)
  return res.data.data;
}


export const  savePost = async(id)=>{
  const res = await axiosInstance.post(`/posts/save/${id}`)
  return res.data.data;
}