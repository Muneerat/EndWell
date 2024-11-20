"use client";

import { useEffect, useState } from "react";
import SignInImg from "@/assets/SignInImg.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "@/Services/authService";
import Button from "@/app/components/Button";
import TextInput from "@/app/components/TextInput";
import { addToast } from "@/Store/features/toastSlice";
import PasswordInput from "@/app/components/passwordInput";

export default function SignIn() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { processing, errors, isError, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkAuth = () => {
  //     const token = localStorage.getItem("_APP_TOKEN_KEY_");
  //     if (token) {
  //       router.push("/user/overview");
  //     } else {
  //       setIsLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(userSignIn({ phone, password }));
    if (result.payload && result.payload.token) {
      localStorage.setItem("_APP_TOKEN_KEY_", result.payload.token);
      router.refresh();
      router.push("/user/overview");
      dispatch(
        addToast({
          type: "success",
          message: "Logged in successfully.",
        })
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="sr-only">Loading...</span>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-full overflow-hidden h-screen md:flex hidden justify-center items-center">
        <Image src={SignInImg} alt="SignInImg" className="block w-full" />
      </div>
      <div className="w-full md:p-12 p-5 bg-[#FAFAFB]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl capitalize font-semibold text-secondary py-2">
            Welcome Back!
          </h1>
          <h1 className="text-primary md:text-6xl text-3xl font-extrabold">
            END<span className="text-secondary">WELL</span>
          </h1>
          <div className="flex flex-col gap-y-4 md:w-3/4 w-full bg-[#fff] md:p-12 p-5 mt-6 pb-32 rounded-md">
            <div>
              {isError && message && (
                <p className="text-red-700" role="alert">
                  {message}
                </p>
              )}
            </div>
            <p className="text-secondary text-2xl font-semibold">Login</p>
            <div>
              <TextInput
                className="w-full block"
                label="Phone number"
                id="phone"
                maxLength="255"
                placeholder="Enter phone number"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                errorMessage={errors?.phone}
                required
                aria-required="true"
              />
            </div>
            <div>
              <PasswordInput
                className="w-full block"
                label="Password"
                id="password"
                maxLength="255"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={errors?.password}
                required
                aria-required="true"
              />
            </div>
            <div>
              <Button
                spin={processing}
                disabled={processing}
                className="w-full"
                type="submit"
                aria-label={processing ? "Logging in..." : "Login"}
              >
                {processing ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="text-center text-sm">
              Forgot password?{" "}
              <Link href="/admin/ForgotPassword" className="underline">
                Reset
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
