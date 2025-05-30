import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ProfilePage from "./pages/ProfilePage"
import SettingPage from "./pages/SettingPage"
import ForgotPassword from "./components/ForgotPassword"
import { ThemeSet } from "./store/ThemeStore"



function App() {
  const location = useLocation();
  const {theme} = ThemeSet()
  
  return (
    <div className="flex flex-col h-screen" data-theme={theme}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/settings" element={<SettingPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>

        </Routes>
      </main>
    </div>
  );
}

export default App


