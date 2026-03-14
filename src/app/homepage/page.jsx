"use client";

import { usePosts } from "../../hooks/usePost";
import MasonryGrid from "../../components/ui/MasonryGrid";


export default function HomePage() {
  const { data: posts, isLoading } = usePosts();


  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <MasonryGrid posts={posts} />
      </div>
    </div>
  );
}