import React from 'react'
import { EllipsisVertical, Search, Laugh, MessageCircle } from 'lucide-react'
import ChatMain from './ChatMain'

const ChatConversation = () => {
    return (
        <div className="w-[380px] h-screen bg-[#1c1c1e]  border-r border-slate-700 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                    ClassMate
                </h1>

                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-full hover:bg-slate-800 transition">
                        <EllipsisVertical
                            className="text-slate-300"
                            size={22}
                        />
                    </button>
                </div>
            </div>

            {/* Search  bar  main  */}
            <div className="p-4">
                <div className="flex items-center w-full bg-slate-800 rounded-full px-4 py-2">
                    <Search className="text-slate-400" size={30} />

                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        className="bg-transparent outline-none text-white placeholder:text-slate-400 ml-3 w-full text-sm"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {/* Chat Card */}
                <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-800 transition cursor-pointer border-b border-slate-800">
                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <Laugh className="text-cyan-400" size={28} />
                        </div>

                        {/* Info */}
                        <div>
                            <h2 className="text-white font-semibold text-base">
                                Narindara modi
                            </h2>

                            <p className="text-slate-400 text-sm truncate w-44">
                                last message today
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-slate-400">10:45 PM</span>

                        <div className="bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            2
                        </div>
                    </div>
                </div>

                {/* Duplicate Cards Demo */}
                <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-800 transition cursor-pointer border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <Laugh className="text-pink-400" size={28} />
                        </div>

                        <div>
                            <h2 className="text-white font-semibold text-base">
                                Virat kohil
                            </h2>

                            <p className="text-slate-400 text-sm truncate w-44">
                                Let's meet tomorrow 🚀
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-slate-400">9:10 PM</span>

                        <div className="bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatConversation
