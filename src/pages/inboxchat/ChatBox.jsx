import React, { useEffect, useRef } from 'react'

const ChatBox = ({ messages = [] }) => {

    const bottomRef = useRef(null)

    // Auto scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView(
            {
                behavior: 'smooth'

            })
    }, [messages])




    const currentTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto p-5">
            <ul className="flex flex-col gap-4 mt-auto">

                {messages.map((message, index) => (
                    <li
                        key={message.id || index}
                        className={
                            message.sender === 'me'
                                ? 'self-end     bg-[#1d26db] border border-slate-800 text-white font-serif px-2.5 py-2.5 rounded-2xl rounded-br-none max-w-sm break-all'
                                 // ? 'self-end     bg-[#1e8e3c] border border-slate-800 text-white font-serif px-2.5 py-2.5 rounded-2xl rounded-br-none max-w-sm break-all'
                                : 'self-start bg-slate-700 text-white font-serif px-4 py-3 rounded-2xl rounded-bl-none max-w-sm break-all'
                        }
                    >
                        <div className="flex items-end gap-2">
                            <span>{message.text}</span>

                            <span className="px-0.5 text-black  whitespace-nowrap self-end">
                                {currentTime(message.createdAt)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Scroll anchor */}
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatBox

