"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getMemberProfile } from "@/Services/memberProfileService";

export default function ViewStaff() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user_id = searchParams.get("user_id"); // Fetch the user_id from query parameters
  const [members, setMembers] = useState({});
  
  const { userInfo, message } = useSelector((state) => state.userAuth);
  // const {member} = useSelector((state) => state.memberProfile)
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getMemberProfile({}));
  // }, []);
  // useEffect(() => {
  //   if (user_id) {
  //     dispatch(getMemberProfile({ id: user_id }));
  //   }
  // }, [user_id, dispatch]);
  useEffect(() => {
    console.log(user_id);
    
    if (user_id) {
      dispatch(getMemberProfile({ id: user_id }));
    }
  }, [user_id, dispatch]);

  // useEffect(() => {
  //   console.log(userInfo, message, user_id);

  //     const fetchStaff = async () => {
  //       try {
  //         const response = await axios.get(`/member/profile`);
  //         console.log(response.data);

  //         setMembers(response.data.data);
  //       } catch (error) {
  //         console.log("Failed to fetch member:", error);
  //       }
  //     };
  //     fetchStaff();

  // }, [userInfo]);

  //   if (!staff)
  //     return (
  //       <div className="flex justify-center items-center mt-20">
  //         <Spinner
  //           className="border-2 border-primary "
  //           size={9}
  //           spin={true}
  //         ></Spinner>
  //       </div>
  //     );

  return (
    <div>
      <div className="p-5 md:w-2/6 m-10 rounded-md flex flex-col bg-white">
        {/* Header */}
        <div className="border font-bold p-3 w-fit rounded-md">Staff</div>
        <div className="flex justify-between py-4 items-center">
          <h1 className="font-bold text-2xl">Profile</h1>
          <Button
            onClick={() =>
              router.push(`/user/editProfile?user_id=${userInfo.id}`)
            }
          >
            Edit
          </Button>
        </div>

        <div>
          <div className="rounded-full h-12 w-12 bg-[#141E2F] text-white flex justify-center mx-auto items-center">
            {userInfo.first_name?.[0]?.toUpperCase()}
            {userInfo.last_name?.[0]?.toUpperCase()}
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1  gap-8 my-6">
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              First Name:
            </span>
            <span className="capitalize text-sm">
              {userInfo.first_name || "-"}
            </span>
          </div>
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              Last Name:
            </span>
            <span className="capitalize text-sm">
              {userInfo.last_name || "-"}
            </span>
          </div>
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              Phone No:
            </span>
            <span className="capitalize text-sm">
              {userInfo.phone || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
              Role:
            </span>
            <span className="capitalize text-sm">{userInfo.role || "N/A"}</span>
          </div>
        </div>

        {/* Back Button */}
        <Button className="w-52 my-10" onClick={() => router.push("/user/update-password")}>
          Update password
        </Button>
      </div>
      <div></div>
    </div>
  );
}
