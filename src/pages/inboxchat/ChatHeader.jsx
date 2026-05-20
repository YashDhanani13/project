import React from 'react'
import { Laugh, EllipsisVertical, Search } from 'lucide-react'

const ChatHeader = ({ selectedConversation }) => {
    return (
        <div className="bg-[#1d1d22] border-b border-slate-700 px-5 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Laugh className="text-cyan-400" size={26} />
                </div>

                <div>
                    <h2 className="text-white font-semibold text-lg leading-none">
                        {selectedConversation?.contact?.name || 'Select Chat'}
                    </h2>

                    <p className="text-slate-400 text-sm mt-1 cursor-pointer hover:text-cyan-400 transition">
                        Click here for contact info
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-white p-3   cursor-pointer ">
                    <Search className="" size={19} />
                </div>

{/* more   add  this  */}
                <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition cursor-pointer">
                    <EllipsisVertical
                        className="text-slate-300 cursor-pointer"
                        size={26}
                    />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
