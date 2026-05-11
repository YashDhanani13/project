import React from 'react'
import { Laugh, EllipsisVertical, Search } from 'lucide-react'

const ChatHeader = () => {
    return (
        <div className="bg-[#1c1c1e] border-b border-slate-700 px-5 py-3 flex items-center justify-between shadow-md">
            {/* Left Side */}
            <div className="flex items-center gap-4">
                {/* Profile */}
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Laugh className="text-cyan-400" size={26} />
                </div>

                {/* User Info */}
                <div>
                    <h2 className="text-white font-semibold text-lg leading-none">
                        Prince 🐒
                    </h2>

                    <p className="text-slate-400 text-sm mt-1 cursor-pointer hover:text-cyan-400 transition">
                        Click here for contact info
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                <div className="text-white px-5  cursor-pointer ">
                    <Search size={28} />
                </div>
                {/* Menu */}
                <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition cursor-pointer">
                    <EllipsisVertical className="text-slate-300" size={26} />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
