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
                                    ? 'self-end bg-mist-700 text-white  font-serif px-5 py-4 rounded-2xl max-w-800'
                                    : 'self-startbg-mist-700 text-white  font-serif px-4 py-2 rounded-2xl max-w-xs'
                            }
                        >r

                            {message.text}

                        </li>

                    ))
                }

            </ul>

        </div>

    )
}

export default ChatBox