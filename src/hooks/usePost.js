"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllPosts, createPost, getPostById, getReletatedPosts, likePost, savePost } from "../apis/post/postApi";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
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