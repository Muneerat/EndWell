// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// export default function EditProfile() {
//   const dispatch = useDispatch()
//   const {userInfo} = useSelector((state) => state.userAuth)

//   useEffect(() => {
//     dispatch(getMemberProfile({}))
//   },[])
//   return (
//     <div>

//     </div>
//   )
// }


"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemberProfile } from "@/Services/memberProfileService";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import TextInput from "@/app/components/TextInput";
import { addToast } from "@/Store/features/toastSlice";

export default function EditStaff() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id"); // Fetch the user_id from query parameters
  // const { member, loading } = useSelector((state) => state.memberProfile);
  const {userInfo,message} = useSelector((state) => state.userAuth)
  const [errors, setErrors] = useState()
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const dispatch = useDispatch();

  // Fetch member profile when the component loads
  useEffect(() => {
    console.log(user_id);
    
    if (user_id) {
      dispatch(getMemberProfile({ id: user_id }));
    }
  }, [user_id, dispatch]);

  // Populate form data when member profile is loaded
  useEffect(() => {
    if (userInfo) {
      setFormData({
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        phone: userInfo.phone || "",
      });
    }
  }, [userInfo]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true)
    try {
     const response =  await axios.post(`/member/update-profile`, {...formData, user_id}) 
     console.log("Payload being sent:", {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
    });
    
     dispatch(addToast({
      type:'success',
      message: response.data.message
    }))
      router.push("/user/profile"); 
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }finally {
      setProcessing(false); 
    }
  };

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <div className="p-5 md:w-2/6 m-10 rounded-md flex flex-col bg-white">
      {/* Header */}
      <div className="border font-bold p-3 w-fit  rounded-md">Edit Profile</div>
      <form onSubmit={handleSubmit} className="m-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5 mt-6 pb-32 rounded-md">
            <div>
              <TextInput
                className="w-full block"
                label="First name"
                id="first_name"
                name="first_name"
                maxLength="255"
                placeholder="Enter your first name"
                type="text"
                value={formData.first_name || ""}
                onChange={handleChange}
                errorMessage={errors?.first_name}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Last name"
                id="last_name"
                name="last_name"
                maxLength="255"
                placeholder="Enter your last name"
                type="text"
                value={formData.last_name || ""}
                onChange={handleChange}
                errorMessage={errors?.last_name}
              />
            </div>
            <div>
              <TextInput
                className="w-full block"
                label="Phone number"
                id="phone"
                name="phone"
                maxLength="255"
                placeholder="Enter your phone number"
                type="number"
                value={formData.phone || ""}
                onChange={handleChange}
                errorMessage={errors?.phone}
              />
            </div>
            </div>
            <div>
              <Button spin={processing} disabled={processing} className="w-full mt-7">
                Update
              </Button>
          </div>
        </form>
    </div>
  );
}
