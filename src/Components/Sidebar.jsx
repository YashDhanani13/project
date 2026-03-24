import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome, FiInbox, FiRadio, FiFileText, FiUsers,
  FiPhoneCall, FiCpu, FiSettings, FiUserPlus,
  FiPhone, FiBell, FiAlertCircle, FiSun, FiChevronRight,
  FiChevronLeft
} from "react-icons/fi";

const mainLinks = [
  { name: "Home", path: "/Home", },
  { name: "user", path: "/user", },
  { name: "services", path: "/services", },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-50"}
        bg-[#3c3737] text-black`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex w-200 items-center gap-2">

            <div className="leading-tight">
              <p className="text-blue-300 font-bold text-sm">class</p>
              <p className="text-orange-400 font-bold text-sm -mt-0.5">Mate</p>
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {mainLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            title={collapsed ? link.name : ""}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
              ${isActive(link.path)
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
          >
            <span className="flex-shrink-0">{link.icon}</span>

            {!collapsed && (
              <>
                <span className="flex-1">{link.name}</span>
                {link.hasArrow && (
                  <FiChevronRight size={14} className="text-gray-500" />
                )}
              </>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;