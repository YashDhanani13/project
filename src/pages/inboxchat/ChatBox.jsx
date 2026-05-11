import React from 'react'

const ChatBox = ({ messages }) => {

    // socket.on("receive_message")

    return (

        <div className="flex-1 overflow-y-auto p-5">

            <ul className="flex flex-col gap-4">

                {
                    messages.map((message) => (

                        <li
                            key={message.id}
                            className={
                                message.sender === 'me'
                                    ? 'self-end bg-cyan-500 text-white px-4 py-2 rounded-2xl max-w-xs'
                                    : 'self-start bg-slate-700 text-white px-4 py-2 rounded-2xl max-w-xs'
                            }
                        >

                            {message.text}

                        </li>

                    ))
                }

            </ul>

        </div>

    )
}

export default ChatBox