import React from 'react'
import { Link , useNavigate  } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'







const Home = () => {
    const navigate = useNavigate()


    const handleSubmit = () => {

        // redireact(navigate("/login"));
        navigate('/login');
    }


    return (
        <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 pt-20 overflow-hidden">

            {/* 🔥 Gradient Background Glow */}
            <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-[140px] rounded-full"></div>

            {/* ✨ Grid Background (very premium touch) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

            {/* 🧊 Floating Cards */}
            <div className="hidden md:block absolute left-16 top-40 bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-5 w-44 border border-white/40">
                <p className="text-sm font-semibold">Revenue</p>
                <p className="text-xs text-slate-500">$12,400</p>
            </div>

            <div className="hidden md:block absolute right-16 top-52 bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-5 w-44 border border-white/40">
                <p className="text-sm font-semibold">Growth</p>
                <p className="text-xs text-slate-500">+32%</p>
            </div>

            <section className="relative z-10 px-6 py-28 flex flex-col items-center text-center max-w-5xl mx-auto">

                {/* 🏷 Badge */}
                <span className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                    New Arrival 2026
                </span>

                {/* 🧠 Heading */}
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                    Build Faster with{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text">
                        Simplicity.
                    </span>
                </h1>

                {/* 📄 Description */}
                <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed">
                    A modern platform designed to help developers and teams ship
                    faster, scale smarter, and create beautiful digital experiences.
                </p>

                {/* 🚀 CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                        className="group px-10 py-4 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
                    onClick={handleSubmit}
                        to="/signup"
                    >
                        Get Started
                        <FiArrowRight className="group-hover:translate-x-1 transition" />

                    </button>

                    <Link
                        to="/about"
                        className="px-10 py-4 bg-white/70 backdrop-blur-md border border-slate-200 text-slate-700 rounded-2xl font-semibold hover:bg-white transition-all text-lg"
                    >
                        Our Story
                    </Link>
                </div>

                {/* 📊 Stats */}
                <div className="flex flex-wrap justify-center gap-10 mt-16 text-center">
                    <div>
                        <h3 className="text-3xl font-bold">10K+</h3>
                        <p className="text-slate-500 text-sm">Active Users</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">99.9%</h3>
                        <p className="text-slate-500 text-sm">Uptime</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold">24/7</h3>
                        <p className="text-slate-500 text-sm">Support</p>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Home