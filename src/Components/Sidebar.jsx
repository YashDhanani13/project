import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import UserProfile from "../pages/user-profile/UserProfile";
import {
  Home,
  Users,
  Briefcase,
  Settings,
} from "lucide-react";

const mainLinks = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Contacts", path: "/contacts", icon: <Users size={18} /> },
  { name: "Employee", path: "/employees", icon: <Briefcase size={18} /> },
];

const Sidebar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
   
    <div className="flex min-h-screen">

      {/* ── Sidebar ── always visible */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300
          ${collapsed ? "w-16" : "w-52"}
          bg-[#3c3737] text-white`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-blue-300 font-bold text-sm">class</p>
              <p className="text-orange-400 font-bold text-sm -mt-0.5">Mate</p>
            </div>
          )}
          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition ml-auto"
          >
            <span className="text-xs">{collapsed ? "→" : "←"}</span>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              title={collapsed ? link.name : ""}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${isActive(link.path)
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              {!collapsed && <span className="flex-1">{link.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom — Profile Settings */}
        <div className="flex flex-col gap-1 px-4 mb-4">
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all w-full text-left"
          >
            <Settings size={18} />
            {!collapsed && <span>Profile Settings</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content — Outlet renders here ── */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? "ml-16" : "ml-52"}`}>
        <Outlet /> {/* ✅ pages render here, outside sidebar */}
      </main>

      {/* ── Profile Modal ── */}
      {showProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/40">
          <div className="bg-gray-500 relative rounded-xl shadow-xl p-6 w-96 m-2">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 font-bold text-xs transition"
            >
              ✕
            </button>
            <UserProfile close={() => setShowProfile(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;