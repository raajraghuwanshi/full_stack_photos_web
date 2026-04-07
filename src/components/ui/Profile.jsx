'use client'

import React, { useState } from 'react'
import { User, Grid, Bookmark, Trash2, Loader2 } from "lucide-react"
import { useUserDetails } from '../../hooks/useAuth'
import { useDeletePost } from '../../hooks/usePost' // Ensure this hook is created
import PostCard from './PostCard'


const Profile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  
  // Fetching user data (Created and Saved posts)
  const { data, isLoading } = useUserDetails({ saved: true, created: true });
  
  // Hook for deleting posts
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        <p className="text-sm text-gray-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  const user = data?.data?.user;
  const savedPosts = data?.data?.savedPosts || [];
  const createdPosts = data?.data?.createdPosts || [];

  const handleDelete = (postId) => {
    // Basic confirmation before deleting
    if (confirm("Are you sure you want to delete this post permanently?")) {
      deletePost(postId);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      
      {/* --- Minimal Header --- */}
      <header className="flex flex-col items-center mb-16">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-gray-50 border border-gray-100 mb-6 shadow-sm">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <User size={40} strokeWidth={1} />
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">
          {user?.name || "User Profile"}
        </h1>
        
        <div className="mt-4 flex gap-8 text-xs font-medium uppercase tracking-widest text-gray-400">
          <span>{createdPosts.length} Posts</span>
          <span>{savedPosts.length} Saved</span>
        </div>
      </header>

      {/* --- Simple Tab Navigation --- */}
      <nav className="flex justify-center gap-12 border-b border-gray-100 mb-10">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 pb-4 text-xs font-bold uppercase tracking-widest transition-all outline-none ${
            activeTab === 'posts' 
            ? "text-black border-b-2 border-black" 
            : "text-gray-400 hover:text-gray-600 border-b-2 border-transparent"
          }`}
        >
          <Grid size={14} /> My Creations
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 pb-4 text-xs font-bold uppercase tracking-widest transition-all outline-none ${
            activeTab === 'saved' 
            ? "text-black border-b-2 border-black" 
            : "text-gray-400 hover:text-gray-600 border-b-2 border-transparent"
          }`}
        >
          <Bookmark size={14} /> Saved Items
        </button>
      </nav>

      {/* --- Content Grid --- */}
      <main>
        {activeTab === 'posts' ? (
          /* SECTION: CREATED POSTS */
          createdPosts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {createdPosts.map((post) => (
          <div key={post._id} className="relative group transition-transform duration-300 active:scale-95 md:hover:-translate-y-1">
            
            {/* DELETE BUTTON: 
                - md:opacity-0 group-hover:opacity-100 (Desktop: Hidden until hover)
                - opacity-100 (Mobile: Always visible for accessibility)
            */}
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevents clicking the post while trying to delete
                handleDelete(post._id);
              }}
              disabled={isDeleting}
              className="absolute top-2 right-2 z-30 p-2 
                         bg-white/90 backdrop-blur-sm rounded-full 
                         text-red-500 shadow-md 
                         opacity-100 md:opacity-0 md:group-hover:opacity-100 
                         transition-all hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>

            <PostCard post={post} />
          </div>
        ))}
      </div>
          ) : (
            <div className="text-center py-24 text-gray-300 italic border-2 border-dashed border-gray-50 rounded-2xl">
              No posts created yet.
            </div>
          )
        ) : (
          /* SECTION: SAVED POSTS */
          savedPosts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {savedPosts.map((saved) => (
                <div key={saved._id} className="transition-transform duration-300 hover:-translate-y-1">
                  {/* Saved posts usually don't have a delete option, but an "Unsave" option inside the PostCard */}
                  <PostCard post={saved.postId} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-300 italic border-2 border-dashed border-gray-50 rounded-2xl">
              Your saved collection is empty.
            </div>
          )
        )}
      </main>
    </div>
  )
}

export default Profile;