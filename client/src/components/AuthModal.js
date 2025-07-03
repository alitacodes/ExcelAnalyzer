import React, { useState } from "react";
import { FiX } from "react-icons/fi";

export default function AuthModal({ open, onClose }) {
  const [role, setRole] = useState("User");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Dummy credentials
    if (email === "test@exzi.com" && password === "test123" && (name || role === "User")) {
      setSuccess("Login successful! Welcome to ExZi.");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 1200);
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("Invalid credentials. Try test@exzi.com / test123 or check your input.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] relative animate-fadeIn flex flex-col">
        <button
          className="absolute top-4 right-4 text-2xl text-green-700 hover:text-green-900"
          onClick={onClose}
        >
          <FiX />
        </button>
        <div className="flex flex-col items-center px-6 py-8 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          <div className="bg-green-100 p-4 rounded-2xl mb-4">
            {/* You can use a logo icon here */}
            <img src="/logo192.png" alt="ExZi" className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-extrabold text-green-700 mb-2 text-center">Join ExZi</h2>
          <p className="text-green-500 mb-4 text-center">Create your account to start analyzing Excel files</p>
          <button
            className="w-full bg-gray-100 text-gray-400 font-semibold py-3 rounded-lg mb-3 cursor-not-allowed"
            disabled
          >
            <span className="mr-2">G</span> Google Sign-In (Not Configured)
          </button>
          <div className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg p-3 mb-4 text-sm flex items-center">
            <span className="mr-2">⚠️</span> Google OAuth is not configured. <a href="#" className="underline ml-1">View setup guide</a>
          </div>
          <div className="flex items-center w-full my-4">
            <div className="flex-1 border-t border-green-200"></div>
            <span className="mx-2 text-green-400 font-semibold text-xs">OR CONTINUE WITH EMAIL</span>
            <div className="flex-1 border-t border-green-200"></div>
          </div>
          <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
            <select className="border border-green-200 rounded-lg px-4 py-2" value={role} onChange={e => setRole(e.target.value)}>
              <option>User</option>
              <option>Admin</option>
            </select>
            <input className="border border-green-200 rounded-lg px-4 py-2" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
            <input className="border border-green-200 rounded-lg px-4 py-2" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="border border-green-200 rounded-lg px-4 py-2" placeholder="Enter your password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input className="border border-green-200 rounded-lg px-4 py-2" placeholder="Confirm your password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button type="submit" className="bg-green-600 text-white py-3 rounded-lg font-semibold mt-2 hover:bg-green-700 transition-all flex items-center justify-center gap-2">
              <span>👤</span> Create Account
            </button>
          </form>
          {error && <div className="mt-3 text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="mt-3 text-green-600 text-sm text-center font-bold">{success}</div>}
          <div className="mt-4 text-green-600 text-sm text-center">
            Already have an account? <a href="#" className="underline">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
