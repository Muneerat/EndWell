"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import MainMenu from "./components/mainmenu";
import ErrorBoundary from "@/app/components/error-boundary";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { removeToast } from "@/Store/features/toastSlice";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userToken } = useSelector((state) => state.auth);
     const { toast: alert,  } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userToken, "Dashboard");
    if (!userToken) {
      router.push("/admin/SignIn");
      return;
    }
    setLoading(false);
  }, [userToken, router]);
  useEffect(() => {
    let x;

    if (!(alert.type && alert.message)) {
      return;
    }

    if (alert.type == "success") {
      toast.success(alert.message, {
        position: "top-right",
      });
    } else if (alert.type == "error") {
      toast.error(alert.message, {
        position: "top-right",
      });
    } else {
      toast.info(alert.message, {
        position: "top-right",
      });
    }

    x = setTimeout(() => {
      dispatch(removeToast());
    }, 5500);

    return () => clearTimeout(x);
  }, [alert, dispatch]);

  if (loading) return;
  return (
    <ErrorBoundary>
      <div className="flex ">
        <Toaster />
        <Sidebar />

        <MainMenu />
        <div className="pt-20 bg-[#FAFAFB] w-full md:pl-[290px] sm:pl-[210px] min-h-screen ">
          {children}
        </div>
      </div>
    </ErrorBoundary>
  );
}
