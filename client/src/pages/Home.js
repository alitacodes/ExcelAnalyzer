import React from "react";
import { Link } from "react-router-dom";
import { FiUploadCloud, FiBarChart2, FiDownload, FiShield, FiArrowDown } from "react-icons/fi";

const features = [
  {
    icon: <FiUploadCloud className="text-4xl text-green-500 mb-2" />,
    title: "Smart Upload",
    desc: "Drag & drop .xls and .xlsx files with intelligent parsing and validation",
  },
  {
    icon: <FiBarChart2 className="text-4xl text-green-500 mb-2" />,
    title: "Interactive Charts",
    desc: "Generate stunning 2D and 3D visualizations with real-time interactions",
  },
  {
    icon: <FiDownload className="text-4xl text-green-500 mb-2" />,
    title: "Export Options",
    desc: "Download your charts as high-quality PNG or professional PDF files",
  },
  {
    icon: <FiShield className="text-4xl text-green-500 mb-2" />,
    title: "Secure Platform",
    desc: "Enterprise-grade security with JWT authentication and role-based access",
  },
];

const steps = [
  {
    title: "Upload Your File",
    desc: "Drag and drop your Excel file and we'll parse the data automatically with smart validation",
  },
  {
    title: "Configure Visualization",
    desc: "Select your X and Y axes, choose from multiple chart types including 3D options",
  },
  {
    title: "Analyze & Export",
    desc: "Generate interactive charts, gain insights, and export as professional-quality images or PDFs",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center px-2 md:px-0 animate-fadeIn">
      {/* Moving background shapes */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute bg-green-200 opacity-60 rounded-full w-72 h-72 blur-2xl animate-shapeMove1 left-[-6rem] top-[-6rem]" />
        <div className="absolute bg-purple-200 opacity-50 rounded-full w-60 h-60 blur-2xl animate-shapeMove2 right-[-5rem] top-20" />
        <div className="absolute bg-yellow-100 opacity-60 rounded-full w-40 h-40 blur-2xl animate-shapeMove3 left-1/2 bottom-[-4rem]" />
      </div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-12 animate-fadeInDown">
        <div className="flex items-center gap-4 mb-4 animate-bounceIn">
          <span className="bg-green-100 p-4 rounded-2xl shadow-lg">
            <FiBarChart2 className="text-5xl text-green-600" />
          </span>
          <span className="bg-green-100 p-4 rounded-2xl shadow-lg">
            <FiBarChart2 className="text-5xl text-green-600 rotate-45" />
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 mb-4 animate-slideInDown text-center">
          Transform Your Excel Data
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 text-center animate-fadeIn delay-200">
          Upload, analyze, and visualize your Excel data with powerful 2D and 3D charts.<br />Turn spreadsheets into stunning insights in seconds.
        </p>
        <div className="flex flex-col md:flex-row gap-4 animate-bounceIn">
          <Link
            to="/dashboard"
            className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-green-700 transition-all"
          >
            Start Analyzing
          </Link>
          <Link
            to="/admin"
            className="bg-white border border-green-600 text-green-700 px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-green-50 transition-all"
          >
            Admin Access
          </Link>
        </div>
        {/* Jumping scroll arrow */}
        <div className="flex flex-col items-center mt-6">
          <FiArrowDown className="text-4xl text-green-400 animate-bounceArrow" />
        </div>
      </div>
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 mb-16 w-full max-w-6xl animate-fadeIn">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-green-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn delay-[${i * 100}ms]`}
          >
            {f.icon}
            <div className="text-xl font-bold text-green-700 mb-2">{f.title}</div>
            <div className="text-gray-500 text-base">{f.desc}</div>
          </div>
        ))}
      </div>
      {/* How It Works */}
      <div className="w-full max-w-4xl mx-auto mt-8 mb-16 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-green-700 text-center mb-8 animate-fadeInDown">How ExZi Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center animate-fadeIn delay-[${i * 150}ms]">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-2 shadow-lg">
                {i + 1}
              </div>
              <div className="text-lg font-bold text-green-700 mb-1 text-center">{step.title}</div>
              <div className="text-gray-500 text-center text-base max-w-xs">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="w-full max-w-3xl mx-auto mb-16 animate-fadeIn">
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-2xl shadow-xl p-10 flex flex-col items-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 text-center">Ready to Transform Your Data?</h3>
          <p className="text-white text-lg mb-6 text-center">Join thousands of users who trust ExZi for their data visualization needs</p>
          <Link
            to="/upload"
            className="bg-white text-green-700 px-8 py-4 rounded-lg text-lg font-semibold shadow hover:bg-green-50 transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
} 