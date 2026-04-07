"use client";

import { useState } from "react";
import { useCreatePost } from "../../hooks/usePost";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression"; // Import the library

export default function CreatePostPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreatePost();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show immediate preview for better UX
    setPreview(URL.createObjectURL(file));
    setIsCompressing(true);

    // Compression Options
    const options = {
      maxSizeMB: 1,            // Target max size 1MB
      maxWidthOrHeight: 1920,  // Resizes 8160px down to 1920px
      useWebWorker: true,
      initialQuality: 0.8,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      
      // ImageKit works better if the file has a standard name/extension
      const finalFile = new File([compressedFile], file.name, {
        type: compressedFile.type,
      });

      setImage(finalFile);
      console.log(`Original: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      console.log(`Compressed: ${(finalFile.size / 1024 / 1024).toFixed(2)}MB`);
    } catch (error) {
      console.error("Compression Error:", error);
      toast.error("Failed to process image. Try a different one.");
    } finally {
      setIsCompressing(false);
    }
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
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Area */}
          <div className="relative">
            <label className="block mb-2 font-semibold text-gray-700">
              Upload Image
            </label>
            
            <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-all ${preview ? 'border-transparent bg-gray-50' : 'border-gray-300 hover:border-black'}`}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              {!preview ? (
                <div className="text-center py-10">
                  <span className="text-4xl">📸</span>
                  <p className="mt-2 text-sm text-gray-500 font-medium">Click to upload high-res photos</p>
                  <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, HEIC</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={preview}
                    alt="Preview"
                    className={`w-full aspect-square object-cover rounded-xl transition-opacity ${isCompressing ? 'opacity-40' : 'opacity-100'}`}
                  />
                  {isCompressing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                      <span className="ml-3 font-medium">Optimizing...</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-medium">Change Image</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's the story behind this shot?"
              className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all resize-none"
              rows={3}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Tags
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              type="text"
              placeholder="e.g. photography, cars, lifestyle"
              className="w-full border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-black focus:outline-none transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending || isCompressing}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
              isPending || isCompressing 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-black text-white hover:bg-gray-800 shadow-lg active:scale-[0.98]"
            }`}
          >
            {isPending ? "Sharing Post..." : isCompressing ? "Processing Image..." : "Share Post"}
          </button>
        </form>
      </div>
    </div>
  );
}