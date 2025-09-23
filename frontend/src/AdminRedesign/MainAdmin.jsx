import React, { useState } from 'react';
import AdminLeftBar from './AdminLeftBar';
import AdminTopNavbar from './AdminTopNavbar';
import Render1 from './Render1';

const MainAdmin = () => {
  const [activePanel, setActivePanel] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePanelChange = (panel) => {
    setActivePanel(panel);
    setIsSidebarOpen(false); // Hide sidebar on mobile
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-100">
      <div className="w-full">
        <AdminTopNavbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <AdminLeftBar changePanel={handlePanelChange} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Render1 activePanel={activePanel} />
        </div>
      </div>
    </div>
  );
};

export default MainAdmin;
