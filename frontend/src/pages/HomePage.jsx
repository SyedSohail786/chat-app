import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AllChats from "../components/AllChats";
import "../index.css";
import { FaRegImages } from "react-icons/fa6";
import { Send } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { allMsgWork } from '../store/messageStore';
import { MessageSquare } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [showChatList, setShowChatList] = useState(false);
  const { selectedChat } = allMsgWork();

  useEffect(() => {
    const token = Cookies.get("chatApp");
    if (!token || token === "undefined" || token === "null") {
      navigate("/login");
    }
  }, []);

  useEffect(()=>{

  },[selectedChat])

  const previewMessage = [
    { id: 1, msg: "Hey, how are you?", isSent: false },
    { id: 2, msg: "I am good, what about you?", isSent: true },
    { id: 3, msg: "Same here!", isSent: false },
    { id: 4, msg: "Let's catch up soon.", isSent: true },
    { id: 5, msg: "Sure bro.", isSent: false },
    { id: 6, msg: "Okay.", isSent: true },
    { id: 7, msg: "Another message", isSent: false },
    { id: 8, msg: "One more...", isSent: true },
    { id: 9, msg: "Scrolling test", isSent: false },
    { id: 10, msg: "Last one", isSent: true },
  ];

  return (
    <div className="h-[calc(100vh-4rem)]"> {/* Subtract navbar height */}
      {/* Main content */}
      <div className="max-w-[1450px] w-full h-full mx-auto flex border overflow-hidden">
        {/* Sidebar - visible on desktop, toggleable on mobile */}
        <div className={`${showChatList ? 'block absolute inset-0 z-40 bg-base-100' : 'hidden'} md:block w-full md:w-[20%] h-full overflow-y-auto`}>
          <AllChats onSelectChat={() => setShowChatList(false)} />
        </div>

        {/* Right Section */}
        {
          selectedChat? 
        
        <div className={`${showChatList ? 'hidden md:flex' : 'flex'} flex-col flex-1 h-full`}>
          {/* Chat Header with menu button for mobile */}
          <div className="h-16 px-4 flex items-center border-b shrink-0 bg-base-100">
            <button
              className="md:hidden mr-2 p-1"
              onClick={() => setShowChatList(true)}
            >
              <FiMenu size={24} />
            </button>
            <img
              src={`${selectedChat.profilePic} `}
              className="w-10 h-10 rounded-full border-2 mr-3"
            />
            <div>
              <h1 className="text-base font-medium">{selectedChat.userName}</h1>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>

          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 bg-base-100 space-y-2">
            {previewMessage.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                <div className={`p-3 max-w-[80%] rounded-xl text-sm shadow-sm border
            ${msg.isSent ? "bg-primary text-primary-content border-primary" : "bg-base-200 border-base-300"}`}>
                  <p>{msg.msg}</p>
                  <p className="text-[10px] mt-1 opacity-70">12:00 PM</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input (fixed height) */}
          <div className="h-16 px-4 border-t bg-base-100 flex items-center gap-2 shrink-0">
            <label htmlFor="media-upload" className="cursor-pointer">
              <input type="file" className="hidden" id="media-upload" />
              <FaRegImages className="text-xl" />
            </label>
            <form className="flex-1 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-2 text-sm outline-none bg-transparent"
              />
              <button type="submit" className="hover:bg-error p-2 rounded-full text-white bg-primary">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        :
            <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Chatty!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
          }
      </div>
    </div>
  );
}