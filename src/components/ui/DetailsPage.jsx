import React from 'react'
import PostDetailPage from './PostDetailPage';
import PostCard from './PostCard';

const DetailsPage = ({post , relatedPosts}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      
     <PostDetailPage post={post}/>

      {/* 🔥 Related Posts Section */}
      {relatedPosts?.length > 0 && (
        <div className="max-w-4xl w-full mt-10">
          <h2 className="text-xl font-semibold mb-4">
            🔥 Related Posts
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {relatedPosts.map((item) => (
              <PostCard key={item._id} post={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage