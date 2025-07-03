import React from "react";

export default function Upload() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-green-700">Upload Excel File</h1>
      <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
        <input type="file" accept=".xls,.xlsx" className="mb-4" />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full">Upload</button>
      </div>
    </div>
  );
}
