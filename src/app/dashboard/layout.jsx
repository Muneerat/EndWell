import React from "react";
import Sidebar from "./components/sidebar";
import MainMenu from "./components/mainmenu";

export default function AdminLayout({ children }) {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-full ">
        <MainMenu />
        <div className="pt-20 bg-[#FAFAFB] w-full h-full">{children}</div>
      </div>
    </div>
  );
}
