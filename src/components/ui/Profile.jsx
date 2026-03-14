'use client'

import { useUserDetails } from '../../hooks/useAuth'
import { User} from "lucide-react";
import React from 'react'
import PostCard from './PostCard'

const Profile = () => {

  const { data, isLoading } = useUserDetails()

  if (isLoading) return <div className="p-6">Loading...</div>

  const user = data?.data?.user
  const savedPosts = data?.data?.savedPosts || []

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Profile Header */}
      <div className="flex items-center gap-6 border-b pb-6">
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="profile"
            className="w-34 h-34 rounded-full object-cover bg-gray-100"
          />
        ) : (
          <div className="w-34 h-34 rounded-full bg-gray-100 flex items-center justify-center">
            <User />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="text-gray-500">{user?.bio}</p>

          <div className="flex gap-6 mt-3 text-sm text-gray-600">
            <p><span className="font-semibold">{savedPosts.length}</span> Saved</p>
          </div>
        </div>

      </div>

      {/* Saved Posts Section */}
      <div className="mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Saved Posts
        </h2>

        {savedPosts.length === 0 ? (
          <p className="text-gray-500">
            No saved posts yet
          </p>
        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

            {savedPosts.map((saved) => (
              <PostCard key={saved._id} post={saved.postId} />
            ))}

          </div>

        )}

      </div>

    </div>
  )
}

export default Profile