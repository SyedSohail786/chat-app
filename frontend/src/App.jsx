import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ProfilePage from "./pages/ProfilePage"
import SettingPage from "./pages/SettingPage"


function App() {

  return (
    <div>
      
    <Navbar/>
    
    <Routes>

    <Route path="/" element={<HomePage/>}/>

    <Route path="/login" element={<Login/>}/>

    <Route path="/signup" element={<SignUp/>}/>

    <Route path="/setting" element={<SettingPage/>}/>

    <Route path="/profile" element={<ProfilePage/>}/>


    </Routes>

    </div>
  )
}

export default App


