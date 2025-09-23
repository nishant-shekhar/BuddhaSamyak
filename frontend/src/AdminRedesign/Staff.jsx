import React, { useState } from "react";
import { X } from "lucide-react"; // for cross icon
import { motion, AnimatePresence } from "framer-motion";
import Employees from "./Employees";


import {
  Users,
  CheckCircle,
  XCircle,
  PlaneTakeoff,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement, // ✅ required for Doughnut & Pie
} from "chart.js";
import Table from "./Table"; // Assuming you have a Table component


ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);


const Staff = () => {
    const [showModal, setShowModal] = useState(false);
    const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "5%",
      opacity: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Present",
        data: [30, 32, 29, 35, 33, 20],
        backgroundColor: "#22c55e",
      },
      {
        label: "Absent",
        data: [2, 3, 4, 1, 2, 5],
        backgroundColor: "#ef4444",
      },
      {
        label: "Leave",
        data: [1, 0, 1, 0, 1, 2],
        backgroundColor: "#facc15",
      },
    ],
  };

  const attendanceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const doughnutData = {
  labels: ["Absent", "Present"],
  datasets: [
    {
      label: "Applications",
      data: [340, 80],
      backgroundColor: [ "#8b5cf6", "#34d399"],
      borderWidth: 2,
      borderColor: "#fff",
      hoverOffset: 6,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%", // Optional: Makes it look like a ring
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        boxWidth: 10,
        color: "#4b5563",
        font: {
          size: 10,
        },
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          const label = context.label || '';
          const value = context.raw || 0;
          return `${label}: ${value}`;
        },
      },
    },
  },
  layout: {
    padding: 0,
  },
  // ❌ Hide all unnecessary elements
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};



  return (
    
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Staff Attendance Overview</h1>

      <div className="grid grid-cols-3 gap-4">
  {/* Left Section - 4 Tiles in 2x2 grid */}
  <div className="grid grid-cols-2 gap-4 col-span-2">
    {/* Tile 1 */}
    <div
    onClick={() => setShowModal(true)}
    className="bg-blue-500 text-white rounded-2xl p-5 shadow-md h-40 flex flex-col justify-between">
      <div>
        <h3 className="text-sm">Total Employee</h3>
        <h1 className="text-2xl font-bold">26</h1>
      </div>
      <div className="text-sm">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">+15%</span>
        <span className="ml-2">4 Employee Hiring</span>
      </div>
    </div>

    {/* Tile 2 */}
    <div className="bg-white text-black rounded-2xl p-5 shadow-md h-40 flex flex-col justify-between">
      <div>
        <h3 className="text-sm">Total Presents</h3>
        <h1 className="text-2xl font-bold">4</h1>
      </div>
      <div className="text-sm">
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">-64%</span>
        <span className="ml-2">Daily Attendance</span>
      </div>
    </div>

    {/* Tile 3 */}
    <div className="bg-white text-black rounded-2xl p-5 shadow-md h-40 flex flex-col justify-between">
      <div>
        <h3 className="text-sm">Total Absents</h3>
        <h1 className="text-2xl font-bold">11</h1>
      </div>
      <div className="text-sm">
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">-54%</span>
        <span className="ml-2">New Recruitment</span>
      </div>
    </div>

    {/* Tile 4 */}
    <div className="bg-white text-black rounded-2xl p-5 shadow-md h-40 flex flex-col justify-between">
      <div>
        <h3 className="text-sm">Total Leave</h3>
        <h1 className="text-2xl font-bold">11</h1>
      </div>
      <div className="text-sm">
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">-54%</span>
        <span className="ml-2">Need New Employee</span>
      </div>
    </div>
  </div>

  {/* Right Section - Chart or Stats */}
  <div className="bg-white rounded-2xl shadow-md p-5 col-span-1 h-[336px]">
    <div className="flex justify-between items-center mb-4">
     

    </div>
    {/* Your chart goes here */}
    <div className="h-full flex items-center justify-center text-gray-400">
      {/* Placeholder */}
     <Doughnut data={doughnutData} options={doughnutOptions} />
    </div>
  </div>
</div>

    <Table />


 {/* Slide-up Modal */}
          <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white w-[90%] h-[90%] rounded-3xl p-6 shadow-lg relative overflow-y-auto overflow-x-hidden"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
              >
                <X />
              </button>

              {/* Modal Content */}
             <Employees />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Staff;
