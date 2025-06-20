import axios from "axios"
import {create} from "zustand"
const apribaseurl = import.meta.env.VITE_BACKEND_URL;
import Cookies from 'js-cookie';


export const allMsgWork = create((set,get)=>({
     selectedChat:null,
     setSelectedChat:(user)=>set({selectedChat:user}),
     messages:null,
     fetchSelectedChats:(id)=>{
          const token = Cookies.get("chatApp");
          axios.get(`${apribaseurl}/chat-with/${id}`,{
               headers:{
                    Authorization: `Bearer ${token}`
               }
          })
          .then((res)=>console.log(res.data))
     },
     

}))