import React, { useEffect, useState, useCallback } from 'react'
import ChatBox from './ChatBox'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import socket from '../../socket'
import { getAuthHeaders, getCurrentUserId } from '../../utils/authToken'
import newjpeg from '../../../public/new.jpeg'

import api from '../../api/api'

const ChatMain = ({ selectedConversation }) => {
    const [allMessages, setAllMessages] = useState({})
    const [loading, setLoading] = useState(false)

    const currentUserId = getCurrentUserId()
    const messages = allMessages[selectedConversation?.room?.id] || []

    // --------------------------------------------------------
    // Check my message or other user message
    // --------------------------------------------------------

    const isMyMessage = useCallback(
        (senderId) =>
            currentUserId && String(senderId) === String(currentUserId),

        [currentUserId]
    )

    // --------------------------------------------------------
    // Fetch old messages from DB
    // --------------------------------------------------------
    useEffect(() => {
        if (!selectedConversation?.room?.id) return

        const roomId = selectedConversation.room.id

        const fetchMessages = async () => {
            setLoading(true)

            try {
                const res = await api.get(`/messages/${roomId}`, {
                    headers: getAuthHeaders(),
                })

                const data = res.data

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

    // --------------------------------------------------------
    // Socket realtime messages
    // --------------------------------------------------------

    useEffect(() => {
        if (!selectedConversation?.room?.id) return

        // Auto join room
        socket.emit('join_room', selectedConversation.room.id)

        const handleReceive = (message) => {
            setAllMessages((prev) => {
                // Prevent duplicate message
                const exists = prev[message.roomId]?.some(
                    (msg) => msg.id === message.id
                )

                if (exists) return prev

                return {
                    ...prev,

                    [message.roomId]: [
                        ...(prev[message.roomId] || []),

                        {
                            id: message.id,

                            text: message.text,

                            senderId: message.senderId,

                            sender: isMyMessage(message.senderId)
                                ? 'me'
                                : 'other',

                            createdAt: message.createdAt,
                        },
                    ],
                }
            })
        }

        socket.on('receive_message', handleReceive)

        return () => {
            socket.off('receive_message', handleReceive)
        }
    }, [selectedConversation, isMyMessage])

    // --------------------------------------------------------

    if (!selectedConversation) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#ffffff]">
                <div className="text-center h-160 m-2 text-slate-500">
                    <img src={newjpeg} alt="image" />

                    {/* <p>
                        👿👿 HI mittar can you click the chatconversation 💀💀
                    </p> */}
                </div>
            </div>
        )
    }

    // --------------------------------------------------------

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

            <ChatInput selectedConversation={selectedConversation} />
        </div>
    )
}

export default ChatMain
