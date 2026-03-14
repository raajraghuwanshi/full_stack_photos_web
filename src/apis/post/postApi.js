import axiosInstance from "../../lib/AxiosInstance";

export const getAllPosts = async () => {
  const res = await axiosInstance.get("/posts");
  console.log("Fetched posts:", res.data.data); // Debug log
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
  console.log("Fetched post by ID:", res.data.data); // Debug log
  return res.data.data;
};

export const getReletatedPosts = async(id) =>{
  const res = await axiosInstance.get(`/posts/related/${id}`)
  console.log("Fetched related posts in api :", res.data.relatedPosts); // Debug log
  return res.data.relatedPosts;
}

export const likePost = async(id)=>{
  const res = await axiosInstance.put(`/posts/like/${id}`)
  console.log("Liked post response:", res.data); // Debug log
  return res.data.data;
}


export const  savePost = async(id)=>{
  const res = await axiosInstance.post(`/posts/save/${id}`)
  console.log("saved post response:", res.data); // Debug log
  return res.data.data;
}