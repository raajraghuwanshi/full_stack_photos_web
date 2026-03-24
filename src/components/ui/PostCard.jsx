"use client";

import Link from "next/link";
import Image from "next/image";

export default function PostCard({ post }) {
   
  return (
    <Link href={`/homepage/${post._id}`}>
    <div className="mb-2 break-inside-avoid rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all hover:scale-107 duration-300">
      <Image
        src={post.imageUrl}
        alt="post"
        width={400}
        height={400}
        priority
        className="w-full object-cover rounded-xl"
      />
    </div>
    </Link>
  );
}