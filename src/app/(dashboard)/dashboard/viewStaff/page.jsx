"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { staffProfile } from "@/Services/staffProfileService";
import { fetchPermissions } from "./action";

export default function ViewStaff() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id"); // Fetch the user_id from query parameters
  const [staff, setStaff] = useState(null);
  const { profile, errors } = useSelector((state) => state.staffProfiles);
  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    if (user_id) {
      const fetchStaff = async () => {
        try {
          const response = await axios.get(`admin/user/profile`, {
            headers: { Role: "admin" },
            params: { user_id },
          });
          setStaff(response.data.data);
        } catch (error) {
          console.error("Failed to fetch staff:", error);
        }
      };
      fetchStaff();
    }
  }, [user_id]);

  if (!staff)
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
    <div>
      <div className="p-5 md:w-2/6 m-10 rounded-md flex flex-col bg-white">
        {/* Header */}
        <div className="border font-bold p-3 w-fit rounded-md">Staff</div>
        <div className="flex justify-between py-4 items-center">
          <h1 className="font-bold text-2xl">Profile</h1>
          <Button
            onClick={() =>
              router.push(`/dashboard/editStaff?user_id=${staff.id}`)
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
          <div className="text-[#A3A3A3] items-center text-center mt-2">
            {staff.email}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1  gap-8 my-6">
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              First Name:
            </span>
            <span className="capitalize text-sm">
              {staff.first_name || "-"}
            </span>
          </div>
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              Last Name:
            </span>
            <span className="capitalize text-sm">{staff.last_name || "-"}</span>
          </div>
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              Phone No:
            </span>
            <span className="capitalize text-sm">{staff.phone || "N/A"}</span>
          </div>
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              Role:
            </span>
            <span className="capitalize text-sm">{staff.role || "N/A"}</span>
          </div>
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              Department:
            </span>
            <span className="capitalize text-sm">
              {staff.department || "N/A"}
            </span>
          </div>
        </div>
      </div>
      {/* <div>
      <h1>Permissions</h1>
      <div className="grid grid-cols-1 gap-3">
        {permissions.map((permission) => (
          <label
            key={permission.id}
            className="flex items-center space-x-3"
          >
            <input
              type="checkbox"
              checked={selectedPermissions.includes(permission.id)}
              onChange={() => handleCheckboxChange(permission.id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-sm">{permission.name}</span>
          </label>
        ))}
      </div>
     </div> */}
    </div>
  );
}
