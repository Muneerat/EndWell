
"use client";
import Button from "@/app/components/Button";
import PasswordInput from "@/app/components/passwordInput";
import TextInput from "@/app/components/TextInput";
import handleErrors from "@/app/data/handleErrors";
import { addToast } from "@/Store/features/toastSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

export default function UpdateProfile() {
  const [password, setPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  const [code, setCode] = useState("");
  // const [resending, setResending] = useState(false)
  // const [secondsLeft, setSecondsLeft] = useState(60)
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState({});
  const router = useRouter()

   const dispatch = useDispatch();
  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
     const response = await axios.post("/member/update-profile", { first_name, last_name,phone});
     dispatch(addToast({
       type:'success',
       message: response.data.message
     }))
      router.push('/admin/SignIn');
      return response.data;
    } catch (error) {
     handleErrors(error,setErrors)
      
    }finally {
      setProcessing(false)
    }
  };


  return (
    <div className="my-auto h-full w-full flex justify-center items-center">
      <div className="bg-white py-10 px-6 rounded shadow m-auto w-full sm:max-w-md">
      <div>{(errors ) && <p className="text-red-700">{errors?.email} </p>  }</div>
        <h2 className="text-4xl text-ash-950 font-semibold">Update Profile</h2>
        <div className="my-4 text-sm text-gray-600">
        Kindly enter a new and secure password below.
        </div>
        <form className="space-y-6" onSubmit={submit}>
        <div>
            <TextInput
              className="w-full block"
              label="Enter otp"
              id="code"
              maxLength="255"
              placeholder="Enter otp"
              autoComplete='code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              errorMessage={errors?.code}
              name='code'
            />
          </div>
          <div>
            <PasswordInput
              className="w-full block"
              label="Enter password"
              id="password"
              placeholder="Enter password"
              autoComplete='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errorMessage={errors?.password}
            />
          </div>
          <div>
            <PasswordInput
              className="w-full block"
              label="Re-enter password"
              id="confirm_password"
              maxLength="32"
              minLength="8"
              placeholder="Re-enter password"
              autoComplete='new-password'
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              errorMessage={errors?.confirm_password}
            />
          </div>
          <Button spin={processing} disabled={processing} className="w-full" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

