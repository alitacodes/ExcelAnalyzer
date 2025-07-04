import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { Chart, BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

Chart.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Dummy columns and data
const columns = ["Day", "Product", "Price", "# Sold"];
const dummyData = [
  { Day: "Mon", Product: "A", Price: 10, "# Sold": 5 },
  { Day: "Tue", Product: "B", Price: 15, "# Sold": 8 },
  { Day: "Wed", Product: "A", Price: 12, "# Sold": 6 },
  { Day: "Thu", Product: "C", Price: 20, "# Sold": 10 },
  { Day: "Fri", Product: "B", Price: 18, "# Sold": 7 },
];

const chartTypes = [
  "Bar Chart",
  "Line Chart",
  "Pie Chart",
  "Scatter Plot",
  "3D Chart",
];

export default function ChartVisualization() {
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState(chartTypes[0]);
  const [showChart, setShowChart] = useState(false);

  // Prepare data for Chart.js
  const chartData = {
    labels: dummyData.map((row) => row[xAxis] || ""),
    datasets: [
      {
        label: yAxis,
        data: dummyData.map((row) => row[yAxis] || 0),
        backgroundColor: "rgba(16, 185, 129, 0.6)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Pie chart needs special data
  const pieData = {
    labels: dummyData.map((row) => row[xAxis] || ""),
    datasets: [
      {
        data: dummyData.map((row) => row[yAxis] || 0),
        backgroundColor: [
          "#34d399", "#6ee7b7", "#a7f3d0", "#fbbf24", "#f87171"
        ],
      },
    ],
  };

  // Scatter chart needs {x, y} pairs
  const scatterData = {
    datasets: [
      {
        label: `${xAxis} vs ${yAxis}`,
        data: dummyData.map((row) => ({
          x: row[xAxis] || 0,
          y: row[yAxis] || 0,
        })),
        backgroundColor: "#34d399",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full animate-fadeInDown">
        <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-white">Generate Visualization</span>
          </div>
          <div className="text-white text-sm font-medium">
            Configure your chart settings and generate beautiful visualizations<br />
            Found {dummyData.length} rows with columns: {columns.join(", ")}
          </div>
        </div>
        <form className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6" onSubmit={e => { e.preventDefault(); setShowChart(true); }}>
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-green-700 font-semibold mb-2">X-Axis Column</label>
            <select
              className="border border-green-200 rounded-lg px-4 py-2"
              value={xAxis}
              onChange={e => { setXAxis(e.target.value); setShowChart(false); }}
            >
              <option value="">Select X-axis</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-green-700 font-semibold mb-2">Y-Axis Column</label>
            <select
              className="border border-green-200 rounded-lg px-4 py-2"
              value={yAxis}
              onChange={e => { setYAxis(e.target.value); setShowChart(false); }}
            >
              <option value="">Select Y-axis</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-green-700 font-semibold mb-2">Chart Type</label>
            <select
              className="border border-green-200 rounded-lg px-4 py-2"
              value={chartType}
              onChange={e => { setChartType(e.target.value); setShowChart(false); }}
            >
              {chartTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-green-400 text-white py-3 px-8 rounded-lg font-semibold flex items-center justify-center gap-2 text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={!xAxis || !yAxis}
          >
            Generate Chart
          </button>
        </form>
        {showChart && (
          <div className="w-full min-h-[300px] flex items-center justify-center bg-green-50 rounded-xl shadow-inner p-6 animate-fadeIn">
            {/* Render chart based on selection */}
            {chartType === "Bar Chart" && xAxis && yAxis && (
              <Bar data={chartData} />
            )}
            {chartType === "Line Chart" && xAxis && yAxis && (
              <Line data={chartData} />
            )}
            {chartType === "Pie Chart" && xAxis && yAxis && (
              <Pie data={pieData} />
            )}
            {chartType === "Scatter Plot" && xAxis && yAxis && (
              <Scatter data={scatterData} />
            )}
            {chartType === "3D Chart" && (
              <Canvas style={{ height: 300, width: 400 }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                <Box args={[2, 2, 2]} position={[0, 0, 0]}>
                  <meshStandardMaterial attach="material" color="#34d399" />
                </Box>
              </Canvas>
            )}
          </div>
        )}
      </div>
    </div>
  );
}