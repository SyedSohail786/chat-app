import axios from "axios"
import { create } from "zustand"
const apribaseurl = import.meta.env.VITE_BACKEND_URL;
import Cookies from 'js-cookie';


export const allMsgWork = create((set) => ({
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
                    set({ messages: res.data })
                    set({ loadingChat: false })
               })
     },


}))