
import { Bookmark, Heart } from 'lucide-react'
import { useLikePost, useSavePost } from '../../hooks/usePost'
import jwt from 'jsonwebtoken'

const PostDetailPage = ({ post }) => {

    let token = localStorage.getItem('token')
    let decodedToken = jwt.decode(token, process.env.NEXT_PUBLIC_JWT_KEY)
    console.log("Decoded token in PostDetailPage:", decodedToken); // Debug log
    const { mutate: likeMutate } = useLikePost()

    const { mutate: saveMutate } = useSavePost()


    const handleLike = () => {
        likeMutate(post._id)
    }

    const handleSave = () => {
        saveMutate(post._id)
    }
    return (
        <div className="bg-white rounded-2xl shadow-md max-w-5xl w-full overflow-hidden">
            <img
                src={post.imageUrl}
                alt="post"
                className="w-full object-contain max-h-[80vh] bg-black"
            />

            <div className="p-6 flex flex-col md:flex-row justify-between">
                <div> {post.caption && (
                    <p className="text-lg text-gray-800">{post.caption}</p>
                )}

                    {post.createdBy && (
                        <p className="mt-2 text-sm text-gray-500">
                            by {post.createdBy.name}
                        </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                        {post.likes.length} likes
                    </p></div>
                <div className='flex items-center md:flex-col sm:flex-row'>
                    {post.likes.includes(decodedToken?.id) ? (
                        <button onClick={handleLike} className="mt-2 text-red-500  py-2 rounded-full text-sm hover:bg-red-50 transition">
                            <Heart fill="red" />
                        </button>
                    ) : (
                        <button onClick={handleLike} className="mt-2 text-gray-500  py-2 rounded-full text-sm hover:bg-gray-100 transition">
                            <Heart />
                        </button>
                    )}

                    <button onClick={handleSave}>
                        {post.isSaved ? (
                            <Bookmark fill="black" />
                        ) : (
                            <Bookmark />
                        )}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default PostDetailPage