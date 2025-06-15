import React from 'react';

export default function AllChats() {
  return (
    <div className="border p-2 rounded-[0px_15px_15px_0px] overflow-hidden h-full">
      <h1 className="text-xl text-center py-3">All Chats</h1>

      {/* SCROLLABLE CHAT LIST */}
      <div className="overflow-y-auto h-[80vh] pr-2"> {/* adjust height as needed */}
        <ul className="list-none">
          
            <li
              
              className="flex items-center py-2 hover:bg-error hover:text-neutral rounded"
            >
              <img
                src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                className="w-10 rounded-full mx-3 border-2"
                alt="profile"
              />
              <div className="w-full flex items-center justify-between px-2">
                <div className="flex flex-col">
                  <h1>Syed Sohail</h1>
                  <h6 className="text-[10px]">Online</h6>
                </div>
                <h1 className="text-[10px]">10:11pm</h1>
              </div>
            </li>
          
        </ul>
      </div>
    </div>
  );
}
