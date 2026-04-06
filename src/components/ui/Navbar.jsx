"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, Plus, Search, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import NavbarSearch from "./SearchPage";
import { useLogout, useUserDetails } from "../../hooks/useAuth";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname()

  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const { data } = useUserDetails();
  const { mutate: logOut } = useLogout()
  const user = data?.data?.user || null;

  const handleLogout = () => {
    logOut();
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
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-xl font-heading font-bold ">
            Photobooth
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <NavbarSearch />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Mobile Search */}
            <button
              onClick={openSearch}
              aria-label="Search"
              className="p-2 md:p-2.5 rounded-full hover:bg-gray-100 md:hidden"
            >
              <Search size={22} />
            </button>

            {/* Desktop Add Button */}
            {user && (
              <Link
                href="/createpost"
                className="hidden md:flex p-2 md:p-2.5 rounded-full hover:bg-gray-100"
              >
                <Plus size={22} />
              </Link>
            )}

            {/* Profile / Login */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setOpen(!open)}
                    aria-label="User Menu"
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Image
                      width={100}
                      height={100}
                      alt="ProfilePhoto"
                      src={user.profileImage}
                      className="w-8 h-8 rounded-full object-cover bg-gray-100"
                    />
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
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm font-medium rounded-full bg-black text-white"
                >
                  Login
                </Link>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* 📱 MOBILE SEARCH OVERLAY */}
      {mobileSearch && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-start pt-6 px-4">

          <div
            ref={searchRef}
            className="bg-white w-full rounded-full shadow-md flex items-center px-4 py-3 gap-3"
          >
            <Search size={20} className="text-gray-500" />

            <form onSubmit={handleSearch} className="flex-1">
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

      {/* ➕ FLOATING ADD BUTTON (MOBILE ONLY) */}
      {user && pathname !== "/createpost" && (
        <Link
          href="/createpost"
          className="fixed bottom-5 right-5 z-50 bg-black text-white p-4 rounded-full shadow-lg md:hidden"
        >
          <Plus size={24} />
        </Link>
      )}
    </>
  );
}