"use client";

import { useParams } from "next/navigation";
import { usePost, useRelatedPosts } from "../../../hooks/usePost";
import DetailsPage from "../../../components/ui/DetailsPage";

export default function SinglePostPage() {
  const { id } = useParams();
  const { data:post, isLoading } = usePost(id);
  const {data:relatedPosts, isLoading:relatedPostsLoading} = useRelatedPosts(id);
  console.log("Post data in SinglePostPage:", post); // Debug log
  console.log("Related posts data in SinglePostPage:", relatedPosts); // Debug log

  if (isLoading || relatedPostsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
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