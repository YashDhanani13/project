import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ContactForm from "./pages/contacts/ContactForm";
import EmployeeForm from "./pages/employee/EmployeeForm";
import UserProfile from "./pages/user-profile/UserProfile";
import Contacts from "./pages/contacts/Contacts";
import Employees from "./pages/employee/Employees";

// Layout
import Sidebar from "./components/Sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      { path: "",         element: <Home />         },
      { path: "contacts", element: <Contacts />     },
      { path: "contact-form", element: <ContactForm /> },
      { path: "employees", element: <Employees />    },
      { path: "employee-form", element: <EmployeeForm /> },
      { path: "profile",  element: <UserProfile />  },
    ],
  },

  { path: "/login",  element: <Login />  },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;