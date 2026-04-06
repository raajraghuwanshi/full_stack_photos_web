export const PostSkeleton = () => {
  return (
    <div className="animate-pulse break-inside-avoid mb-4 bg-white rounded-xl shadow-sm overflow-hidden">
      
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-300"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        
        {/* Title */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Footer (avatar + meta) */}
        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>

      </div>
    </div>
  );
};