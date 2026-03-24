import Sidebar from "./Components/Sidebar";
import "./App.css";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Services from "./Components/Services";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import User from "./Components/User";
// import UserProfile from "./Components/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar/>
          <div className="flex-1 ml-52 min-h-screen overflow-x-hidden">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/userProfile" element={<UserProfile />} /> */}
        </Routes>
</div>
        {/* <Footer  /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
