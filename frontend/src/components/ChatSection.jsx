import React from 'react'

export default function ChatSection() {
     return (
          <div className="flex-1 flex flex-col bg-white">
               {/* Chat Header */}
               <div className="border-b p-3">
                    <h1 className="text-xl font-semibold">Chat with Sohail</h1>
               </div>

               {/* Messages Area - will fill available space */}
               <div className="flex-1 bg-gray-50 overflow-y-auto p-4">
                    {/* Empty state */}
                    <div className="h-full flex items-center justify-center text-gray-500">
                         <p>Select a chat to start messaging</p>
                    </div>

                    {/* When messages exist: */}
                    {/* <div className="chat chat-start">
              <div className="chat-bubble">Hello!</div>
            </div> */}
               </div>
          </div>
     )
}
