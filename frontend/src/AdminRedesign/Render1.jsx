import React from 'react';
import Dashboard from './Dashboard';
import Staff from './Staff';
import Employees from './Employees';

const Render1 = ({ activePanel }) => {
  const renderContent = () => {
    switch (activePanel) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Staff':
        return <Staff />;
      case 'Employees':
        return <Employees />;
      case 'Startup List':
        return <div className="p-6 text-black">Startup List Content</div>;
      case 'Seed Fund Module':
        return <div className="p-6 text-black">Seed Fund Module Content</div>;
      default:
        return <div className="p-6 text-black">No content available</div>;
    }
  };

  return (
    <div className="min-h-full w-full bg-white text-black">
      {renderContent()}
    </div>
  );
};

export default Render1;
