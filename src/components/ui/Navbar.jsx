"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUser, Plus, Search, X, User, LogOut, LayoutGrid } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import NavbarSearch from "./SearchPage";
import { useLogout, useUserDetails } from "../../hooks/useAuth";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [search, setSearch] = useState("");

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const { data } = useUserDetails();
  const { mutate: logOut } = useLogout();
  const user = data?.data?.user || null;

  const handleLogout = () => {
    setOpen(false);
    logOut();
  };

  // ✅ Auto-close dropdown on Route Change
  useEffect(() => {
    setOpen(false);
    setMobileSearch(false);
  }, [pathname]);

  // ✅ Close on Click Outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
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
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            PhotoGallery
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <NavbarSearch />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <button
              onClick={openSearch}
              className="p-2 rounded-full hover:bg-gray-100 md:hidden transition-colors"
            >
              <Search size={20} />
            </button>

            {user && (
              <Link
                href="/createpost"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <Plus size={18} />
                <span>Create</span>
              </Link>
            )}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center p-1 rounded-full hover:ring-4 hover:ring-gray-50 transition-all"
                  >
                    {user.profileImage ? (
                      <Image
                        width={32}
                        height={32}
                        alt="User"
                        src={user.profileImage}
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    ) : (
                      <CircleUser size={28} strokeWidth={1.5} />
                    )}
                  </button>

                  {/* ✅ Improved Dropdown UI */}
                  {open && (
                    <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-150">
                      <div className="px-4 py-3 border-b border-gray-50 mb-1">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} /> View Profile
                      </Link>

                      {/* Added a placeholder for 'Settings' or 'My Posts' to fill the UI */}

                      <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-semibold rounded-full bg-black text-white hover:bg-zinc-800 transition-colors"
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
        <div className="fixed inset-0 bg-white z-[60] p-4 flex flex-col animate-in slide-in-from-top duration-200">
          <div ref={searchRef} className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-xl flex items-center px-4 py-2.5 gap-3">
              <Search size={18} className="text-gray-400" />
              <form onSubmit={handleSearch} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search PhotoGallery..."
                  className="w-full bg-transparent outline-none text-base"
                />
              </form>
            </div>
            <button 
              onClick={() => setMobileSearch(false)}
              className="p-2 text-gray-500 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ➕ FLOATING ADD BUTTON */}
      {user && pathname !== "/createpost" && (
        <Link
          href="/createpost"
          className="fixed bottom-6 right-6 z-40 bg-black text-white p-4 rounded-full shadow-2xl md:hidden hover:scale-110 active:scale-95 transition-all"
        >
          <Plus size={24} />
        </Link>
      )}
    </>
  );
}