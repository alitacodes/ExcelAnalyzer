import jsPDF from "jspdf"; 
import React, { useRef, useState, useEffect } from "react";
import { FiUploadCloud, FiFile, FiX, FiBarChart2, FiPieChart, FiTrendingUp, FiCpu } from "react-icons/fi";
import { MdScatterPlot, MdThreeDRotation } from "react-icons/md";
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { Chart, BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Text } from "@react-three/drei";
Chart.register(BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const dummyColumns = ["Day", "Product", "Price", "# Sold"];
const chartTypes = [
  { label: "Bar Chart", icon: <FiBarChart2 className="inline mr-1" /> },
  { label: "Line Chart", icon: <FiTrendingUp className="inline mr-1" /> },
  { label: "Pie Chart", icon: <FiPieChart className="inline mr-1" /> },
  { label: "Scatter Plot", icon: <MdScatterPlot className="inline mr-1" /> },
  { label: "3D Chart", icon: <MdThreeDRotation className="inline mr-1" /> },
];

const dummyData = [
  { Day: "Mon", Product: "A", Price: 10, "# Sold": 5 },
  { Day: "Tue", Product: "B", Price: 15, "# Sold": 8 },
  { Day: "Wed", Product: "A", Price: 12, "# Sold": 6 },
  { Day: "Thu", Product: "C", Price: 20, "# Sold": 10 },
  { Day: "Fri", Product: "B", Price: 18, "# Sold": 7 },
];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState(chartTypes[0].label);
  const [showChart, setShowChart] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const inputRef = useRef();
  const chartRef = useRef();
  const threeCanvasRef = useRef();
  const generateSectionRef = useRef();
  const threeSceneRef = useRef();
  const threeCameraRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setShowConfig(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      setShowConfig(true);
      setTimeout(() => {
        generateSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const chartData = {
    labels: dummyColumns.map((col) => col === xAxis ? dummyData.map(row => row[xAxis]) : null).filter(Boolean)[0] || [],
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

  // Auto-show chart when all selections are made, but only after first generate
  useEffect(() => {
    if (hasGenerated && xAxis && yAxis && chartType) {
      setShowChart(true);
    }
  }, [xAxis, yAxis, chartType, hasGenerated]);

  const handleExportPNG = () => {
    if (chartType === "3D Chart" && threeCanvasRef.current?.threeCanvas) {
      const canvas = threeCanvasRef.current.threeCanvas;
      const scene = threeSceneRef.current;
      const camera = threeCameraRef.current;
      if (canvas && scene && camera) {
        // Force a render before export
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (gl && scene && camera) {
          // Use the renderer from react-three-fiber if possible
          // But as a fallback, just use setTimeout
          setTimeout(() => {
            // This is a hack, but works for most cases
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = url;
            link.download = "chart.png";
            link.click();
          }, 100);
        }
      }
    } else if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const link = document.createElement("a");
      link.href = url;
      link.download = "chart.png";
      link.click();
    }
  };

  const handleExportPDF = () => {
    if (chartType === "3D Chart" && threeCanvasRef.current?.threeCanvas) {
      const canvas = threeCanvasRef.current.threeCanvas;
      const scene = threeSceneRef.current;
      const camera = threeCameraRef.current;
      if (canvas && scene && camera) {
        setTimeout(() => {
          const url = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(url, "PNG", 10, 10, 180, 100);
          pdf.save("chart.pdf");
        }, 100);
      }
    } else if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const pdf = new jsPDF();
      pdf.addImage(url, "PNG", 10, 10, 180, 100);
      pdf.save("chart.pdf");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full flex flex-col items-center animate-fadeInDown">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Upload Excel File</h1>
        <form
          className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-200 ${dragActive ? "border-green-400 bg-green-50" : "border-green-200 bg-white"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <FiUploadCloud className="text-5xl text-green-400 mb-2" />
          <p className="text-green-700 font-semibold mb-2">Drag & drop your .xls or .xlsx file here</p>
          <p className="text-gray-400 text-sm mb-2">or click to select a file</p>
          <input
            ref={inputRef}
            type="file"
            accept=".xls,.xlsx"
            className="hidden"
            onChange={handleChange}
          />
        </form>
        {file && (
          <div className="mt-6 w-full flex items-center justify-between bg-green-50 rounded-lg p-4 shadow animate-fadeIn">
            <div className="flex items-center gap-3">
              <FiFile className="text-2xl text-green-600" />
              <div>
                <div className="font-semibold text-green-800">{file.name}</div>
                <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</div>
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700 text-xl ml-2"
              onClick={handleRemove}
              title="Remove file"
            >
              <FiX />
            </button>
          </div>
        )}
        <button
          className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!file}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
      {/* Chart config section */}
      {showConfig && (
        <div ref={generateSectionRef} className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full mt-10 animate-fadeInDown">
          <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <FiBarChart2 className="text-2xl text-white" />
              <span className="text-2xl font-bold text-white">Generate Visualization</span>
            </div>
            <div className="text-white text-sm font-medium">Configure your chart settings and generate beautiful visualizations<br />Found 21 rows with columns: Day, Product, Price, # Sold</div>
          </div>
          <form className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6" onSubmit={e => { e.preventDefault(); setShowChart(true); setHasGenerated(true); }}>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-green-700 font-semibold mb-2">X-Axis Column</label>
              <select
                className="border border-green-200 rounded-lg px-4 py-2"
                value={xAxis}
                onChange={e => setXAxis(e.target.value)}
              >
                <option value="">Select X-axis</option>
                {dummyColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-green-700 font-semibold mb-2">Y-Axis Column</label>
              <select
                className="border border-green-200 rounded-lg px-4 py-2"
                value={yAxis}
                onChange={e => setYAxis(e.target.value)}
              >
                <option value="">Select Y-axis</option>
                {dummyColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-green-700 font-semibold mb-2">Chart Type</label>
              <select
                className="border border-green-200 rounded-lg px-4 py-2"
                value={chartType}
                onChange={e => setChartType(e.target.value)}
              >
                {chartTypes.map(type => (
                  <option key={type.label} value={type.label}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="w-full bg-green-400 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!xAxis || !yAxis}
              type="submit"
              onClick={() => { setShowChart(true); setHasGenerated(true); }}
            >
              <FiBarChart2 className="text-xl" /> Generate Chart
            </button>
          </form>
        </div>
      )}
      {showChart && (
        <div className="w-full min-h-[300px] flex flex-col items-center justify-center bg-green-50 rounded-xl shadow-inner p-6 animate-fadeIn">
          {/* Render chart based on selection */}
          {chartType === "Bar Chart" && xAxis && yAxis && (
            <div style={{ maxWidth: 500, maxHeight: 400, width: '100%' }}>
              <Bar ref={chartRef} data={chartData} style={{ maxWidth: 500, maxHeight: 400 }} />
            </div>
          )}
          {chartType === "Line Chart" && xAxis && yAxis && (
            <div style={{ maxWidth: 500, maxHeight: 400, width: '100%' }}>
              <Line ref={chartRef} data={chartData} style={{ maxWidth: 500, maxHeight: 400 }} />
            </div>
          )}
          {chartType === "Pie Chart" && xAxis && yAxis && (
            <div style={{ maxWidth: 500, maxHeight: 400, width: '100%' }}>
              <Pie ref={chartRef} data={pieData} style={{ maxWidth: 500, maxHeight: 400 }} />
            </div>
          )}
          {chartType === "Scatter Plot" && xAxis && yAxis && (
            <div style={{ maxWidth: 500, maxHeight: 400, width: '100%' }}>
              <Scatter ref={chartRef} data={scatterData} style={{ maxWidth: 500, maxHeight: 400 }} />
            </div>
          )}
          {chartType === "3D Chart" && xAxis && yAxis && showChart && (
            <div
              ref={threeCanvasRef}
              style={{ maxWidth: 500, maxHeight: 400, width: '100%', height: 400 }}
            >
              <Canvas
                style={{ width: '100%', height: 400, background: '#f0fdf4' }}
                camera={{ position: [0, 5, 12], fov: 50 }}
                onCreated={({ gl, scene }) => {
                  threeCanvasRef.current.threeCanvas = gl.domElement;
                  if (window.THREE && scene) {
                    scene.background = new window.THREE.Color('#f0fdf4');
                  }
                }}
              >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls enableZoom={false} />
                <group position={[0, -5, 0]}>
                  {/* Y Axis (vertical) */}
                  <mesh position={[-(dummyData.length * 2.5) / 2 - 0.7, 4, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 8, 16]} />
                    <meshStandardMaterial color="#888" />
                  </mesh>
                  {/* X Axis (horizontal) */}
                  <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.03, 0.03, 12, 16]} />
                    <meshStandardMaterial color="#888" />
                  </mesh>
                  {/* 3D Bar Chart: one bar per data point */}
                  {dummyData.map((row, idx) => {
                    const x = idx * 2.5 - (dummyData.length * 2.5) / 2;
                    const y = (row[yAxis] || 0) / 2;
                    const height = Math.max((row[yAxis] || 0), 0.1);
                    return (
                      <Box
                        key={idx}
                        args={[1, height, 1]}
                        position={[x, height / 2, 0]}
                      >
                        <meshStandardMaterial attach="material" color="#34d399" />
                        {/* X-axis label under each bar */}
                        <Text
                          position={[0, -height / 2 - 0.5, 0]}
                          fontSize={0.5}
                          color="#222"
                          anchorX="center"
                          anchorY="middle"
                        >
                          {row[xAxis]}
                        </Text>
                      </Box>
                    );
                  })}
                  {/* Y-axis ticks and labels */}
                  {[...Array(5)].map((_, i) => {
                    const value = Math.round(
                      (Math.max(...dummyData.map(row => row[yAxis] || 0)) / 4) * i
                    );
                    const y = (value / 2);
                    return (
                      <Text
                        key={i}
                        position={[-(dummyData.length * 2.5) / 2 - 1.2, y, 0]}
                        fontSize={0.4}
                        color="#222"
                        anchorX="right"
                        anchorY="middle"
                      >
                        {value}
                      </Text>
                    );
                  })}
                  {/* Axis labels */}
                  <Text position={[-(dummyData.length * 2.5) / 2 - 1.2, 4.5, 0]} fontSize={0.6} color="#222" anchorX="center" anchorY="bottom">
                    {yAxis}
                  </Text>
                  <Text position={[(dummyData.length * 2.5) / 2 + 0.7, -0.5, 0]} fontSize={0.6} color="#222" anchorX="left" anchorY="top">
                    {xAxis}
                  </Text>
                </group>
              </Canvas>
            </div>
          )}
          {chartType === "3D Chart" && showChart && (
            <div className="w-full flex justify-center">
              <span className="text-red-500 text-center font-semibold mb-4 block">
                Unsupported format for export
              </span>
            </div>
          )}
          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
              onClick={handleExportPNG}
            >
              Export PNG
            </button>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
              onClick={handleExportPDF}
            >
              Export PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
