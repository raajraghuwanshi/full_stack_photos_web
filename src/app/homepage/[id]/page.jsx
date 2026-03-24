"use client";

import { useParams } from "next/navigation";
import { usePost, useRelatedPosts } from "../../../hooks/usePost";
import dynamic from "next/dynamic";
// import DetailsPage from "../../../components/ui/DetailsPage";

const DetailsPage = dynamic(() => import("../../../components/ui/DetailsPage"), {
  ssr: false,
});


export default function SinglePostPage() {
  const { id } = useParams();
  const { data:post, isLoading } = usePost(id);
  const {data:relatedPosts, isLoading:relatedPostsLoading} = useRelatedPosts(id);


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