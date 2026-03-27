import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-neutral-700   to-indigo-950 border-t border-gray-700 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tighter text-white flex items-center"
            >
              <div className="w-8 h-6 rounded-lg"></div>
              ClassMate
            </Link>
            <p className="text-black leading-relaxed font-bold">
              We make digital products that matter. Simple, fast, and
              high-performance solutions for modern brands.
            </p>

            {/* // social mediaa  handlears   */}

            <div className="flex gap-4 text-slate-400">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Twitter
                  className="hover:text-black cursor-pointer transition-colors"
                  size={20}
                />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  className="hover:text-slate-900 cursor-pointer transition-colors"
                  size={20}
                />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  className="hover:text-black cursor-pointer transition-colors"
                  size={20}
                />
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-300 ">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-black hover:text-violet-300 transition-colors font-bold"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-black hover:text-violet-300 transition-colors font-bold"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-black hover:text-violet-300 transition-colors font-bold"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-300">
              Resources
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-black hover:text-violet-300 transition-colors font-bold"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-violet-300 transition-colors font-bold"
                >
                  API Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-violet-300 transition-colors font-bold"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-300">
              Newsletter
            </h3>
            <p className="text-black   font-bold">
              Subscribe to our monthly drop of digital insights.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your email"
                className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-black hover:bg-slate-800 transition-all">
                Go
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-black uppercase tracking-tighter">
          <p>© 2026 ClassMate INC.</p>
          <div className="flex gap-10 text-gray-300">
            <a href="#" className="hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-900">
              Terms
            </a>
            <a href="#" className="hover:text-slate-900">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
