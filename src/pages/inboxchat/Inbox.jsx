import React from 'react'
import ChatConversation from './ChatConversation'
import ChatMain from './ChatMain'

const Inbox = () => {

    return (

        <div className="flex h-screen">

            <ChatConversation />

            <ChatMain />

        </div>

    )
}

export default Inbox