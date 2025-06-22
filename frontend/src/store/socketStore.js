import io from 'socket.io-client';
import { create } from 'zustand';
const apiurl = import.meta.env.VITE_BACKEND_URL;

export const socketStore = create((set,get)=>({
     socket:null,
     onlineUsers:[],
     profile: null,
     setProfile:(res)=>{
          set({profile:res})
     },
     connectSocket:()=>{
          const socket = io(apiurl,{
               query:{
                    userId:profile._id
               }
          })
          if(socket.connected) return;
          socket.connect()
          set({socket})
     },
     disconnectSocket:()=>{
          if(get().socket?.connected) get().socket.disconnect()
     }
}))