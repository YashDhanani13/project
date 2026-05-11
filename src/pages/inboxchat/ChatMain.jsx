import React, { useState } from 'react'
import ChatBox from './ChatBox'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

const ChatMain = () => {

    // Shared Messages State
    const [messages, setMessages] = useState([])

    return (

        <div className="flex-1 bg-[#0b141a] flex flex-col h-screen">

            {/* Header */}
            <ChatHeader />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">

                <ChatBox messages={messages} />

            </div>

            {/* Input */}
            <ChatInput
                setMessages={setMessages}
            />

        </div>

    )
}

export default ChatMain