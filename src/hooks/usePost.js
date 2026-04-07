"use client";

import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts, createPost, getPostById, getReletatedPosts, likePost, savePost, deletePost } from "../apis/post/postApi";
import toast from "react-hot-toast";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    queryFn: getAllPosts,
    initialPageParam: 1,
    
    // This tells React Query how to get the next page
    // 'lastPage' is the response from your controller
    getNextPageParam: (lastPage) => {
      // If nextPage is null (from your service logic), returning undefined stops the scroll
      return lastPage.nextPage ?? undefined;
    },

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
       queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};


export const usePost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const data = await getPostById(id);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRelatedPosts = (id) => {
  return useQuery({
    queryKey: ["relatedPosts", id],
    queryFn: async () => {
      const data = await getReletatedPosts(id);
      return data;
    },
    enabled: !!id,
  });
}

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: savePost,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    }
  });
};


export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      toast.success("Post removed");
      // This refreshes the Profile data so the post disappears instantly
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({queryKey: ["posts"]})
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Could not delete post");
    }
  });
};