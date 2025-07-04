import React from "react";
import { FiBarChart2, FiUploadCloud, FiShield, FiZap, FiCheckCircle, FiChevronDown } from "react-icons/fi";
import { FaLinkedin, FaGithub, FaEnvelope, FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Decorative background shapes */}
      {/* <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
        <div className="absolute top-20 right-[-60px] w-60 h-60 bg-green-100 rounded-full blur-2xl opacity-30 animate-float"></div>
        <div className="absolute bottom-[-60px] left-1/2 w-40 h-40 bg-green-300 rounded-full blur-2xl opacity-20 animate-float-reverse"></div>
      </div> */}

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-24 px-4 text-center min-h-[60vh] flex-grow">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-4 drop-shadow-lg transition-all duration-500">
          ExZi: Excel Analytics, Reimagined
        </h1>
        <p className="text-xl md:text-2xl text-green-900 mb-8 max-w-2xl mx-auto transition-all duration-500">
          Instantly visualize, analyze, and share your Excel data with beautiful charts and smart insights. No coding required.
        </p>
        <a href="/upload" className="inline-block bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 animate-bounce mt-4" style={{ marginTop: '10px' }}>
          Get Started for Free
        </a>
      </section>

      {/* Our Services Section */}
      <section className="max-w-5xl mx-auto py-16 px-4 animate-fadeInDown">
        <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center mt-10" style={{ marginTop: '40px' }}>Services we provide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FiUploadCloud className="text-5xl text-green-400 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Excel Upload & Parsing</h3>
            <p className="text-gray-600">Upload .xls/.xlsx files, automatic parsing, and smart data validation for seamless onboarding.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FiBarChart2 className="text-5xl text-green-400 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Chart Visualization</h3>
            <p className="text-gray-600">Create interactive 2D & 3D charts, customize axes, and visualize your data instantly.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <FiShield className="text-5xl text-green-400 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Data Security & Privacy</h3>
            <p className="text-gray-600">Your data is encrypted, private, and never shared. Role-based access for admins and users.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 md:col-span-1">
            <FiZap className="text-5xl text-green-400 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-green-700 mb-2">Export & Sharing</h3>
            <p className="text-gray-600">Export charts as PNG/PDF or share insights with your team in one click.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 md:col-span-2">
            <FiCheckCircle className="text-5xl text-green-400 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-green-700 mb-2">History & Admin</h3>
            <p className="text-gray-600">Track your uploads, view chart history, and manage users with an intuitive admin dashboard.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section (merged, not as cards) */}
      <section className="max-w-4xl mx-auto py-16 px-4 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <FiUploadCloud className="text-4xl text-green-400 mb-2 animate-bounce mx-auto" />
            <span className="block text-lg font-semibold text-green-700 mb-1">1. Upload</span>
            <span className="text-gray-600">Drag & drop your Excel file or select from your device.</span>
          </div>
          <div>
            <FiBarChart2 className="text-4xl text-green-400 mb-2 animate-bounce mx-auto" />
            <span className="block text-lg font-semibold text-green-700 mb-1">2. Visualize</span>
            <span className="text-gray-600">Choose chart type, configure axes, and generate beautiful charts.</span>
          </div>
          <div>
            <FiZap className="text-4xl text-green-400 mb-2 animate-bounce mx-auto" />
            <span className="block text-lg font-semibold text-green-700 mb-1">3. Share & Export</span>
            <span className="text-gray-600">Export charts as PNG/PDF or share insights with your team.</span>
          </div>
        </div>
      </section>

      {/* Testimonials/Trust Section */}
      <section className="max-w-4xl mx-auto py-16 px-4 animate-fadeInUp">
        <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center">Trusted by Data-Lovers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FiCheckCircle className="text-3xl text-green-400 mb-2" />
            <p className="text-gray-700 italic mb-2">"ExZi made my reporting 10x faster. The 3D charts wowed my team!"</p>
            <span className="text-green-700 font-semibold">— Analyst, FinTech</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <FiCheckCircle className="text-3xl text-green-400 mb-2" />
            <p className="text-gray-700 italic mb-2">"Super easy to use, and I love the privacy-first approach."</p>
            <span className="text-green-700 font-semibold">— Product Manager, SaaS</span>
          </div>
        </div>
      </section>

      {/* Footer with Socials */}
      <footer className="w-full py-8 bg-gradient-to-r from-green-100 to-green-200 flex flex-col items-center mt-12 animate-fadeInUp">
        <div className="flex gap-8 mb-4">
          <a href="https://www.linkedin.com/in/sneha-mandal-36938432b/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-500 text-3xl transition-colors duration-200">
            <FaLinkedin />
          </a>
          <a href="https://github.com/alitacodes" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-500 text-3xl transition-colors duration-200">
            <FaGithub />
          </a>
          <a href="mailto:snehaman1010@gmail.com" className="text-green-700 hover:text-green-500 text-3xl transition-colors duration-200">
            <FaEnvelope />
          </a>
          <a href="https://x.com/SnehaM01" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-500 text-3xl transition-colors duration-200">
            <FaXTwitter />
          </a>
        </div>
        <div className="text-green-800 font-semibold">© {new Date().getFullYear()} ExZi. Built by Sneha Mandal.</div>
      </footer>
    </div>
  );
} 