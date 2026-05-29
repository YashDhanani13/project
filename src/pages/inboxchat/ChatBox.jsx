import React, { useEffect, useRef } from 'react'

const ChatBox = ({ messages = [] }) => {
    const bottomRef = useRef(null)

    // auto  scroll to  div  touch messsage
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [messages])

    // time show in  beside the message
    const currentTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto p-5">
            <ul className="flex flex-col gap-4 mt-auto">
                {/*  render the messaage  */}
                {messages.map((message, index) => (
                    <li
                        key={message.id || index}
                        className={
                            message.sender === 'me'
                                ? 'self-end     bg-[#185618] border border-slate-800 text-white font-serif px-3 py-2.5 rounded-2xl rounded-br-none max-w-sm break-all'
                                : 'self-start bg-white 00 text-black border-black   font-serif px-3 py-2.5 rounded-2xl rounded-bl-none '
                        }
                    >
                        <div className="flex items-end gap-2">
                            <span>{message.text}</span>

                            <span className="px-0.5 relative left-1  -bottom-2  text-black -900  whitespace-nowrap sans-end">
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
