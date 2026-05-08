import React from 'react'
import ChatConversation from './ChatConversation'
import ChatMain from './ChatMain'
import ChatBox from './ChatBox'
const Inbox = () => {
    return (
        <div className=" flex ">
            <ChatConversation />
            <ChatMain />
        </div>
    )
}

export default Inbox
