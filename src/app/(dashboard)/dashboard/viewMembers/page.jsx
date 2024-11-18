"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/Spinner";

export default function ViewMember() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const members = searchParams.get("member"); // Fetch the member from query parameters
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (members) {
      const fetchMember = async () => {
        try {
          const response = await axios.get(`/admin/member/profile`, {
            params: { member },
          });
          console.log(response.data);

          setMember(response.data.data); // Set member data
        } catch (error) {
          console.error("Failed to fetch member:", error);
        }
      };
      fetchMember();
    }
  }, [members]);

  if (!member)
    return (
      <div className="flex justify-center items-center mt-20">
        <Spinner
          className="border-2 border-primary "
          size={9}
          spin={true}
        ></Spinner>
      </div>
    );

  return (
    <div className="p-5 md:w-4/6 flex flex-col">
      {/* Header */}
      <div className="border font-bold p-3 w-fit rounded-md">Member</div>
      <div className="flex justify-between py-4 items-center">
        <h1 className="font-bold text-2xl">Profile</h1>
        <Button
          onClick={() =>
            router.push(`/dashboard/editStaff?member=${member.id}`)
          }
        >
          Edit
        </Button>
      </div>

      {/* Profile Picture and Email */}
      <div>
        <div className="rounded-full h-12 w-12 bg-[#141E2F] text-white flex justify-center mx-auto items-center">
          {staff.first_name?.[0]?.toUpperCase()}
          {staff.last_name?.[0]?.toUpperCase()}
        </div>
        {/* <div className="text-[#A3A3A3] items-center text-center mt-2">
          {staff.email}
        </div> */}
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
            First Name:
          </span>
          <span className="capitalize text-sm">{member.first_name || "-"}</span>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
            Last Name:
          </span>
          <span className="capitalize text-sm">{member.last_name || "-"}</span>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
            Phone No:
          </span>
          <span className="capitalize text-sm">{member.phone || "N/A"}</span>
        </div>
      </div>

      {/* Back Button */}
      {/* <Button className='w-20' onClick={() => router.push("/staff")}>Back</Button> */}
    </div>
  );
}
