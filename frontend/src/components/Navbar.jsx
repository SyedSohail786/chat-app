import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
  const navigate = useNavigate()
  return (
    <div className="w-full flex justify-between items-center py-3 px-5 bg-base-100 shadow-sm">
      <div className="text-2xl font-semibold cursor-pointer flex" onClick={() => navigate("/")}>
        <p>Hey</p>
        <span className="text-primary">Chat</span>
      </div>
      
      <div className="flex gap-4 text-md font-semibold">
        <button className="btn btn-ghost btn-sm" onClick={() => navigate("/")}>Home</button>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate("/profile")}>Profile</button>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate("/setting")}>Setting</button>
        <button className="btn btn-ghost btn-sm">Logout</button>
      </div>
    </div>
  )
}