import React, { useEffect, useState } from 'react'
import { Search, MessageSquarePlus, X } from 'lucide-react'
import socket from '../../socket'
import { getAuthHeaders, getCurrentUserId } from '../../utils/authToken'
import api from '../../api/api.js'

const ChatConversation = ({
    selectedConversation,
    setSelectedConversation,
}) => {
    const [chats, setChats] = useState([])
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [contactSearch, setContactSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const currentUserId = getCurrentUserId()

    const isOwnContact = (contact) => {
        if (!currentUserId) return false

        return [contact.id, contact.userId, contact.user?.id].some(
            (id) => id && String(id) === String(currentUserId)
        )
    }

    // Fetch all conversations on mount
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await api.get('/conversations', {
                    headers: getAuthHeaders(),
                })

                const data = res.data // FIX: removed unnecessary await

                if (data.success) {
                    setChats(data.data)
                }

                data.data.forEach((conv) => {
                    if (conv.room?.id) {
                        socket.emit('join_room', conv.room.id)
                    }
                })
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getConversations()
    }, [])

    // Fetch contacts when modal opens
    useEffect(() => {
        if (!showModal) return

        const fetchContacts = async () => {
            try {
                const res = await api.get('/contacts', {
                    headers: getAuthHeaders(),
                })

                const data = res.data // FIX: removed unnecessary await

                if (data.success) {
                    setContacts(data.data)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchContacts()
    }, [showModal])

    const handleSelectChat = (chat) => {
        setChats((prev) =>
            prev.map((conv) =>
                conv.id === chat.id
                    ? { ...conv, unreadCount: 0 } // FIX: renamed 'count' to 'conv'
                    : conv
            )
        )
        setSelectedConversation(chat)
    }

    const handleStartChat = async (contact) => {
        if (isOwnContact(contact)) return

        try {
            const res = await api.post(
                '/conversations',
                {
                    contactId: contact.id,
                },
                {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'application/json',
                    },
                }
            )

            const data = res.data

            if (data.success) {
                setChats((prev) => {
                    const exists = prev.find((conv) => conv.id === data.data.id)

                    return exists ? prev : [data.data, ...prev]
                })

                setSelectedConversation(data.data)

                if (data.data.room?.id) {
                    socket.emit('join_room', data.data.room.id)
                }

                setShowModal(false)
                setContactSearch('')
            }
        } catch (error) {
            console.log('BACKEND ERROR:', error.response?.data)
            console.error(error)
        }
    }

    const getTagColor = (tag) => {
        if (tag === 'VIP') return 'text-yellow-400'
        if (tag === 'VVIP') return 'text-pink-400'
        return 'text-cyan-400'
    }

    // FIX: restored actual filter logic (.includes was commented out before)
    const filteredChats = chats.filter(
        (chat) =>
            chat.contact?.name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            chat.contact?.phoneNumber?.includes(searchQuery)
    )

    // FIX: restored actual filter logic for contacts
    const filteredContacts = contacts.filter(
        (contact) =>
            !isOwnContact(contact) &&
            (contact.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
                contact.phoneNumber?.includes(contactSearch))
    )

    return (
        <div className="w-[380px] h-screen bg-[#161717] border-r border-slate-700 flex flex-col relative">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                <h1 className="text-2xl font-bold text-white">ClassMate</h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="p-2 rounded-full hover:bg-slate-700 cursor-pointer"
                >
                    <MessageSquarePlus className="text-slate-300" size={22} />
                </button>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="flex items-center bg-slate-800 rounded-full px-4 py-2">
                    {/* <Search className="text-slate-400" size={18} /> */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search"
                        className="bg-transparent outline-none text-white ml-3 w-full text-sm"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
                {loading && (
                    <p className="text-center text-slate-500 mt-10">
                        Loading...
                    </p>
                )}

                {filteredChats.map((chat) => {
                    const isActive = selectedConversation?.id === chat.id

                    return (
                        <div
                            key={chat.id}
                            onClick={() => handleSelectChat(chat)}
                            className={`flex items-center justify-between px-4 py-3 border-b border-slate-800 cursor-pointer
                            ${isActive ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xl">
                                    {chat.contact?.name
                                        ?.charAt(0)
                                        .toUpperCase() || '?'}
                                </div>

                                <div>
                                    <h2 className="text-white text-sm font-medium">
                                        {chat.contact?.name}
                                    </h2>

                                    <p className="text-slate-400 text-xs">
                                        {chat.lastMessage || 'No messages'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <span className="text-xs text-slate-400">
                                    {chat.lastMessageAt
                                        ? new Date(
                                              chat.lastMessageAt
                                          ).toLocaleTimeString([], {
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          })
                                        : ''}
                                </span>

                                {chat.unreadCount > 0 && (
                                    <span className="bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {chat.unreadCount}
                                    </span>
                                )}

                                {chat.contact?.tag && (
                                    <span
                                        className={`text-xs font-bold ${getTagColor(
                                            chat.contact.tag
                                        )}`}
                                    >
                                        {chat.contact.tag}
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* New Chat Modal */}
            {showModal && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <div className="bg-[#1c1c1e] w-[340px] rounded-2xl border border-slate-700">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                            <h2 className="text-white font-semibold">
                                New Chat
                            </h2>

                            <button
                                onClick={() => {
                                    setShowModal(false)
                                    setContactSearch('') // reset search on close
                                }}
                            >
                                <X className="text-slate-400" size={20} />
                            </button>
                        </div>

                        {/* FIX: added missing search input for contacts inside modal */}
                        <div className="px-4 py-3 border-b border-slate-700">
                            <div className="flex items-center bg-slate-800 rounded-full px-4 py-2">
                                {/* <Search className="text-slate-400" size={16} /> */}
                                <input
                                    type="text"
                                    value={contactSearch}
                                    onChange={(e) =>
                                    setContactSearch(e.target.value)
                                    }
                                    placeholder="Search contacts..."
                                    className="bg-transparent outline-none text-white ml-3 w-full text-sm"
                                />
                            </div>
                        </div>

                        <div className="max-h-[320px] overflow-y-auto">
                            {filteredContacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => handleStartChat(contact)}
                                    className="flex items-center gap-4 px-5 py-3 hover:bg-slate-800 cursor-pointer"
                                >
                                    <div className="w-11 h-11 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-white text-sm">
                                            {contact.name}
                                        </p>
                                        <p className="text-slate-400 text-xs">
                                            {contact.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {filteredContacts.length === 0 && (
                                <p className="text-center text-slate-500 py-6 text-sm">
                                    No contacts found
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatConversation
