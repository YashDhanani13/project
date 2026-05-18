import React, { useState } from 'react'
import { Sticker, SendHorizontal } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import socket, { refreshSocketAuth } from '../../socket'

const ChatInput = ({ setMessages, selectedConversation }) => {
    const [message, setMessage] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    // ✅ Only the changed part — optimistic message
    const handleSendMessage = () => {
        if (!message.trim() || !selectedConversation?.room?.id) return

        const roomId = selectedConversation.room.id

        socket.emit('send_message', {
            roomId,
            text: message.trim(),
        })

        // ✅ Include senderId so isMyMessage works
        const newMsg = {
            id: Date.now(),
            text: message.trim(),
            senderId: getCurrentUserId(),
            sender: 'me',
            createdAt: new Date().toISOString(),
        }

        setMessages(newMsg)
        setMessage('')
    }
    const handleEmojiClick = (emojiObject) => {
        setMessage((prev) => prev + emojiObject.emoji)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage()
    }

    return (
        <div className="p-2 m-4 relative">
            {showPicker && (
                <div className="absolute bottom-20 left-4 z-10">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}

            <div className="flex items-center gap-3 bg-mist-800 rounded-full px-3.5 py-1.5 shadow-md">
                {/* Emoji Button */}
                <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="text-slate-500 hover:bg-zinc-700 p-2 rounded-full transition cursor-pointer"
                >
                    <Sticker size={28} />
                </button>

                {/* Input */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    className="flex-1 outline-none text-gray-300 text-base bg-transparent caret-green-600"
                />

                {/* Send Button */}
                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-green-500 p-3 rounded-full shadow-lg transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
                >
                    <SendHorizontal
                        className="text-black cursor-pointer"
                        size={24}
                    />
                </button>
            </div>
        </div>
    )
}

export default ChatInput
