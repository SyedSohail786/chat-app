import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageSquareDashed, Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const urlPath = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthPage =
    urlPath.pathname === "/login" ||
    urlPath.pathname === "/signup" ||
    urlPath.pathname === "/forgot-password";

  const navLinks = (
    <>
      {!isAuthPage && (
        <>
          <button onClick={() => navigate("/")} className="btn btn-ghost btn-sm">
            Home
          </button>
          <button onClick={() => navigate("/profile")} className="btn btn-ghost btn-sm">
            Profile
          </button>
        </>
      )}
      <button onClick={() => navigate("/settings")} className="btn btn-ghost btn-sm">
        Setting
      </button>
      {isAuthPage ? (
        <button onClick={() => navigate("/login")} className="btn btn-ghost btn-sm">
          Login
        </button>
      ) : (
        <button className="btn btn-ghost btn-sm">Logout</button>
      )}
    </>
  );

  return (
    <div className="w-full bg-base-100 shadow-sm px-5 py-3 flex justify-between items-center" >
      {/* Logo Section */}
      <div
        className="text-2xl font-semibold cursor-pointer flex items-center gap-1"
        onClick={() => navigate("/")}
      >
        <p>Hey</p>
        <span className="text-primary">Chat</span>
        <MessageSquareDashed size={24} />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-3 items-center">{navLinks}</div>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost btn-sm">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-5 bg-base-100 border rounded-xl shadow-md p-4 flex flex-col gap-2 z-50 md:hidden">
          {navLinks}
        </div>
      )}
    </div>
  );
}
