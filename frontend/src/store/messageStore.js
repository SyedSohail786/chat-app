import axios from "axios"
import { create } from "zustand"
const apribaseurl = import.meta.env.VITE_BACKEND_URL;
import Cookies from 'js-cookie';
import { socketStore } from "./socketStore";


export const allMsgWork = create((set,get) => ({
     selectedChat: null,
     setSelectedChat: (user) => set({ selectedChat: user }),
     loadingChat: false,
     messages: [],
     fetchSelectedChats: (id) => {
          set({ loadingChat: true })
          const token = Cookies.get("chatApp");
          axios.get(`${apribaseurl}/chat-with/${id}`, {
               headers: {
                    Authorization: `Bearer ${token}`
               }
          })
               .then((res) => {
                    get().subscribeMessages()
                    set({ messages: res.data })
                    set({ loadingChat: false })
               })
     },
     subscribeMessages:()=>{
          const {selectedChat} = get()
          if(!selectedChat) return; 
          const socket = socketStore.getState().socket;
          socket.on("newMessage", (newMessage)=>{
               set({messages:[...get().messages, newMessage]})
          })
     },


}))