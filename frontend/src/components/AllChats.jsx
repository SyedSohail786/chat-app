import axios from 'axios';
import React, { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import Cookies from 'js-cookie';

export default function AllChats() {
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  
  useEffect(()=>{
    setLoadingUsers(true)
    const token = Cookies.get("chatApp")
    axios.get(apiUrl+"/users",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res)=>{
      setUsers(res.data.users)
      setLoadingUsers(false)
    })
  },[])
  

  return (
    <div className="border p-2 rounded-[0px_15px_15px_0px] overflow-hidden h-full">
      <h1 className="text-xl text-center py-3">All Chats</h1>

      {/* SCROLLABLE CHAT LIST */}
      <div className="overflow-y-auto h-[80vh] pr-2 hide-scrollbar"> 
        <ul className="list-none">
          {
              loadingUsers? 
              <>
              <div className="flex w-45 flex-col gap-4 items-center mb-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-2 w-20"></div>
                  <div className="skeleton h-2 w-28"></div>
                </div>
              </div>
            </div>
            <div className="flex w-45 flex-col gap-4 items-center mb-4">
              <div className="flex items-center gap-4">
                <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-2 w-20"></div>
                  <div className="skeleton h-2 w-28"></div>
                </div>
              </div>
            </div>
            <div className="flex w-45 flex-col gap-4 items-center mb-4 ">
              <div className="flex items-center gap-4">
                <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-2 w-20"></div>
                  <div className="skeleton h-2 w-28"></div>
                </div>
              </div>
            </div>
            </>
            :
            <>
            {
            users.map((items,index)=>{
              return(
                <li className="flex items-center py-2 hover:bg-error hover:text-neutral rounded" key={index}>
                  <img
                    src={items.profilePic || "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"}
                    className="w-10  rounded-full mx-3 border-2"
                    alt="profile"
                  />
                  <div className="w-full flex items-center justify-between px-2">
                    <div className="flex flex-col">
                      <h1>{items.userName}</h1>
                    <h6 className="text-[10px]">Online</h6>
                  </div>
                <h1 className="text-[10px]">10:11pm</h1>
              </div>
            </li>
              )
            })
          }
            </>
          }
          
            
          
        </ul>
      </div>
    </div>
  );
}
