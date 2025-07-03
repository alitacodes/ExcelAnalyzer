import React, { useState } from "react";
import AuthModal from "./AuthModal";

export default function Topbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4 sticky top-0 z-10 animate-fadeInDown">
      {/* Left: Floating menu button and brand */}
      <div className="flex items-center gap-4">
        {/* The floating menu button is handled in Sidebar.js, so just leave space here */}
        <span className="text-2xl font-extrabold text-green-700 tracking-tight ml-12">ExZi</span>
      </div>
      {/* Right: Nav actions */}
      <div className="flex items-center gap-4">
        <a href="#" className="text-green-600 font-semibold hover:underline transition">Setup Guide</a>
        <button
          className="border border-green-400 text-green-600 font-semibold px-6 py-2 rounded-lg bg-white hover:bg-green-50 transition shadow-sm"
          onClick={() => setShowAuthModal(true)}
        >
          Sign In
        </button>
        <button
          className="bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold px-6 py-2 rounded-lg flex items-center gap-2 shadow hover:from-green-600 hover:to-green-500 transition"
          onClick={() => setShowAuthModal(true)}
        >
          Get Started <span className="text-xl">→</span>
        </button>
      </div>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
}
