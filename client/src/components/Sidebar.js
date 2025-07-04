import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FiMenu, FiX, FiHome, FiBarChart2, FiUploadCloud, FiClock, FiSettings, FiLogOut, FiMessageCircle, FiCpu
} from "react-icons/fi";
import AuthModal from "./AuthModal";

const navItems = [
  { name: "Home", path: "/", icon: <FiHome />, desc: "Welcome page" },
  { name: "Dashboard", path: "/dashboard", icon: <FiBarChart2 />, desc: "Main analytics hub" },
  { name: "Upload Excel", path: "/upload", icon: <FiUploadCloud />, desc: "Upload and analyze files" },
  { name: "History", path: "/history", icon: <FiClock />, desc: "View past analyses" },
  { name: "AI Insights", path: "/ai", icon: <FiCpu />, desc: "AI-powered analytics" },
  { name: "Chat with ExZi", path: "/chat", icon: <FiMessageCircle />, desc: "AI assistant chatbot" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Dummy user info (replace with real auth logic)
  const user = null; // or { name: "Sneha Mandal", email: "...", role: "user" }

  // Lock scroll when sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Floating menu button */}
      <button
        className="fixed top-4 left-4 z-50 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-green-100 transition-all"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)" }}
      >
        <FiMenu className="text-2xl text-green-700" />
      </button>

      {/* Sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} rounded-r-3xl flex flex-col`}
        style={{ boxShadow: open ? "0 0 40px 0 rgba(0,0,0,0.15)" : undefined }}
      >
        <div className="flex flex-col h-full overflow-y-auto max-h-screen">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <span className="bg-green-100 p-2 rounded-xl">
                <FiBarChart2 className="text-3xl text-green-600" />
              </span>
              <div>
                <div className="text-2xl font-extrabold text-green-700 tracking-tight">ExZi</div>
                <div className="text-xs text-green-500 font-semibold">Excel Analysis Platform</div>
              </div>
            </div>
            <button
              className="text-3xl text-green-700 focus:outline-none"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            >
              <FiX />
            </button>
          </div>
          <div className="px-6">
            <div className="text-gray-500 font-semibold mb-2 mt-2">Contents</div>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl text-lg font-semibold transition-all duration-200
                    ${isActive ? "bg-green-600 text-white shadow-lg" : "bg-green-100 text-green-700 hover:bg-green-200"}
                    focus:bg-green-200 focus:text-green-800 outline-none`
                  }
                  onClick={() => setOpen(false)}
                  end={item.path === "/"}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>
                    {item.name}
                    <div className="text-xs font-normal text-green-900 opacity-70">{item.desc}</div>
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>
          {/* User profile card or login */}
          <div className="mt-auto px-6 py-6">
            {!user ? (
              <button
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                onClick={() => { setShowAuthModal(true); setOpen(false); }}
              >
                Sign In / Get Started
              </button>
            ) : (
              <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-4 shadow">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-green-700 font-bold">
                  {user.name[0]}
                </div>
                <div>
                  <div className="font-bold text-green-800">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-green-200 text-green-800 font-semibold">{user.role}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay for mobile drawer with blur, disables scroll */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
