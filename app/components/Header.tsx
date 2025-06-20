"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="w-full flex justify-center items-center">
      <nav className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-full px-8 py-3 flex items-center gap-8 max-w-3xl mx-auto mt-2 animate-fade-in">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-red-600 via-white to-black bg-clip-text text-transparent drop-shadow-lg tracking-wider hover:scale-105 transition-transform duration-200"
          prefetch={true}
          onClick={() => showNotification("Welcome to ImageKit ReelsPro", "info")}
        >
          <span className="animate-glow">
            <Home className="w-7 h-7 text-red-500 drop-shadow-glow animate-pulse" />
          </span>
          <span className="">ReelsPro</span>
        </Link>
        <div className="flex items-center gap-4 ml-auto">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle bg-black text-white hover:bg-gray-900 transition-colors duration-200 border border-white/10"
            >
              <User className="w-6 h-6 text-white" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] shadow-lg bg-black/90 rounded-box w-64 mt-4 py-2 border border-white/10"
            >
              {session ? (
                <>
                  <li className="px-4 py-1">
                    <span className="text-sm opacity-70 text-white">
                      {session.user?.email?.split("@")[0]}
                    </span>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <Link
                      href="/upload"
                      className="px-4 py-2 bg-black text-white hover:bg-gray-900 block w-full rounded transition-colors duration-200 border border-white/10"
                      onClick={() => showNotification("Welcome to Admin Dashboard", "info")}
                    >
                      Video Upload
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="px-4 py-2 bg-black text-white hover:bg-gray-900 w-full text-left rounded transition-colors duration-200 border border-white/10"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-black text-white hover:bg-gray-900 block w-full rounded transition-colors duration-200 border border-white/10"
                    onClick={() => showNotification("Please sign in to continue", "info")}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .animate-glow {
          filter: drop-shadow(0 0 8px #f87171) drop-shadow(0 0 16px #fff7f7);
        }
      `}</style>
    </header>
  );
}