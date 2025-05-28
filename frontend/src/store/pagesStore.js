import { create } from "zustand";

export const pagesStore=create((set)=>({
     currentPage: "/",
     setCurrentPage: (page)=>{
          set ({currentPage: page})
     }
}))