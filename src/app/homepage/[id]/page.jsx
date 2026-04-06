"use client";

import { useParams } from "next/navigation";
import { usePost, useRelatedPosts } from "../../../hooks/usePost";
import dynamic from "next/dynamic";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
// import DetailsPage from "../../../components/ui/DetailsPage";

const DetailsPage = dynamic(() => import("../../../components/ui/DetailsPage"), {
  ssr: false,
  loading: () => (
      <div className="min-h-screen px-6 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <PostSkeleton />
        </div>
      </div>
    ),
});


export default function SinglePostPage() {
  const { id } = useParams();
  const { data:post, isLoading } = usePost(id);
  const {data:relatedPosts, isLoading:relatedPostsLoading} = useRelatedPosts(id);


  if (isLoading) {
    return (
      <div className="min-h-screen px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <PostSkeleton />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Post not found
      </div>
    );
  }

  return (
    <DetailsPage post={post} relatedPosts={relatedPosts} />
  );
}