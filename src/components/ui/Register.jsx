"use client";

import { useState, useRef } from "react";
import { useRegister } from "@/hooks/useAuth";
import Link from "next/link";
import { Camera } from "lucide-react"; // Optional: Install lucide-react for icons

export default function RegisterPage() {
  const { mutate, isPending } = useRegister();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, profileImage: file });
      setPreview(URL.createObjectURL(file)); // Creates a temporary local URL for the preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // IMPORTANT: When sending files, use FormData instead of a JSON object
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    if (form.profileImage) {
      formData.append("image", form.profileImage);
    }

    mutate(formData);
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
  >
    <div className="text-center space-y-1">
      <h2 className="text-2xl font-bold">Create Account</h2>
      <p className="text-gray-500 text-sm">
        Join Photobooth and share your moments
      </p>
    </div>

    {/* Profile Image */}
    <div className="flex flex-col items-center space-y-3">
      <div
        onClick={() => fileInputRef.current.click()}
        className="relative w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden hover:border-black transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <Camera className="text-gray-400 w-8 h-8" />
        )}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="text-sm text-blue-600 hover:underline"
      >
        Upload Profile Picture
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
    </div>

    {/* Inputs */}
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email Address"
        className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Create Password"
        className="w-full border p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
        required
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
    </div>

    {/* Button */}
    <button
      type="submit"
      disabled={isPending}
      className="w-full bg-black text-white py-2 rounded-md hover:opacity-80 disabled:opacity-50"
    >
      {isPending ? "Creating Account..." : "Create Account"}
    </button>

    {/* Footer */}
    <p className="text-center text-sm">
      Already have an account?{" "}
      <Link href="/login" className="text-blue-600">
        Login
      </Link>
    </p>
  </form>
</div>
  );
}