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
  const router = useRouter();
  const { toast: alert } = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("_APP_ADMIN_TOKEN_KEY_");
      if (!token) {
        router.push("/admin/SignIn");
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
    <ErrorBoundary>
      <div className="flex">
        <Toaster />
        <Sidebar />
        <MainMenu />
        <main className="pt-20 bg-[#FAFAFB] w-full md:pl-[290px] sm:pl-[210px] min-h-screen">
          {children}
        </main>
      </div>
    </ErrorBoundary>
  );
}
