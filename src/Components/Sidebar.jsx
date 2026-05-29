import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Inbox } from 'lucide-react'
import Signup from '../pages/signup/Signup'
import UserProfile from '../pages/user-profile/UserProfile'
import { Home, Users, Briefcase, Settings, Power } from 'lucide-react'

//  const navigate = useNavigate();
  
const mainLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Contacts', path: '/contacts', icon: <Users size={20} /> },
    { name: 'Employee', path: '/employees', icon: <Briefcase size={20} /> },
    { name: 'Inbox ', path: '/inbox', icon: <Inbox size={20} /> },
]

const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
    // useNavigate("/login");
}

const Sidebar = () => {
    const [showProfile, setShowProfile] = useState(false)
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <div className="flex h-20">
            {/* ── Sidebar ── always visible */}
            <aside
                className={`fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300
          ${collapsed ? 'w-16' : 'w-52'}
          bg-mist-900 text-black`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                    {!collapsed && (
                        <div className="leading-tight flex gap-2  ">
                            <p className="font-serif text-2xl text-mist-200 ">
                                Class Mate{' '}
                            </p>
                        </div>
                    )}
                    {/* side bar    toggle */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-gray-400 hover:text-white transition ml-auto"
                    >
                        <span className="text-xs">{collapsed ? '→' : '←'}</span>
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
                    {mainLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            title={collapsed ? link.name : ''}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                    isActive(link.path)
                        ? 'bg-white/10 text-white'
                        : 'text-gray-600 hover:bg-white/10 hover:text-white'
                }`}
                        >
                            <span className="flex-shrink-0">{link.icon}</span>
                            {!collapsed && (
                                <span className="flex-1">{link.name}</span>
                            )}
                        </Link>
                    ))}
                </nav>
                <div className="p-4">
                    {' '}
                    {/* Bottom — Profile Settings */}
                    <button
                        onClick={() => setShowProfile(true)}
                        className="flex items-center gap-3 px-1.5 py-3 rounded-lg text-sm font-medium text-white cursor-pointer   hover:text-orange-300 transition-all w-42 text-left"
                    >
                        <Settings size={18} />
                        {!collapsed && <span>Profile Settings</span>}
                    </button>
                    <button
                        onClick={() => logout(true)}
                        className="flex items-center gap-3 px-2 py-2  cursor-pointer rounded-lg text-sm font-medium text-red-400  hover:text-gray-400  transition-all w-full text-left"
                    >
                        <Power size={19} />
                        {/* <LogOut size={18} /> */}
                        {!collapsed && <span>Log out</span>}
                    </button>
                </div>
            </aside>

            {/* ── Main Content — Outlet renders here ── */}
            <main
                className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-52'}`}
            >
                <Outlet />
            </main>

            {/* ── Profile Modal ── */}
            {showProfile && (
                <div className="fixed inset-0   flex items-center justify-center  z-60 bg-black/60">
                    <div className="  border-x-violet-400  border-2  bg-gradient-to-b  from-slate-800 to-slate-700  relative rounded-md shadow-xl p-8 w-220 h-175 m-2">
                        <button
                            onClick={() => setShowProfile(false)}
                            className="absolute top-0   right-0 w-9 h-8 flex rounded-xs items-center justify-center p-4 bg-gray-100  hover:bg-red-500 hover:text-white text-gray-500 font-bold text-xs transition cursor-pointer"
                        >
                            ✕
                        </button>
                        <UserProfile close={() => setShowProfile(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar
