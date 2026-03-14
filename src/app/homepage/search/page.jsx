"use client";

import { useSearchParams } from "next/navigation";
import { useGlobalSearch } from "../../../hooks/useSearch";
import MasonryGrid from "../../../components/ui/MasonryGrid";

export default function SearchPage() {

  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, isLoading } = useGlobalSearch(query);
  console.log("Search results:", data);

  if (isLoading) {
    return <div className="p-10 text-center">Searching...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="mb-6 text-lg font-semibold">
          Results for "{query}"
        </h2>

        <MasonryGrid posts={data || []} />

      </div>
    </div>
  );
}