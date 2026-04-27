import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Pages
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ContactForm from "./pages/contacts/ContactForm";
import EmployeeForm from "./pages/employee/EmployeeForm";
import UserProfile from "./pages/user-profile/UserProfile";
import Contacts from "./pages/contacts/Contacts";
import Employees from "./pages/employee/Employees";
// import pi from "./api/Api"
// Layout
import Sidebar from "./components/Sidebar";

// Auth Context
import { AuthContext } from "./Authcontext/AuthContext";

// Route Protection Component
const ProtectedLayout = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // return <N to="/login" replace />;
  }

  return <Sidebar />;
};

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { path: "",         element: <Home />         },
      { path: "contacts", element: <Contacts />     },
      { path: "contact-form", element: <ContactForm /> },
      { path: "employees", element: <Employees />    },
      { path: "employee-form", element: <EmployeeForm /> },
      { path: "profile",  element: <UserProfile />  },
      // {path : "api"     , element :<Api />}
    ],
  },

  { path: "/login",  element: <PublicRoute><Login /></PublicRoute>  },
  { path: "/signup", element: <PublicRoute><Signup /></PublicRoute> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;