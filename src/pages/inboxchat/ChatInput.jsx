import React, { useState } from 'react'
import { Sticker, SendHorizontal, Plus } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

const ChatInput = ({ setMessages }) => {

    const [message, setMessage] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    // Send Message
    const handleSendMessage = () => {

        if (!message.trim()) return

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                text: message,
                sender: 'me',
            },
        ])

        setMessage('')
    }

    // Emoji Select
    const handleEmojiClick = (emojiObject) => {
        setMessage((prev) => prev + emojiObject.emoji)
    }

    return (
        <div className="border-t border-slate-700 bg-[#1c1c1e] p-4 relative">

            {/* Emoji Picker */}
            {showPicker && (
                <div className="absolute bottom-20 left-4">
                    <EmojiPicker className='bg-yellow-50' onEmojiClick={handleEmojiClick} />
                </div>
            )}

            <div className="flex items-center gap-3 bg-mist-800 rounded-lg  px-4 py-3 shadow-md">

                {/* Emoji Button */}
                <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="text-slate-400 hover:text-blue-600 transition  cursor-pointer"
                >
                    <Sticker size={28} />
                </button>

                {/* Input */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 outline-0 text-gray-300 font-bold text-lg "
                />

                {/* Send Button */}
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 p-3 hover:bg-gray-600 transition rounded-full shadow-lg"
                >
                    <SendHorizontal
                        className="text-white not-even:cursor-pointer "
                        size={20}
                    />
                </button>

            </div>

        </div>
    )
}

export default ChatInput