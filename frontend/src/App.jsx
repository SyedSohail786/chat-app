import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import ForgotPassword from "./components/ForgotPassword";
import { ThemeSet } from "./store/ThemeStore";

function App() {
  const location = useLocation();
  const { theme } = ThemeSet();

  // Hide Navbar on auth-related routes (optional)
  const hideNavbar = ["/login", "/signup", "/forgot-password"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-base-100" data-theme={theme}>
      {!hideNavbar && <Navbar />}
      
      <main className="flex-1 px-2 md:px-4 lg:px-6 py-4">
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
