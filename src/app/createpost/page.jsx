"use client";

import { useState } from "react";
import { useCreatePost} from "../../hooks/usePost";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreatePostPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreatePost();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("tags", tags);

    mutate(formData, {
      onSuccess: () => {
        toast.success("Post created successfully 🚀");
        router.push("/");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>

          {/* Preview */}
          {preview && (
            <div className="rounded-xl overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full object-cover rounded-xl"
              />
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="block mb-2 font-medium">
              Caption
            </label>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write something about this image..."
              className="w-full border p-3 rounded-lg"
              rows={4}
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              tags
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              type="text"
              placeholder="Add tags to your post..."
              className="w-full border p-3 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-xl hover:opacity-80 transition"
          >
            {isPending ? "Uploading..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}