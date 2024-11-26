"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import MainMenu from "./components/mainmenu";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { removeToast } from "@/Store/features/toastSlice";

export default function UserLayout({ children }) {
  const router = useRouter();
  const { toast: alert } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("_APP_USER_TOKEN_KEY_");
      if (!token) {
        router.push("/user/SignIn");
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!(alert.type && alert.message)) {
      return; 
    }

    // Show the toast based on alert type
    switch (alert.type) {
      case "success":
        toast.success(alert.message, { position: "top-right" });
        break;
      case "error":
        toast.error(alert.message, { position: "top-right" });
        break;
      default:
        toast.info(alert.message, { position: "top-right" });
        break;
    }

    // Remove the toast after it's been shown
    dispatch(removeToast());
  }, [alert, dispatch]);

  if (isLoading) {
    return (

      <div
        className="flex items-center justify-center min-h-screen"
        aria-live="polite"
        aria-busy="true"
      >
        <Spinner className="border-2 border-primary" size={9} spin={true} />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <div className="flex ">
      <Sidebar />
     
        <MainMenu />
        <div className="pt-20 bg-[#FAFAFB] w-full sm:pl-[250px] min-h-screen ">{children}</div>
      
    </div>
  );
}
