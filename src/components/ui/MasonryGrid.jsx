"use client";

import PostCard from "./PostCard";

export default function MasonryGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-center">No posts found</p>;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {posts.map((post) => (
        <div key={post._id} className="mb-4 break-inside-avoid">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}