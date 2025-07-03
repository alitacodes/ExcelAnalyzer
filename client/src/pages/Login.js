import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Send Google credential to backend
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        { credential: credentialResponse.credential }
      );
      console.log("Received credential:", req.body.credential);
      console.log("Expected audience:", process.env.GOOGLE_CLIENT_ID);
      // Store your app's JWT in localStorage
      localStorage.setItem("token", res.data.token);
      // Redirect to dashboard
      window.location.href = "/";
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleError = () => {
    alert("Login Failed");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">Sign in to ExcelAnalyzer</h1>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  );
}
