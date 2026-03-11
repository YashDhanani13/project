import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiPackage, FiCreditCard, FiStar, FiZap, FiShield } from "react-icons/fi";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20">

      <section className="px-6 py-24 flex flex-col items-center text-center max-w-5xl mx-auto">
        <span className="bg-blue-200 text-blue-600 px-4 py-1.5 rounded-full text-sm  font-bold
         tracking-widest uppercase mb-6 inline-block">
          New Arrival 2026
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-slate-900">
          Quality Meets <span className="text-blue-600">Simplicity.</span>
        </h1>
        <p className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
          Experience a new era of digital excellence. We combine professional performance with a fresh, clean interface.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link to="/signup" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 text-lg flex items-center justify-center gap-2">
            Get Started <FiArrowRight />
          </Link>
          <Link to="/about" className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95 text-lg">
            Our Story
          </Link>
        </div>
      </section>
    </div>
  )
};


export default Home;
