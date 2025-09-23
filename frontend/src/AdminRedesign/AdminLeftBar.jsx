import React, { useState } from 'react';
import {
  LayoutDashboard,
  UserCircle,
} from 'lucide-react';
import classNames from 'classnames';

const AdminLeftBar = ({ changePanel }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Staff", icon: UserCircle },
    { label: "Employees", icon: UserCircle },
  ];

  const handleMenuClick = (label) => {
    setActiveItem(label);
    changePanel(label);
  };

  return (
    <aside className="w-full h-full flex flex-col border-r border-gray-200 shadow-md bg-white">
      <div className="flex items-center gap-4 border-b border-gray-200 p-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center">
          <img src="/buddha.png" alt="Logo" className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">Buddha Samyak</h1>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleMenuClick(label)}
            className={classNames(
              'flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all text-sm font-medium',
              activeItem === label
                ? 'bg-black text-white'
                : 'hover:bg-gray-100 text-black'
            )}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AdminLeftBar;
