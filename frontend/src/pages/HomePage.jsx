import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import AllChats from "../components/AllChats";
import "../index.css";
import { FaRegImages } from "react-icons/fa6";
import { Send } from "lucide-react";
import Cookies from "js-cookie";
import { allMsgWork } from '../store/messageStore';
import { MessageSquare } from "lucide-react";
import { useMediaQuery } from 'react-responsive';
import { FaAngleLeft } from "react-icons/fa6";
import { X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { socketStore } from '../store/socketStore';

export default function HomePage() {
  const navigate = useNavigate();
  const [showChatList, setShowChatList] = useState(false);
  const { selectedChat, setSelectedChat, messages, loadingChat, subscribeMessages } = allMsgWork();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const [imageUrl, setImageUrl] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(null)
  const [messageSend, setMessageSend] = useState('')
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const messagesEndRef = useRef(null);
  const { onlineUsers } = socketStore()

  useEffect(() => {
    const token = Cookies.get("chatApp");
    if (!token || token === "undefined" || token === "null") {
      navigate("/login");
    }
    // On mobile/tablet, show chat list by default
    if (isMobile || isTablet) {
      setShowChatList(true);
    }
  }, [navigate, isMobile, isTablet]);

  //image sending
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingImage(file)
      const imageUrl = URL.createObjectURL(file)
      setImageUrl(imageUrl)
    }
  }
  //text sending
  const handleSending = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", messageSend);
    if (uploadingImage) {
      formData.append("image", uploadingImage);
    }
    axios.post(`${apiurl}/send-msg-to/${selectedChat._id}`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get("chatApp")}`
      }
    })
      .then((res) => {
        if (res.data.code === 201) {
          // const newMessage = res.data.newMessage;
          setMessageSend('');
          setImageUrl(null);
          setUploadingImage(null);
          // const state = allMsgWork.getState();
          // const currentMessages = Array.isArray(state.messages) ? state.messages : [];

          // allMsgWork.setState({
          //   messages: [...currentMessages, newMessage]
          // });

        }
      }).catch((err) => {
        toast.error("Send error");
        console.log("Send error:", err);
      });

  }

  //msg auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    subscribeMessages()
  }, [])


  const renderChatInterface = () => (
    <>
      {
        selectedChat != null || selectedChat != undefined ?
          <div className="flex flex-col flex-1 h-full">
            {/* Chat Header with back button */}
            <div className="h-16 px-4 flex items-center border-b shrink-0 bg-base-100">
              <button
                className="mr-2 p-1 md:hidden"
                onClick={() => setShowChatList(true)}
              >
                <FaAngleLeft size={20} />
              </button>
              {selectedChat && (
                <div className='flex justify-between w-full'>
                  <div className='flex'>
                    <img
                      src={selectedChat.profilePic || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                      className="w-10 h-10 rounded-full border-2 mr-3"
                      alt="Profile"
                    />
                    <div>
                      <h1 className="text-base font-medium">{selectedChat.userName}</h1>
                      <p className="text-xs text-green-500">{onlineUsers.includes(selectedChat._id) ? "Online" : "Offline"}</p>
                    </div>
                  </div>
                  <div className='flex items-center py-2 px-3 border rounded-xl cursor-pointer' onClick={() => setSelectedChat(null)}>
                    <h1>Close Chat</h1>
                  </div>

                </div>
              )}
            </div>

            {/* Scrollable Messages */}


            <div className="flex-1 overflow-y-auto px-4 py-2 bg-base-100 space-y-2 ">
              {!loadingChat ?
                <>
                  {
                    messages.length >= 1 ?
                      <>
                        {messages.map((msg) => (
                          <div key={`${msg._id || Math.random().toString(36).substr(2)}-${msg.createdAt}`} className={`flex ${msg.receiverId == selectedChat._id ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 max-w-[80%] rounded-xl text-sm shadow-sm border
                            ${msg.receiverId == selectedChat._id ?
                                "bg-primary text-primary-content border-primary"
                                :
                                "bg-base-200 border-base-300"}`}>
                              {
                                msg.image ? <img src={msg.image} alt="image-sent" className='w-30 mb-2' /> : ""

                              }
                              <p>{msg.text}</p>
                              <p className="text-[10px] mt-1 opacity-70">
                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                      :
                      <div className='w-full h-full flex items-center justify-center'>
                        <h1 className='text-center text-lg font-medium'>Say Hi👋 to {selectedChat.userName} </h1>
                      </div>
                  }
                </> : <div className="w-full h-full flex items-center justify-center p-16">
                  <span className="loading loading-infinity loading-xl"></span>
                </div>
              }
              <div ref={messagesEndRef} />
            </div>


            {/* Chat Input */}
            <div className="h-16 px-4 border-t bg-base-100 flex items-center gap-2 shrink-0 relative">
              {
                selectedChat && imageUrl ?
                  <div className=' absolute bottom-18 left-2 w-30' >

                    <img src={imageUrl} alt="uploaded-image w-30 h-30 relative" />
                    <X className='absolute top-0 right-0 text-black cursor-pointer w-5' onClick={() => setImageUrl(null)} />
                  </div>
                  : ""
              }

              <label htmlFor="media-upload" className="cursor-pointer">
                <input type="file" className="hidden" id="media-upload" accept="image/*" onChange={handleUpload} />
                <FaRegImages className="text-xl" />
              </label>
              <form className="flex-1 flex items-center gap-2" onSubmit={handleSending} >
                <input
                  value={messageSend}
                  onChange={(e) => setMessageSend(e.target.value)}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-2 text-sm outline-none bg-transparent"
                />
                <button type="submit" className="hover:bg-error p-2 rounded-full text-white bg-primary" disabled={messageSend != "" ? false : true}>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
          :
          <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
            <span className="loading loading-infinity loading-xl"></span>
          </div>
      }
    </>
  );

  const renderMobileTabletView = () => {
    if (showChatList) {
      return (
        <div className="block w-full h-full bg-base-100">
          <AllChats onSelectChat={() => {
            setShowChatList(false);
            if (isTablet) setShowChatList(true);
          }} />
        </div>
      );
    }

    return selectedChat ? renderChatInterface() : (
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100">
        <div className="max-w-md text-center space-y-6">
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold">No chat selected</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowChatList(true)}
          >
            Select a chat
          </button>
        </div>
      </div>
    );
  };

  const renderDesktopView = () => (
    <>
      {/* Sidebar - always visible on desktop */}
      <div className="hidden md:block w-[20%] h-full overflow-y-auto">
        <AllChats onSelectChat={() => { }} />
      </div>

      {/* Right Section */}
      {selectedChat ? (
        renderChatInterface()
      ) : (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
          <div className="max-w-md text-center space-y-6">
            <div className="flex justify-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold">Welcome to HeyChat!</h2>
            <p className="text-base-content/60">
              Select a conversation from the sidebar to start chatting
            </p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="max-w-[1450px] w-full h-full mx-auto flex border overflow-hidden">
        {isMobile || isTablet ? renderMobileTabletView() : renderDesktopView()}
      </div>
    </div>
  );
}