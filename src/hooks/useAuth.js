"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserdetails, loginUser, logoutUser, registerUser } from "../apis/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Account created successfully 🚀");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};



export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: async () => {
      toast.success("Login successful 🎉");

      try {
        // Fetch and cache user data
        await queryClient.fetchQuery({
          queryKey: ["userDetails"],
          queryFn: getUserdetails,
        });

        router.push("/");
      } catch (err) {
        toast.error("Failed to load user details");
      }
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserdetails,
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to fetch user details");
    }

  })
}

export const useLogout = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey : ["logout"],
    mutationFn: logoutUser,
    onSuccess: (data)=>{
      toast.success("Logged out successfully");
      queryClient.removeQueries({ queryKey: ["userDetails"] });
    }

  })
}
  