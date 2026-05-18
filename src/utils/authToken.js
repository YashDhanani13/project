export const getAuthToken = () => localStorage.getItem('token')

export const getCurrentUserId = () => {
    const token = getAuthToken()
    if (!token) return null

    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return (
            payload.id ||
            payload.userId ||
            payload.user?.id ||
            payload.data?.id ||
            payload.sub ||
            null
        )
    } catch (error) {
        console.error('Failed to read user id from token:', error)
        return null
    }
}

export const getAuthHeaders = () => {
    const token = getAuthToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}
