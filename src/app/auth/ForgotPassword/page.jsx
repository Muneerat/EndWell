'use client'
import Button from "@/app/components/Button";
import TextInput from "@/app/components/TextInput";
import { forgetPassword } from "@/Services/authService";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from '../../../libs/axios';

export default function ForgotPassword() {
  const {errors} = useSelector((state) => state.auth);
  const [email, setEmail] = useState('')
  
  const dispatch = useDispatch()
  const submit = async(e) => {
    e.preventDefault();
    // dispatch(forgetPassword({email}))
     console.log('got here')
    try{
     await axios.post('/api/v1/admin/forgot_password', {email});
      console.log('Success')
      return response.data;
  }catch (error) {
    if (error.response?.status == 422) {
      let newErrors = {};
     
      for (let err in error.response.data.data) {
          newErrors[err] = error.response.data.data[err]
      }
      console.log(error.response)
      // setErrors(newErrors);
  }
  else {
      // handle email could not be sent
  }
  }
  }
  return (
    <div className="my-auto flex justify-center items-center">
      <div className="bg-white py-10 px-6 rounded shadow mx-auto w-full sm:max-w-md">
        <h2 className="text-4xl text-ash-950 font-semibold">Password reset</h2>
        <div className="my-4 text-sm text-gray-600">
         
        </div>
        <form className="space-y-6" onSubmit={submit}>
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
                errorMessage={errors?.email && errors.email[0] }
              />
          </div>
          <Button className="w-full" type='submit' >
                Login
              </Button>

        </form>
      </div>
    </div>
  );
}
