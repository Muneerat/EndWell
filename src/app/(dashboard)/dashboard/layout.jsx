"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import MainMenu from "./components/mainmenu";
import ErrorBoundary from "@/app/components/error-boundary";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { removeToast } from "@/Store/features/toastSlice";
import Spinner from "@/app/components/Spinner";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userToken  } = useSelector((state) => state.auth);
   const { toast: alert } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for user token and handle redirection
    if (!userToken) {
      router.push("/admin/SignIn");
      return;
    }
     // Set loading to false once userToken is validated
    setLoading(false);
  }, [userToken, router]);

  useEffect(() => {
    let timer;

    if (!alert?.type || !alert?.message) return;

    if (alert.type === "success") {
      toast.success(alert.message, { position: "top-right" });
    } else if (alert.type === "error") {
      toast.error(alert.message, { position: "top-right" });
    } else {
      toast.info(alert.message, { position: "top-right" });
    }

  
    timer = setTimeout(() => {
      dispatch(removeToast());
    }, 5500);

    return () => clearTimeout(timer);
  }, [alert, dispatch]);

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner
          className="border-2 border-primary "
          size={9}
          spin={true}
        ></Spinner>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex ">
        <Toaster />
        <Sidebar />
        <MainMenu />
        <div className="pt-20 bg-[#FAFAFB] w-full md:pl-[290px] sm:pl-[210px] min-h-screen">
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
}
