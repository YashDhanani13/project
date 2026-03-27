import Sidebar from "./Components/Sidebar";
import "./App.css";

import Home from "./Components/Home";
import Services from "./Components/Services";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import User from "./Components/User";
import UserProfile from "./Components/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppContent = () => {
  const { token } = useAuth();
  return (
    <BrowserRouter>
      {token && <Sidebar />}
      <div className={`flex-1 ${token ? "ml-52" : ""} min-h-screen overflow-x-hidden`}>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
