import React from 'react'
import ChatBox from './ChatBox'
import ChatHeader from './ChatHeader'

import ChatInput from './ChatInput'

const ChatMain = () => {
    return (
        <div className="bg-mist-900 ">
            <div className="w-310">
                <ChatHeader />
                <ChatBox />
                <ChatInput />
            </div>
        </div>
    )
}

export default ChatMain
