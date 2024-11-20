"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import { Back, Smile } from "@/assets/icon";
import Link from "next/link";
import TextInput from "@/app/components/TextInput";
import PasswordInput from "@/app/components/passwordInput";
import axios from "axios";
import handleErrors from "@/app/data/handleErrors";
import { useDispatch } from "react-redux";
import { addToast } from "@/Store/features/toastSlice";
import BoardFilter from "../components/board";
import ButtonUpload from "../components/button";

export default function AddMember() {
  const initialFormData = {
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    confirm_password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialFormData); // Reset form to initial state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const response = await axios.post("/admin/member/add", formData);
      dispatch(
        addToast({
          type: "success",
          message: response.data.message,
        })
      );
      setErrors({});
      resetForm(); // Clear input fields after successful addition
    } catch (error) {
      handleErrors(error, setErrors);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="md:px-6 sm:px-14">
      {/* <div className="flex items-center gap-8">
        <Link
          href="members"
          className="flex items-center gap-2 font-normal  cursor-pointer "
        >
          <Back />
          <p>Back</p>
        </Link>
        <h1 className="font-bold text-2xl">Add new member</h1>
      </div> */}
        <BoardFilter text="Members">
        <ButtonUpload text="Upload Multiple" icon={<Smile />} link="uploadMember" />
      </BoardFilter>
      <div className="bg-white flex flex-col my-20 p-8 w-full shadow-sm rounded-md max-w-[1050px]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5 mt-6 pb-32 rounded-md">
            <div>
              <TextInput
                className="w-full block"
                label="First name"
                id="first_name"
                maxLength="255"
                placeholder="Enter your first name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                errorMessage={errors?.first_name}
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
                value={formData.last_name}
                onChange={handleChange}
                errorMessage={errors?.last_name}
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
                value={formData.phone}
                onChange={handleChange}
                errorMessage={errors?.phone}
              />
            </div>
            <div>
              <PasswordInput
                className="w-full block"
                label="Password"
                id="password"
                maxLength="255"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
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
                value={formData.confirm_password}
                onChange={handleChange}
                errorMessage={errors?.confirm_password}
              />
            </div>
          </div>
            <div>
              <Button
                spin={processing}
                disabled={processing}
                className="w-3/6 mt-7"
              >
                Add
              </Button>
            </div>
        </form>
      </div>
    </div>
  );
}
