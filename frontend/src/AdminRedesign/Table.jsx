// components/StartupTable.jsx
import React, { useState } from "react";
import { Download, CalendarDays, ChevronDown, Search, Plus, ArrowRightToLine,ArrowLeftToLine, FileSpreadsheet  } from "lucide-react";
import { RiFileExcel2Fill } from "react-icons/ri";
import {
  ArrowUpRight,
  Building2,
  BadgeCheck,
  Clock,
  Ticket,
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


 // Assuming you have a DownloadAnimation component


// data of all the startups
const allStartups = [
  { srNo: 1, name: "TechNova", regNumber: "REG12345", dateOfApplication: "2023-05-12", actionDate: "2023-06-01", status: "Approved", comment: "Great potential in AI sector" },
  { srNo: 2, name: "InnoHub", regNumber: "REG67890", dateOfApplication: "2023-04-18", actionDate: "2023-05-05", status: "Pending", comment: "Awaiting further documentation" },
  { srNo: 3, name: "ByteBridge", regNumber: "REG11223", dateOfApplication: "2023-06-10", actionDate: "2023-07-01", status: "Rejected", comment: "Did not meet eligibility criteria" },
  { srNo: 4, name: "CodeNest,", regNumber: "REG44556", dateOfApplication: "2023-05-25", actionDate: "2023-06-15", status: "Approved", comment: "Strong team with innovative ideas" },
  { srNo: 5, name: "NextStack", regNumber: "REG77889", dateOfApplication: "2023-07-02", actionDate: "2023-07-20", status: "Pending", comment: "Needs more market research" },
  { srNo: 6, name: "SoftSeed", regNumber: "REG99001", dateOfApplication: "2023-06-05", actionDate: "2023-07-01", status: "Approved", comment: "Excellent business model and execution plan" },
  { srNo: 7, name: "Innovent", regNumber: "REG20234", dateOfApplication: "2023-07-11", actionDate: "2023-08-01", status: "Pending", comment: "Further evaluation required" },

];

const statusColors = {
  Approved: "text-green-600 bg-green-100",
  Pending: "text-yellow-600 bg-yellow-100",
  Rejected: "text-red-600 bg-red-100",
};

  
const rowsPerPage = 5;

const StartupTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(""); // Controls selected ID for details
  const [detailsView, setDetailsView] = useState(false); // Controls if third
 

  const statusOptions = ["Approved", "Pending", "Rejected"];

  const totalPages = Math.ceil(allStartups.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = allStartups.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSelect = (id) => {
		setSelectedId(id);
		setDetailsView(true); // Show third section when an item is selected
	};

  return (
    <div className="">
      

  
      
    <div className="p-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">

   
      <div className="flex justify-between items-center  ">
       <h1 className="text-2xl font-semibold text-gray-800 mb-4 px-2 pt-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
        
      </h1>
     <button  className="text-emerald-500 text-xs mt-5 mr-5 border border-emerald-500 px-4 py-2 rounded-xl mb-4 hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-emerald-700 hover:border-emerald-700 hover:text-white transition-colors">
  <RiFileExcel2Fill className="inline mr-2 mb-0.5 text-emerald-500" size={14} />
  Export Excel
</button>
        </div>
    <div className=" bg-white rounded-xl border border-gray-200 ">
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6 px-8 pt-5">
  {/* Search Bar - stays on the left */}
  <div className="flex items-center px-3 py-2 rounded-md   w-full sm:w-1/3 focus-within:ring-2 focus-within:ring-orange-500">
    <Search className="text-gray-500 mr-2 " size={18} />
    <input
      type="text"
      placeholder="Search Startup..."
      className="bg-transparent outline-none text-sm w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>

  {/* Grid for right-aligned filters */}
  <div className="grid sm:grid-cols-2 gap-2 w-full sm:w-auto sm:ml-auto">
    {/* Date Range Selector */}
    <div className="flex items-center bg-white border  px-3 py-2 rounded-xl text-sm space-x-1 hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <CalendarDays className="text-gray-500" size={16} />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="From"
        className="outline-none bg-transparent w-[90px]"
        dateFormat="dd/MM/yyyy"
      />
      <span className="text-gray-400">-</span>
      <CalendarDays className="text-gray-500" size={16} />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        placeholderText="To"
        className="outline-none bg-transparent w-[90px]"
        dateFormat="dd/MM/yyyy"
      />
    </div>

    {/* Status Selector */}
    <div className="relative w-full">
      <button
        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-xl text-sm text-gray-700 hover:bg-gray-50"
      >
        <span>{statusFilter || "Status"}</span>
        {showStatusDropdown ? <ChevronDown size={16} /> : <ChevronDown size={16} />}
      </button>
      {showStatusDropdown && (
        <div className="absolute mt-1 w-full bg-white border rounded-xl hover:drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] z-10">
          {statusOptions.map((status) => (
            <div
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setShowStatusDropdown(false);
              }}
              className="px-4 py-2 text-sm rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Status Legends */}
    
  </div>
</div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border-t  border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 border-r">Sr. No.</th>
              <th className="px-4 py-3 border-r">Startup Name</th>
              <th className="px-4 py-3 border-r">Registration Number</th>
              <th className="px-4 py-3 border-r">Date Of Application</th>
              <th className="px-4 py-3 border-r">Action Date</th>
              <th className="px-4 py-3 border-r">Status</th>
              <th className="px-4 py-3 border-r">Comments</th>
              <th className="px-4 py-3 text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((startup, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 hover:scale-105 transition-transform ease-in-out duration-1000">
                <td className="px-4 py-3 text-xs">{startup.srNo}</td>
                <td className="px-4 py-3 text-xs">{startup.name}</td>
                <td className="px-4 py-3 text-xs">{startup.regNumber}</td>
                <td className="px-4 py-3 text-xs">{startup.dateOfApplication}</td>
                <td className="px-4 py-3 text-xs">{startup.actionDate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[startup.status]}`}>
                    {startup.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs">
                    {startup.comment ? (
                      <span className="text-gray-600 text-xs">{startup.comment}</span>
                    ) : (
                      <span className="text-gray-400 text-xs">No comments</span>
                    )}
                    </td>
                <td className="px-4 py-3 text-center">
                  <button className="text-emerald-600 hover:text-blue-800 transition">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>     
        {/* Pagination */}
<div className="flex flex-col sm:flex-row sm:justify-between items-center mt-6 px-6 pb-4">
  <p className="text-xs text-gray-500 mb-2 sm:mb-0">
    Showing <span className="text-emerald-600">{startIndex + 1} to {Math.min(startIndex + rowsPerPage, allStartups.length)} </span> of {allStartups.length} entries
  </p>


  <div className="flex justify-center items-center space-x-1 w-full sm:w-auto">
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-2 py-1 text-xs rounded border ${
        currentPage === 1 ? "text-gray-300" : "hover:bg-gray-100"
      }`}
    >
      <ArrowLeftToLine size={14} />
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`px-2 py-1 text-xs rounded border ${
          currentPage === i + 1
            ? "bg-gray-700 font-semibold"
            : "hover:bg-gray-100 bg-gray-700"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-2 py-1 text-xs rounded border ${
        currentPage === totalPages ? "text-gray-300" : "hover:bg-gray-100 text-gray-900"
      }`}
    >
      <ArrowRightToLine size={14} />
    </button>
  </div>
</div>


</div>

      </div>


      {/* downloading excel animation pop up dialog box */}

      
    </div>
    </div>
 
  );
};

export default StartupTable;
