import { Bookmark, Heart, Share2, Download } from 'lucide-react'
import { useLikePost, useSavePost } from '../../hooks/usePost'
import { useUserDetails } from '../../hooks/useAuth';
import Image from 'next/image';

const PostDetailPage = ({ post }) => {

    const { mutate: likeMutate } = useLikePost()
    const { mutate: saveMutate } = useSavePost()
    const { data } = useUserDetails()

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

    // ✅ Share Function
    const handleShare = async () => {
        const shareData = {
            title: "Check out this post",
            text: post.caption || "Awesome post!",
            url: post,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // fallback: copy link
                await navigator.clipboard.writeText(post.imageUrl);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Share failed:", err);
        }
    };

    // ✅ Download Function
    const handleDownload = async () => {
        try {
            const response = await fetch(post.imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "post-image.jpg";
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const isLiked = post?.likes?.includes(userid);
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

                <div className="p-6 flex justify-between items-start gap-2">

                    {/* ❤️ LIKE */}
                    <button onClick={handleLike} className={`flex items-center justify-center w-10 h-10 ${isLiked ? "text-red-500" : "text-black"}`}>
                        <Heart size={22} fill={isLiked ? "red" : "none"} />
                    </button>

                    <button onClick={handleSave} className={`flex items-center justify-center w-10 h-10 ${isSaved ? "text-black" : "text-black"}`}>
                        <Bookmark size={22} fill={isSaved ? "black" : "none"} />
                    </button>

                    <button onClick={handleShare} className="flex items-center justify-center w-10 h-10">
                        <Share2 size={22} />
                    </button>

                    <button onClick={handleDownload} className="flex items-center justify-center w-10 h-10">
                        <Download size={22} />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default PostDetailPage