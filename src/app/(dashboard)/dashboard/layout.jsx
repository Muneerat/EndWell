import React from "react";
import Sidebar from "./components/sidebar";
import MainMenu from "./components/mainmenu";
import ErrorBoundary from "@/app/components/error-boundary";

export default function AdminLayout({ children }) {
  return (
    <ErrorBoundary>
    <div className="flex ">
      <Sidebar />
     
        <MainMenu />
        <div className="pt-20 bg-[#FAFAFB] w-full md:pl-[290px] sm:pl-[210px] min-h-screen ">{children}</div>
      
    </div>
    </ErrorBoundary>
  );
}
