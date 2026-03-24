import { Bookmark, Heart } from 'lucide-react'
import { useLikePost, useSavePost } from '../../hooks/usePost'
import { useUserDetails } from '../../hooks/useAuth';
import Image from 'next/image';

const PostDetailPage = ({ post }) => {


    const { mutate: likeMutate } = useLikePost()
    const { mutate: saveMutate } = useSavePost()
    const { data} = useUserDetails()


    const userid = data?.data?.user?._id;
    const savedPosts = data?.data?.savedPosts || [];
    const handleLike = () => {
        if (!userid) return;
        likeMutate(post._id)
    }

        const handleSave = () => {
            if (!userid) return;
            saveMutate(post._id)
        }

    // ✅ Safe check
    const isLiked = post?.likes?.includes(data?.data?.user?._id);
    const isSaved = savedPosts.some(
        item => item.postId._id.toString() === post._id.toString()
    );
   

    return (
        <div className="bg-white rounded-2xl shadow-md max-w-5xl w-full overflow-hidden">
            <Image
                width={1500}
                height={1500}
                src={post.imageUrl}
                alt="post"
                priority
                className="w-full object-contain max-h-[80vh] bg-black"
            />

            <div className="p-6 flex flex-col md:flex-row justify-between">
                <div>
                    {post.caption && (
                        <p className="text-lg text-gray-800">{post.caption}</p>
                    )}

                    {post.createdBy && (
                        <p className="mt-2 text-sm text-gray-500">
                            by {post.createdBy.name}
                        </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                        {post?.likes?.length || 0} likes
                    </p>
                </div>

                <div className='flex items-center md:flex-col sm:flex-row'>

                    {/* ❤️ LIKE BUTTON */}
                    <button
                        onClick={handleLike}
                        aria-label="Like post"
                        className={`mt-2 py-2 rounded-full text-sm transition ${isLiked
                            ? "text-red-500 hover:bg-red-50"
                            : "text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        <Heart fill={isLiked ? "red" : "none"} />
                    </button>

                    {/* 🔖 SAVE BUTTON */}
                    <button onClick={handleSave} aria-label="Save post">
                        <Bookmark fill={isSaved ? "black" : "none"} />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default PostDetailPage