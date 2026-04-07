import { Bookmark, Heart, Share2, Download } from 'lucide-react';
import { useLikePost, useSavePost } from '../../hooks/usePost';
import { useUserDetails } from '../../hooks/useAuth';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const PostDetailPage = ({ post }) => {
    // 1. Hooks
    const { mutate: likeMutate } = useLikePost();
    const { mutate: saveMutate } = useSavePost();
    const { data: userResponse } = useUserDetails();

    // Helpers to extract data safely
    const user = userResponse?.data?.user;
    const userid = user?._id;
    const savedPosts = userResponse?.data?.savedPosts || [];

    // 2. Local State for Optimistic UI
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // 3. Sync state when user or post data arrives
    useEffect(() => {
        if (userid && post) {
            setIsLiked(post?.likes?.includes(userid) || false);
            setIsSaved(savedPosts.some(item => item.postId?._id?.toString() === post._id?.toString()) || false);
        }
    }, [userid, post, savedPosts]);

    // 4. Interaction Handlers
    const handleLike = () => {
        if (!userid) {
            toast.error('Please login first');
            return;
        }

        // Optimistic Update
        setIsLiked(prev => !prev);

        likeMutate(post._id, {
            onError: () => {
                // Rollback on failure
                setIsLiked(prev => !prev);
            }
        });
    };

    const handleSave = () => {
        if (!userid) {
            toast.error('Please login first');
            return;
        }

        // Optimistic Update
        setIsSaved(prev => !prev);

        saveMutate(post._id, {
            onError: () => {
                // Rollback on failure
                setIsSaved(prev => !prev);
            }
        });
    };

    const handleShare = async () => {
        const shareData = {
            title: "Check out this post",
            text: post.caption || "Awesome post!",
            url: window.location.href, // Better to share the page URL
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Share failed:", err);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(post.imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `post-${post._id}.jpg`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Download failed");
            console.error(error);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md max-w-5xl w-full overflow-hidden">
            {/* Image Section */}
            <div onDoubleClick={handleLike} className="relative flex justify-center bg-white/10 backdrop-blur-md overflow-hidden">
                <Image
                    src={post.imageUrl}
                    alt="bg"
                    fill
                    priority
                    className="object-cover blur-3xl scale-110"
                />
                <div className="relative z-10">
                    <Image
                        width={1500}
                        height={1500}
                        src={post.imageUrl}
                        alt="post"
                        priority
                        className="rounded-xl shadow-2xl max-h-[80vh] w-auto object-contain"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col md:flex-row justify-between">
                <div>
                    {post.caption && (
                        <p className="text-lg font-body font-bold text-gray-800">{post.caption}</p>
                    )}
                    {post.createdBy && (
                        <p className="mt-2 text-sm font-body text-gray-500">
                            by {post.createdBy.name}
                        </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                        {post?.likes?.length || 0} likes
                    </p>
                </div>

                {/* Actions Section */}
                <div className="p-6 flex justify-between items-start gap-2">
                    <button onClick={handleLike} className={`flex items-center justify-center w-10 h-10 ${isLiked ? "text-red-500" : "text-black"}`}>
                        <Heart size={22} fill={isLiked ? "currentColor" : "none"} />
                    </button>

                    <button onClick={handleSave} className="flex items-center justify-center w-10 h-10 text-black">
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
    );
};

export default PostDetailPage;