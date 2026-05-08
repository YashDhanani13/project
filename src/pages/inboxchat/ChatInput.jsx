import React from 'react'
import { Sticker, SendHorizontal, Plus, Mic } from 'lucide-react'

const ChatInput = () => {
    return (
        <div className=" bg-mist-900 border-t border-gray-700 px-4 py-3">
            <div className="flex items-center gap-3 absolute   bottom-2 m-2 w-300 bg-mist-800 rounded-3xl px-4 py-2 shadow-md">
                {/* Plus Icon */}
                <button className="text-slate-400 hover:text-cyan-400 cursor-pointer transition">
                    <Plus size={32} />
                </button>

                {/* Sticker / Emoji */}
                <button className="text-slate-400 hover:text-yellow-400 cursor-pointer  transition px-2">
                    <Sticker size={32} />
                </button>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1  bg-transparent outline-none font-black text-1xl  text-gray-400 placeholder:text-slate-400"
                />
                {/* Send Button */}

                <button className="bg-blue-500 p-3 cursor-pointer hover:bg-cyan-600 transition rounded-full shadow-lg">
                    <SendHorizontal className="text-white" size={20} />
                </button>
            </div>
        </div>
    )
}

export default ChatInput
