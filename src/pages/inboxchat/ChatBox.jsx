import React, { useEffect, useRef } from 'react'

const ChatBox = ({ messages = [] }) => {
    const bottomRef = useRef(null)

    // Auto scroll to latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="flex-1 overflow-y-auto p-5">
            <ul className="flex flex-col gap-4">
                {/* {messages.length === 0 && (
                    // <p className="text-center text-slate-500 text-sm mt-10">
                    //     No messages yet. Say hello! 👋
                    // </p>
                )} */}

                {messages.map((message, index) => (
                    <li
                        key={message.id || index}
                        className={
                            message.sender === 'me'
                                ? 'self-end bg-[#20341c] text-white font-serif px-5 py-3 rounded-2xl rounded-br-none max-w-sm break-words'
                                : 'self-start bg-slate-700 text-white font-serif px-4 py-3 rounded-2xl rounded-bl-none max-w-sm break-words'
                        }
                    >
                        {message.text}
                    </li>
                ))}
            </ul>

            {/* Scroll anchor */}
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatBox
