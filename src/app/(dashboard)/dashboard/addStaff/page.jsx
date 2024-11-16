"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import { Back } from "@/assets/icon";
import Link from "next/link";
import Label from "@/app/components/label";
import TextInput from "@/app/components/TextInput";
import PasswordInput from "@/app/components/passwordInput";
import axios from "axios";
import handleErrors from "@/app/data/handleErrors";
import { useDispatch } from "react-redux";
import { addToast } from "@/Store/features/toastSlice";

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
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        
        try{ 
         const response = await axios.post("/api/v1/admin/user/add", {
            first_name,
            last_name,
            email,
            phone,
            role,
            department,
            password,
            confirm_password
        });
            dispatch((addToast({
                type:'success',
                message: response.data.message
            })))
            setErrors({})

        // Clear input 
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setRole("");
        setDepartment("");
        setPassword("");
        setConfirmPassword("");

            // return response.data; 
            
    }catch(error){
       handleErrors(error, setErrors)
    }finally{
        setProcessing(false);
    }
    }
  return (
    <div className="md:px-6 pt-4 sm:px-14 m-3">
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
      <div className="bg-white flex flex-col my-20 p-8 w-full  shadow-sm rounded-md max-w-[1050px] ">
      <form onSubmit={handleSubmit}>
     
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5  mt-6 pb-32 rounded-md">
            {/* <p className="text-secondary text-2xl font-semibold">Login</p> */}
            <div>
              <TextInput
                className="w-full block"
                label="First name"
                id="first_name"
                maxLength="255"
                placeholder="Enter your first name"
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                errorMessage={errors?.first_name }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Last name"
                id="last_name"
                maxLength="255"
                placeholder="Enter your last name"
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                errorMessage={errors?.last_name }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Email"
                id="email"
                maxLength="255"
                placeholder="Enter your email "
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                errorMessage={errors?.email }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Phone number"
                id="phone"
                maxLength="255"
                placeholder="Enter your phone number"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                errorMessage={errors?.phone }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Department"
                id="department"
                maxLength="255"
                placeholder="Enter your department"
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                errorMessage={errors?.department }
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Role"
                id="role"
                maxLength="255"
                placeholder="Enter your role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                errorMessage={errors?.role }
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
              />
            </div>
            <div>
              <PasswordInput
                className="w-full block"
                label="Confirm password"
                id="confirm_password"
                maxLength="255"
                placeholder="********"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                errorMessage={errors?.confirm_password }
              />
            </div>

            <div>
              <Button spin={processing} disabled={processing} className="w-full mt-7" >
              Add
              </Button>
            </div>
          </div>
        </form>
         
          {/* <Button className="md:w-2/6 my-5">Send Message</Button> */}
        </div>
      </div>
    
  );
}
