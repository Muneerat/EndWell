"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffProfile } from "@/Services/staffProfileService";
import Spinner from "@/app/components/Spinner";
import Button from "@/app/components/Button";

export default function ViewStaff() {
  const router = useRouter();
  const user_id = new URLSearchParams(window.location.search).get("user_id"); 
  const { profile, processing, errors } = useSelector((state) => state.staffProfiles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user_id) {
      dispatch(staffProfile());
      
    }
  }, [dispatch, user_id]);

  if (processing) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Spinner className="border-2 border-primary" size={9} spin={true} />
      </div>
    );
  }


  if (!profile) {
    return <div>No staff profile available.</div>;
  }

  return (
    <div className="p-5 md:w-2/6 m-10 rounded-md flex flex-col bg-white">
      <div className="border font-bold p-3 w-fit rounded-md">Staff</div>
      <div className="flex justify-between py-4 items-center">
        <h1 className="font-bold text-2xl">Profile</h1>
        <Button onClick={() => router.push(`/dashboard/editProfile?user_id=${profile.id}`)}>
          Edit
        </Button>
      </div>
      <div className="rounded-full h-12 w-12 bg-[#141E2F] text-white flex justify-center mx-auto items-center">
        {profile.first_name?.[0]?.toUpperCase()}
        {profile.last_name?.[0]?.toUpperCase()}
      </div>
      <div className="text-[#A3A3A3] items-center text-center mt-2">{profile.email}</div>
      <div className="grid grid-cols-1 gap-8 my-6">
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">First Name:</span>
          <span className="capitalize text-sm">{profile.first_name || "-"}</span>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">Last Name:</span>
          <span className="capitalize text-sm">{profile.last_name || "-"}</span>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">Phone No:</span>
          <span className="capitalize text-sm">{profile.phone || "N/A"}</span>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">Role:</span>
          <span className="capitalize text-sm">{profile.role || "N/A"}</span>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">Department:</span>
          <span className="capitalize text-sm">{profile.department || "N/A"}</span>
        </div>
      </div>
      <Button className="w-52 my-10" onClick={() => router.push("/dashboard/update-password")}>
        Update Password
      </Button>
    </div>
  );
}
