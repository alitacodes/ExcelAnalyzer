import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-green-700 animate-fadeInDown">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center animate-fadeIn">
          <div className="text-2xl font-semibold text-green-600">Uploads</div>
          <div className="text-4xl font-bold mt-2">0</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center animate-fadeIn delay-100">
          <div className="text-2xl font-semibold text-green-600">Charts</div>
          <div className="text-4xl font-bold mt-2">0</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center animate-fadeIn delay-200">
          <div className="text-2xl font-semibold text-green-600">Users</div>
          <div className="text-4xl font-bold mt-2">0</div>
        </div>
      </div>
    </div>
  );
}
