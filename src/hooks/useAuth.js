"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserdetails, loginUser,registerUser } from "../apis/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login successful 🎉");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useUserDetails = ()=>{
  return useQuery({
    queryKey:["userDetails"],
    queryFn:getUserdetails,
    onError:(error)=>{
      toast.error(error.response?.data?.message || "Failed to fetch user details");
    }

  })
}

