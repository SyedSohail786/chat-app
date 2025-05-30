import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export default function Navbar() {
  const navigate = useNavigate()
  const urlPath = useLocation()
  return (
    <div className="w-full flex justify-between items-center py-3 px-5 bg-base-100 shadow-sm" >
      <div className="text-2xl font-semibold cursor-pointer flex" onClick={() => navigate("/")}>
        <p>Hey</p>
        <span className="text-primary">Chat</span>
      </div>
      
      <div className="flex gap-4 text-md font-semibold">
        {
          urlPath.pathname==="/login" || urlPath.pathname==="/signup" || urlPath.pathname==="/forgot-password" ? null :(
            <>
              <button className="btn btn-ghost btn-md" onClick={() => navigate("/")}>Home</button>
              <button className="btn btn-ghost btn-md" onClick={() => navigate("/profile")}>Profile</button>
            </>
          )
        }
        
        <button className="btn btn-ghost btn-md" onClick={() => navigate("/settings")}>Setting</button>

        {
          urlPath.pathname==="/login" || urlPath.pathname==="/signup" || urlPath.pathname==="/forgot-password" ?
           <button className="btn btn-ghost btn-md" onClick={() => navigate("login")}>Login</button> :(
            <>
              <button className="btn btn-ghost btn-md">Logout</button>
            </>
          )
        }

        
      </div>
    </div>
  )
}