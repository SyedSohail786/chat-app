import React from 'react'
import { Paperclip, Send, Smile } from 'lucide-react';

export default function Input() {
     return (
          <div className="border-t p-3 bg-white">
               <div className="flex items-center gap-2">
                    <button className="btn btn-ghost btn-circle">
                         <Paperclip className="h-5 w-5" />
                    </button>
                    <input
                         type="text"
                         placeholder="Type a message..."
                         className="input input-bordered flex-1"
                    />
                    <button className="btn btn-ghost btn-circle">
                         <Send className="h-5 w-5" />
                    </button>
               </div>
          </div>
     )
}
