'use client'
import SignInImg from "../../../assets/SignInImg.png";
// import Button from "@/components/Button";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// import SignInImg from "../../../assets/SignInImg.png";
// import Button from "@/components/Button";
// import TextInput from "@/components/TextInput";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React from "react";

export default function SignIn() {
  const router = useRouter()

  const handleSubmit = e => {
    e.preventDefault();
    router.push('dashboard/overview')
  }
  return (
    <div className="flex">
      <div className="w-full overflow-hidden h-screen md:flex hidden justify-center items-center">
        <Image src={SignInImg} alt="SignInImg" className="block w-full" />
      </div>
      <div className="w-full p-12 bg-[#FAFAFB]">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl capitalize font-semibold text-secondary py-2 ">
            Welcome Back!
          </h1>
          <h1 className="text-primary text-6xl font-extrabold">
            END<span className="text-secondary">WELL</span>
          </h1>
          <div className="flex flex-col gap-y-4 md:w-3/4 w-full bg-[#fff] p-12 mt-6 pb-32 rounded-md  ">
            <p className="text-secondary text-2xl font-semibold">Login</p>
            <div>
            <TextInput
              className="w-full block"
              label="Email"
              id="email"
              maxLength="255"
              placeholder="sample@email.com"
              type="text"
              
            />
            </div>
            <div>
            <TextInput
              className="w-full block"
              label="Password"
              id="email"
              maxLength="255"
              placeholder="********"
              type="password"
              
            />
            </div>
            <div>
              <Button >
                Login
              </Button>
            </div>
            <div className='text-center text-sm'>
                        Forgot password? <Link href="auth/ForgotPassword">Reset </Link>
                    </div>
          </div>
        </form>
      </div>
    </div>
  );
}

