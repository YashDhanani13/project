import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// Pages
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import ContactForm from './pages/contacts/ContactForm'
import EmployeeForm from './pages/employee/EmployeeForm'
import UserProfile from './pages/user-profile/UserProfile'
import Contacts from './pages/contacts/Contacts'
import Employees from './pages/employee/Employees'
import Sidebar from './components/Sidebar'
import Inbox from './pages/inboxchat/Inbox'
import ChatHeader from './pages/inboxchat/ChatHeader'
import { AuthContext } from './Authcontext/AuthContext'

import ChatMain from './pages/inboxchat/ChatMain'
import UserInfo from './pages/inboxchat/UserInfo'
import ChatConversation from './pages/inboxchat/ChatConversation'
import ChatInput from './pages/inboxchat/ChatInput'
// import ChatHeader from './pages/inboxchat/ChatHeader'

// Route Protection Component
const ProtectedLayout = () => {
    const { token } = useContext(AuthContext)

    if (!token) {
        // return <N to="/login" replace />;
    }

    return <Sidebar />
}

const PublicRoute = ({ children }) => {
    const { token } = useContext(AuthContext)

    if (token) {
        return <Navigate to="/" replace />
    }

    return children
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'contacts', element: <Contacts /> },
            { path: 'contact-form', element: <ContactForm /> },
            { path: 'employees', element: <Employees /> },
            { path: 'employee-form', element: <EmployeeForm /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'inbox', element: <Inbox /> },
            { path: 'chat-main', element: <ChatMain /> } , 
            { path: 'chat-input', element: <ChatInput /> },
            { path: 'chat-header', element: <ChatHeader /> },
            { path: 'user-info', element: <UserInfo /> },
        ],
    },

    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: '/signup',
        element: (
            <PublicRoute>
                <Signup />
            </PublicRoute>
        ),
    },
     {
        path: '/home',
        element: (
            <PublicRoute>
                <Home />
            </PublicRoute>
        ),
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App
