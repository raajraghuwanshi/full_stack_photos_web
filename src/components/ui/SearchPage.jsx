"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarSearch() {

  const router = useRouter();
  const [search, setSearch] = useState("");
    const pathname = usePathname()

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/homepage/search?q=${search}`);
    }
  };

  useEffect(() => {
    if (pathname === "/homepage") {
      setSearch("");
    }
  }, [pathname]);

  return (
    <input
      type="text"
      placeholder="Search posts..."
      className="w-full bg-gray-100 rounded-full px-4 py-2 focus:outline-gray-300 "
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleSearch}
    />
  );
}