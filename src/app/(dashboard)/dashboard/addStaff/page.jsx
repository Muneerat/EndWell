"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import { Back } from "@/assets/icon";
import Link from "next/link";
import Label from "@/app/components/label";
import TextInput from "@/app/components/TextInput";

export default function AddStaff() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [processing, setProcessing] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);


    }
  return (
    <div className="md:px-6 py-10 sm:px-14 m-3">
      <div className="flex items-center gap-8">
        <Link
          href="staff"
          className="flex items-center gap-2 font-normal  cursor-pointer "
        >
          <Back />
          <p>Back</p>
        </Link>

        <h1 className="font-bold text-2xl">Add new staff</h1>
      </div>
      <div className="bg-white flex flex-col my-20 p-8 w-full md:w-5/6 shadow-sm rounded-md mx-auto justify-center max-w-[700px] ">
      <form onSubmit={handleSubmit}>
     
          <div className="flex flex-col gap-y-4 md:w-3/4 w-full bg-[#fff] md:p-12 p-5 mt-6 pb-32 rounded-md">
            {/* <p className="text-secondary text-2xl font-semibold">Login</p> */}
            <div>
              <TextInput
                className="w-full block"
                label="Email"
                id="email"
                maxLength="255"
                placeholder="sample@email.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors?.email }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Email"
                id="email"
                maxLength="255"
                placeholder="sample@email.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors?.email }
              />
            </div>

            {/* <div>
              <TextInput
                className="w-full block"
                label="Password"
                id="password"
                maxLength="255"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={errors?.password}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Email"
                id="email"
                maxLength="255"
                placeholder="sample@email.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors?.email }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Email"
                id="email"
                maxLength="255"
                placeholder="sample@email.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors?.email }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Email"
                id="email"
                maxLength="255"
                placeholder="sample@email.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors?.email }
              />
            </div> */}

            <div>
              <Button spin={processing} disabled={processing} className="w-full" type="submit">
                Login
              </Button>
            </div>
            <div className="text-center text-sm">
              Forgot password? <Link href="/admin/ForgotPassword">Reset </Link>
            </div>
          </div>
        </form>
         
          <Button className="md:w-2/6 my-5">Send Message</Button>
        </div>
      </div>
    
  );
}
