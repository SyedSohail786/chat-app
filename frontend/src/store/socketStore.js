import io from 'socket.io-client';
import { create } from 'zustand';
const apiurl = import.meta.env.VITE_BACKEND_URL;

export const socketStore = create((set,get)=>({
     socket:null,
     connectSocket:()=>{
          const socket = io(apiurl)
          if(socket.connected) return;
          socket.connect()
          set({socket})
     },
     disconnectSocket:()=>{
          if(get().socket)get().socket.disconnect()
     }
}))