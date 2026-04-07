"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer"; // Ensure this is installed
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { usePosts } from "../../hooks/usePost";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MasonryGrid = dynamic(() => import("../../components/ui/MasonryGrid"), {
  ssr: false,
  loading: () => <SkeletonGrid />,
});

export default function HomePage() {
  const { ref, inView } = useInView();
  
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isError 
  } = usePosts();

  // Trigger next page load when the bottom div is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten the pages into a single array for the Masonry component
  // We use .data because your backend controller sends the posts inside a 'data' key
  const allPosts = data?.pages.flatMap((page) => page.data) || [];

  if (isError) return <div className="text-center py-10">Error loading posts.</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        
        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <>
            <MasonryGrid posts={allPosts} />
            
            {/* The Observer Sentinel */}
            <div ref={ref} className="h-32 flex flex-col items-center justify-center gap-2">
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <p className="text-xs text-gray-400">Loading more amazing content...</p>
                </>
              ) : hasNextPage ? (
                // Invisible trigger when not loading
                <div className="h-1 w-1" />
              ) : (
                <p className="text-gray-400 text-sm italic mt-4">
                  You've reached the end ✨
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Extracted Skeleton for reuse
function SkeletonGrid() {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {Array(10).fill(0).map((_, i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
}