"use client";

import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { usePosts } from "../../hooks/usePost";
// import MasonryGrid from "../../components/ui/MasonryGrid";
import dynamic from "next/dynamic";

const MasonryGrid = dynamic(() => import("../../components/ui/MasonryGrid"), {
  ssr: false,
  loading: () => (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <PostSkeleton key={i} />
        ))}
    </div>
  ),
});


export default function HomePage() {
  const { data: posts, isLoading } = usePosts();
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


  return (
     <div className="min-h-screen bg-gray-100 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <PostSkeleton key={i} />
              ))}
          </div>
        ) : (
          <MasonryGrid posts={posts} />
        )}
      </div>
    </div>
  );
}