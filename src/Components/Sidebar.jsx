import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Users,
  Briefcase,
  Settings,
  ChevronRight,
  LogOut,
} from "lucide-react";

const mainLinks = [
  { name: "Home", path: "/Home", icon: <Home size={18} /> },
  { name: "user", path: "/user", icon: <Users size={18} /> },
  { name: "services", path: "/services", icon: <Briefcase size={18} /> },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
                  <ChevronRight size={14} className="text-gray-500" />
                )}
              </>
            )}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col gap-1 px-4 mb-4">
        <button
          onClick={() => setShowProfile(true)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all w-full text-left"
        >
          <Settings size={18} />
          {!collapsed && <span>Profile settings</span>}
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all w-full text-left"
        >
          <LogOut size={18} />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>

      {showProfile && (
        <div className="fixed  flex items-center justify-center z-40 ">
          <div className="bg-gray-500 relative left-20   rounded-xl shadow-xl  p-6 w-200 h-120 m-2">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 w-4 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gr ay-500 font-bold text-xs transition"
            >
              ✕
            </button>
            <UserProfile close={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
