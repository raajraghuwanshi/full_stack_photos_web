"use client";

import Link from "next/link";

export default function PostCard({ post }) {
   
  return (
    <Link href={`/homepage/${post._id}`}>
    <div className="mb-2 break-inside-avoid rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <img
        src={post.imageUrl}
        alt="post"
        className="w-full object-cover rounded-xl"
      />
    </div>
    </Link>
  );
}