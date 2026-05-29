import React, { useState } from 'react'
import { Sticker, SendHorizontal, Plus } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import socket from '../../socket'

const ChatInput = ({ selectedConversation }) => {
    const [message, setMessage] = useState('')
    const [showPicker, setShowPicker] = useState(false)

    const handleSendMessage = () => {
        // if  i can not  write so this  not  send   space    in
        if (!message.trim() || !selectedConversation?.room?.id) return

        const roomId = selectedConversation.room.id

        socket.emit('send_message', {
            roomId,
            text: message.trim(),
        })
        setMessage('')
        setShowPicker(false)
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

            <div className="flex items-center gap-2 bg-[#242626] rounded-full px-3.5 py-1 shadow-md">
                {/* // file   pick     add  */}
                <button
                    // onClick={() => setShowPicker(!showPicker)}
                    className="text-mist-500 hover:bg-olive-950 p-2 rounded-full transition cursor-pointer"
                >
                    <Plus size={28} />
                </button>

                {/* emoji picker     */}
                <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="text-mist-500 hover:bg-olive-950 p-2 rounded-full transition cursor-pointer"
                >
                    <Sticker size={28} />
                </button>

                {/* input  bar write the message   */}
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message"
                    className="flex-1 outline-none text-gray-400  font-serif text-1xl  caret-green-500"
                />

                {/* Messaeg  send  button  */}
                <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-green-500 p-3 rounded-full shadow-lg  transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
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
