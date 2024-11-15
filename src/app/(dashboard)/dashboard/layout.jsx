'use client'
import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import MainMenu from "./components/mainmenu";
import ErrorBoundary from "@/app/components/error-boundary";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {userToken} = useSelector((state) => state.auth)

    useEffect(() => {
    console.log(userToken, 'Dashboard');
    if (!userToken) {
      router.push("/admin/SignIn");
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) return;
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
