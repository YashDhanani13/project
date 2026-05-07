import React from 'react'
import { Sticker, SendHorizontal, Plus } from 'lucide-react'

const ChatInput = () => {
    return (
        <div className="flex  w-full  bg-gray-600 ">
            <Plus className="text-gray-800 m-3  cursor-pointer" size={29} />
            <Sticker className="text-gray-800 m-3 cursor-pointer  " size={29} />
            <input
                className=" bg-slate-700  text-gray-800 w-240 h-10 p-2 m-2 border border-gray-500 font-bold rounded-md "
                placeholder="Type a Message"
                type="text"
            />
            <button className="bg-gray-500 h-11 w-12 m-1 text-gray-300 cursor-pointer  flex  items-center justify-center                                                                                                                                     rounded-md  border  hover:bg-indigo-600   hover:text-black  border border-gray-800  ">
                <SendHorizontal className="" size={22} />
            </button>
        </div>
    )
}

export default ChatInput
