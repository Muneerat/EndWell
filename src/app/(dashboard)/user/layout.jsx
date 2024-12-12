"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import MainMenu from "./components/mainmenu";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { removeToast } from "@/Store/features/toastSlice";
import axios from "axios";

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

  useEffect(() => {
    const validateToken = async () => {
      const expirationTime =
        localStorage.getItem("_APP_USER_EXPIRATION_TIME_KEY_") ?? new Date();
      const token = localStorage.getItem("_APP_USER_TOKEN_KEY_");
      const refreshToken = localStorage.getItem(
        "_APP_USER_REFRESH_TOKEN_KEY_"
      );

      try {
        if (!token) {
          router.push("/user/SignIn");
          return;
        }

        if (new Date(expirationTime) < new Date()) {
          try {
            const refreshResponse = await axios.post(
              "/member/refresh-token",
              {
                refresh_token: refreshToken,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (refreshResponse.status === 200) {
              localStorage.setItem(
                "_APP_USER_TOKEN_KEY_",
                refreshResponse.data.access_token
              ); // Save new access token
              const expirationTime =
                new Date().getTime() + 1 * 60 * 60 * 1000 + 45 * 60 * 1000;
              localStorage.setItem(
                "_APP_USER_EXPIRATION_TIME_KEY_",
                expirationTime
              ); // Save new expiration time

              router.refresh();
            } else {
              localStorage.removeItem("_APP_USER_TOKEN_KEY_");
              localStorage.removeItem("_APP_USER_REFRESH_TOKEN_KEY_");
              localStorage.removeItem("_APP_USER_EXPIRATION_TIME_KEY_");
              router.push("/user/SignIn");
            }
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            localStorage.removeItem("_APP_USER_TOKEN_KEY_");
            localStorage.removeItem("_APP_USER_REFRESH_TOKEN_KEY_");
            localStorage.removeItem("_APP_USER_EXPIRATION_TIME_KEY_");
            router.push("/user/SignIn");
          }
        } else {
          // Token is still valid, make an API request with the current token
          const response = await axios.get("/check_token", {
            headers: {
              Authorization: `Bearer ${token}`, // Send the current access token
            },
          });

          if (response.status === 401) {
            localStorage.removeItem("_APP_USER_TOKEN_KEY_");
            localStorage.removeItem("_APP_USER_REFRESH_TOKEN_KEY_");
            localStorage.removeItem("_APP_USER_EXPIRATION_TIME_KEY_");
            router.push("/user/SignIn");
          }
        }
      } catch (error) {
        console.log("Token validation error:", error);
        localStorage.removeItem("_APP_USER_TOKEN_KEY_");
        localStorage.removeItem("_APP_USER_REFRESH_TOKEN_KEY_");
        localStorage.removeItem("_APP_USER_EXPIRATION_TIME_KEY_");
        router.push("/user/SignIn");
      }
    };

    validateToken();
    // runs every 20 minutes to check if the token is still valid
    const interval = setInterval(() => {
      validateToken();
    }, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);

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
      <Toaster />
      <Sidebar />
     
        <MainMenu />
        <div className="pt-20 bg-[#FAFAFB] w-full md:pl-[290px] min-h-screen ">{children}</div>
      
    </div>
  );
}
