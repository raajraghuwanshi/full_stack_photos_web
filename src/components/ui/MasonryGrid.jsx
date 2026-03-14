"use client";

import Masonry from "react-masonry-css";
import PostCard from "./PostCard";

const breakpointColumnsObj = {
  default: 4,
  1536: 4,
  1280: 3,
  1024: 3,
  768: 2,
  500: 1,
};

export default function MasonryGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-center">No posts found</p>;
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full gap-4"
      columnClassName="flex flex-col gap-4"
    >
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </Masonry>
  );
}