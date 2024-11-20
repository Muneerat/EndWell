"use client";
import { removeToast } from "@/Store/features/toastSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function GuestLayout({ children }) {
  const router = useRouter();
  const { toast: alert } = useSelector((state) => state.toast);
  const { userToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(!userToken);
  const dispatch = useDispatch();
  const [clientLoading, setIsClientLoading] = useState(false);

  useEffect(()=>{
    setIsClientLoading(true)
  },[])

  // useEffect(() => {
  //   console.log(userToken, "signIn");
  //   const token = localStorage.getItem('_APP_TOKEN_KEY_') 
  //   if (!clientLoading) return;
  //   // // if (userToken) {
  //   // //   router.push("/dashboard/overview");
  //   // //   return;
  //   // // }
  //   // setLoading(false);

  // }, []);
useEffect(() => {
    if (!(alert.type && alert.message)) {
      return; // Skip if no valid alert
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

    // Clear the alert state after showing the toast
    dispatch(removeToast());
  }, [alert, dispatch]);
  // if (loading) return;

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
