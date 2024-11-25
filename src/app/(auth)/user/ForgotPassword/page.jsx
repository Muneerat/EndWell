"use client";
import Button from "@/app/components/Button";
import TextInput from "@/app/components/TextInput";
import handleErrors from "@/app/data/handleErrors";
import { forgetPassword } from "@/Services/authService";
import { addToast } from "@/Store/features/toastSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from '../../../libs/axios';

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [processing, setProcessing] = useState(false)
  const [errors, setErrors] = useState(false);
  const router = useRouter()

  const dispatch = useDispatch();
  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
     const response =  await axios.post("/member/forgot_password", { phone },);
      dispatch((addToast({
        type:'success',
        message: response.data.message
      })))
      router.push('/user/reset-password');
      return response.data;
    } catch (error) {
         handleErrors(error,setErrors);

    }finally {
      setProcessing(false)
    }
  };
  return (
    <div className="my-auto h-screen w-full flex justify-center items-center">
      <div className="bg-white py-10 px-6 rounded shadow m-auto w-full sm:max-w-md">
        <h2 className="text-4xl text-ash-950 font-semibold">Password reset</h2>
        <div className="my-4 text-sm text-gray-600"></div>
        <form className="space-y-6" onSubmit={submit}>
          <div>
            <TextInput
              className="w-full block"
              label="Phone number"
              id="phone"
              maxLength="255"
              placeholder="Enter your phone number"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              errorMessage={errors?.phone}
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
