import React, { useState } from 'react'
import ChatConversation from './ChatConversation'
import ChatMain from './ChatMain'

const Inbox = () => {
    const [selectedConversation, setSelectedConversation] = useState(null)
    return (
        <div className="flex h-screen">
            <ChatConversation
                setSelectedConversation={setSelectedConversation}
            />
            <ChatMain selectedConversation={selectedConversation} />
        </div>
    )
}

export default Inbox
