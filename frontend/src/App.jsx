import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import ForgotPassword from "./components/ForgotPassword";
import { ThemeSet } from "./store/ThemeStore";
import { useEffect } from "react";
import { socketStore } from "./store/socketStore";
import Cookies from "js-cookie";

function App() {
  const location = useLocation();
  const { theme } = ThemeSet();
  const {connectSocket} = socketStore()
  const hideNavbar = ["/login", "/signup", "/forgot-password"].includes(location.pathname);
  
  useEffect(()=>{
    if(Cookies.get("chatApp")) connectSocket()
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-base-100" data-theme={theme}>
      {!hideNavbar && <Navbar />}

      <main className={`flex-1 ${!hideNavbar ? "pt-16" : ""} overflow-hidden`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
    </div>
  );
}


export default App;
