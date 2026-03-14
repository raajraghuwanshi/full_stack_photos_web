"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Plus, Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import NavbarSearch from "./SearchPage";

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }

      if (!searchRef.current?.contains(e.target)) {
        setMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openSearch = () => {
    setMobileSearch(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/homepage/search?q=${search}`);
    setMobileSearch(false);
    setSearch("");
  };
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            SnapBoard
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <NavbarSearch />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">

            {/* Mobile Search */}
            <button
              onClick={openSearch}
              className="p-2 rounded-full hover:bg-gray-100 md:hidden"
            >
              <Search size={22} />
            </button>

            {/* Home */}
            <Link
              href="/"
              className="hidden md:block p-2 rounded-full hover:bg-gray-100"
            >
              <Home size={22} />
            </Link>

            {/* Create */}
            {token && (
              <Link
                href="/createpost"
                className="hidden md:block p-2 rounded-full hover:bg-gray-100"
              >
                <Plus size={22} />
              </Link>
            )}

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="bg-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-300"
              >
                Profile
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border overflow-hidden">

                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm hover:bg-gray-100"
                  >
                    View Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {mobileSearch && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-start pt-6 px-4 animate-fade">

          <div
            ref={searchRef}
            className="bg-white w-full rounded-full shadow-md flex items-center px-4 py-3 gap-3"
          >

            <Search size={20} className="text-gray-500" />

            <form onSubmit={handleSearch} className="flex-1 mx-2">
              <input
                ref={inputRef}
                enterKeyHint="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search SnapBoard..."
                className="w-full outline-none text-sm"
              />
            </form>

            <button onClick={() => setMobileSearch(false)}>
              <X size={20} />
            </button>

          </div>
        </div>
      )}
    </>
  );
}