import { useNavigate } from "react-router-dom"
import AllChats from "../components/AllChats";
import "../index.css"
import { FaRegImages } from "react-icons/fa6";
import { Send } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
   useEffect(() => {
         const token = Cookies.get("chatApp");
         if (token && token !== "undefined" && token !== "null") {
           return
         }else{
           navigate("/login")
         }
       }, []);

  const previewMessage = [
    { id: 1, msg: "Hey, how are you?", isSent: false },
    { id: 2, msg: "I am good, what about you?", isSent: true },
    { id: 3, msg: "Hey, how are you?", isSent: true },
    { id: 4, msg: "I am good, what about you?", isSent: true },
    { id: 5, msg: "I am good, what about you?", isSent: true },
    { id: 6, msg: "I am good, what about you?", isSent: true },
    { id: 7, msg: "Hey, how are you?", isSent: false },,
    { id: 8, msg: "Hey, how are you?", isSent: false },,
    { id: 9, msg: "Hey, how are you?", isSent: false },,
    { id: 10, msg: "Hey, how are you?", isSent: false },
  ];
  return (
    <>
    <div className="max-w-[1450px] mx-auto  border rounded grid grid-cols-[20%_auto]" style={{ height: 'calc(100vh - 90px)' }}>
      {/* all chats, left section */}
     <AllChats/>
      {/* chat section, right side */}

      <div>
        {/* Header Section */}
        <div className="py-2 px-2 border-b flex">
          <img
                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                className="w-12 rounded-full mx-3 border-2"
                alt="profile"
              />
              <div>
                <h1 className="text-xl">Syed Sohail</h1>
                  <h1 className="text-[12px]">Online</h1>
              </div>
        </div>

        {/* Chat Section */}
        <div className="h-130 overflow-hidden">
          <div className="h-full overflow-y-auto p-5 hide-scrollbar">
              {previewMessage.map((message) => (
                <div
                  key={message.id}
                  className={`flex my-1 ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[80%] rounded-xl p-3 shadow-sm border
                      ${message.isSent ? "bg-primary text-primary-content border-primary" : "bg-base-200 border-base-300"}
                    `}
                  >
                    <p className="text-sm max-sm:text-[10px]">{message.msg}</p>
                    <p
                      className={`text-[10px] mt-1.5 max-sm:text-[8px] ${message.isSent ? "text-primary-content/70" 
                        : "text-base-content/70"
                        }`}
                    >
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}

          </div>

        </div>

        {/* Chat Input Section */}
        <div className="max-w-[900px] border mx-auto rounded-[20px] pl-5 flex justify-between items-center overflow-hidden">
          <label htmlFor="media-upload">
              <input type="file" className="hidden" accept="image/*"  id="media-upload"/>
              <FaRegImages className=" text-2xl mr-2"/>
          </label>
          
          <form className="flex w-full ">
            <input type="text" placeholder="Type Here...." className="w-full outline-none rounded-[10px] p-2"/>
            <button type="submit" className="ml-2 hover:bg-error rounded-[15px] px-5 py-2"><Send size={18} /></button>
          </form>
          


        </div>



        
      </div>
    </div>
    </>
  );
}
