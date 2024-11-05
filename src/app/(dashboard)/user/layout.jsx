import React from "react";
import MainMenu from "../dashboard/components/mainmenu";
import Sidebar from "./components/sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex ">
      <Sidebar />
     
        <MainMenu />
        <div className="pt-20 bg-[#FAFAFB] w-full sm:pl-[250px] min-h-screen ">{children}</div>
      
    </div>
  );
}
