import React, { useEffect, useState, useCallback } from 'react'
import ChatBox from './ChatBox'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import socket from '../../socket'
import { getAuthHeaders, getCurrentUserId } from '../../utils/authToken'
import newjpeg from '../../../public/new.jpeg'

const ChatMain = ({ selectedConversation }) => {
    const [allMessages, setAllMessages] = useState({})
    const [loading, setLoading] = useState(false)
    const currentUserId = getCurrentUserId()
    const messages = allMessages[selectedConversation?.room?.id] || []

    const isMyMessage = useCallback(
        (senderId) =>
            currentUserId && String(senderId) === String(currentUserId),
        [currentUserId]
    )

    useEffect(() => {
        if (!selectedConversation?.room?.id) return
        const roomId = selectedConversation.room.id

        const fetchMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(
                    `http://localhost:3000/api/messages/${roomId}`,
                    { headers: getAuthHeaders() }
                )
                const data = await res.json()

                if (data.success) {
                    const formatted = data.data
                        .filter((msg) => !msg.isDeleted)
                        .map((msg) => ({
                            id: msg.id,
                            text: msg.text,
                            senderId: msg.senderId,
                            sender: isMyMessage(msg.senderId) ? 'me' : 'other',
                            createdAt: msg.createdAt,
                        }))

                    setAllMessages((prev) => ({
                        ...prev,
                        [roomId]: formatted,
                    }))
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [selectedConversation?.room?.id])

    useEffect(() => {
        const handleReceive = (message) => {
            setAllMessages((prev) => ({
                ...prev,
                [message.roomId]: [
                    ...(prev[message.roomId] || []),
                    {
                        id: message.id,
                        text: message.text,
                        senderId: message.senderId,
                        sender: isMyMessage(message.senderId) ? 'me' : 'other',
                        createdAt: message.createdAt,
                    },
                ],
            }))
        }

        socket.on('receive_message', handleReceive)
        return () => socket.off('receive_message', handleReceive)
    }, [isMyMessage])

    if (!selectedConversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#1c1c1e]">
                <div className="text-center h-120  m-5    text-slate-500">
                    <img src={newjpeg} alt="image" />
                    <p>👿👿  HI mittar  can you click the     chatconversation   💀💀</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 bg-[#1c1c1e] flex flex-col h-screen">
            <ChatHeader selectedConversation={selectedConversation} />

            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <p className="text-center text-slate-500 mt-10">
                        Loading messages...
                    </p>
                ) : (
                    <ChatBox messages={messages} />
                )}
            </div>

            <ChatInput
                selectedConversation={selectedConversation}
                setMessages={(msg) =>
                    setAllMessages((prev) => ({
                        ...prev,
                        [selectedConversation.room.id]: [
                            ...(prev[selectedConversation.room.id] || []),
                            msg,
                        ],
                    }))
                }
            />
        </div>
    )
}

export default ChatMain
