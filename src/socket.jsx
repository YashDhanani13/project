import { io } from 'socket.io-client'
import { getAuthToken } from './utils/authToken'

const socket = io('http://localhost:3000', {
    auth: { token: getAuthToken() },
    withCredentials: true,
})

export const refreshSocketAuth = () => {
    socket.auth = { token: getAuthToken() }

    if (!socket.connected) {
        socket.connect()
    }
}

socket.on('connect_error', () => {
    socket.auth = { token: getAuthToken() }
})

export default socket
