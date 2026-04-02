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

  const location = useLocation();

  // const isActive = (path) => location.pathname === path;

  return (
   
    <div className="flex min-h-screen">

        {/* Bottom — Profile Settings */}
        <div className="flex flex-col gap-1 px-4 mb-4">
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-all w-full text-left"
          >
            <Settings size={18} />
           <span>Profile Settings</span>
          </button>
        </div>
    

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