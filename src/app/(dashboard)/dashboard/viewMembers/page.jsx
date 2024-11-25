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
  const member_id = searchParams.get("member_id"); 
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (member_id) {
      const fetchMember = async () => {
        try {
          const response = await axios.get(`/admin/member/profile`, {
            headers: {Role: 'admin'},
            params: { member_id },
          });
          setMember(response.data.data); 
        } catch (error) {
          console.error("Failed to fetch member:", error);
        } finally {
          setLoading(false); 
        }
      };
      fetchMember();
    } else {
      console.error("Member ID is missing in query parameters.");
      setLoading(false); 
    }
  }, [member_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Spinner className="border-2 border-primary" size={9} spin={true} />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">Failed to load member details.</p>
      </div>
    );
  }

  return (
    <div className="p-5 md:w-4/6 flex flex-col">
      <div className="border font-bold p-3 w-fit rounded-md">Member</div>
      <div className="flex justify-between py-4 items-center">
        <h1 className="font-bold text-2xl">Profile</h1>
        <Button
          onClick={() =>
            router.push(`/dashboard/editMembers?member_id=${member.id}`)
          }
        >
          Edit
        </Button>
      </div>
      <div className="text-center mb-4">
        <div className="rounded-full h-12 w-12 bg-[#141E2F] text-white flex justify-center mx-auto items-center">
          {member.first_name?.[0]?.toUpperCase()}
          {member.last_name?.[0]?.toUpperCase()}
        </div>
      </div>

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
      {/* <Button onClick={() => router.back()}>Back</Button> */}
    </div>
  );
}
