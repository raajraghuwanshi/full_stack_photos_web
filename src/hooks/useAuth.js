"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserdetails, loginUser, logoutUser, registerUser } from "../apis/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: async () => {
      toast.success("Account created successfully 🚀");

      const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
      document.cookie = `isloggedin=true; path=/; max-age=${maxAge}; Secure; SameSite=Lax`;

      try {
        // Fetch and cache user data
        await queryClient.fetchQuery({
          queryKey: ["user"],
          queryFn: () => getUserdetails()
        });

        router.push("/");
      } catch (err) {
        toast.error("Failed to load user details");
      }

    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};



// hooks/useAuth.js
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      toast.success("Login successful 🎉");

      // 1. Set the helper cookie for the middleware
      const maxAge = 7 * 24 * 60 * 60;
      document.cookie = `isloggedin=true; path=/; max-age=${maxAge}; Secure; SameSite=None`;

      // 2. Clear all old "401" errors from memory
      queryClient.clear();

      // 3. Instead of fetchQuery, just redirect. 
      // The Navbar/Profile will automatically trigger useUserDetails when the page loads.
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};

export const useUserDetails = (flags = { saved: false, created: false }) => {
  // Create a string for the URL: e.g., "?saved=true&created=true"
  const queryParams = new URLSearchParams();
  if (flags.saved) queryParams.append("saved", "true");
  if (flags.created) queryParams.append("created", "true");
  
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

  return useQuery({
    queryKey: ["user", flags], // React Query caches different versions separately
    queryFn: () => getUserdetails(queryString),
  });
};

export const useLogout = () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Logged out successfully");

      document.cookie = "isloggedin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";

      queryClient.removeQueries({ queryKey: ["userDetails"] });

      router.push("/login");
    }

  })
}
