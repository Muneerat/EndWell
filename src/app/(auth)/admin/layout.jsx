"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {toast:alert} = useSelector((state) => state.toast)
  const dispatch = useDispatch();

  useEffect(() => {
    let x;
    
    if (!(alert.type && alert.message)) {
        return;
    }

    if (alert.type == 'success') {
        toast.success(alert.message, {
            position: 'top-right'
        });
    }
    else if (alert.type == 'error') {
        toast.error(alert.message, {
            position: 'top-right'
        })
    }
    else {
        toast.info(alert.message, {
            position: 'top-right'
        });
    }

    x = setTimeout(() => {
        dispatch(removeToast());
    }, 2500);

    return () => clearTimeout(x);

}, [alert, dispatch]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     router.push("/SignIn");
  //     return;
  //   }
  //   setLoading(false);
  // }, [router]);

  // if (loading) return;

  return <>{children}</>;
}
