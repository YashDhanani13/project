import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-violet-900 to-black   backdrop-blur-xl border-b border-slate-100 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between gap-6">


        <Link to="/" className="text-2xl font-bold tracking-tighter text-white flex items-center">
          <div className="w-8 h-6 rounded-lg"></div>
          ClassMate
        </Link>

        <div className="hidden lg:flex flex-1 max-w-md relative group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-lg  transition-all font-bold placeholder:text-slate-300"
          />
        </div>


        <div className="hidden md:flex items-center gap-2">
          {[
            { name: 'Home', path: '/' },
            { name: 'User', path: '/user' },
            { name: 'Services', path: '/services' },
            // { name: 'Contact', path: '/ },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${isActive(item.path)
                ? 'text-lime-700 bg-blue-50'
                : 'text-indigo-300 font-sans text-lg hover:text-gray-200 hover:bg-neutral-900'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>


        <div className="flex items-center gap-4">

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
          <Link to="/signup" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-black rounded-xl shadow-1xl shadow-gray-100 transition-all active:scale-95">
            Sign Up
          </Link>
          <button className="md:hidden p-2 text-slate-500">
            <FiMenu size={24} />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
