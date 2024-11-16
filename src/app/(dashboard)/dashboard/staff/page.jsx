"use client";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Smile } from "@/assets/icon";
import BoardFilter from "../components/board";
import { StaffColumns, StaffData } from "@/app/data/staffData";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/app/components/Spinner";

export default function Staff() {
  const [staffData, setStaffData] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const staffs = async () => {
      setProcessing(true);
      try {
        const response = await axios.get("api/v1/admin/user/all");
        console.log(response);
        const data = await response.data.users;

        const formattedData = data.map((staff, index) => ({
          id: index + 1,
          first_name: staff.first_name,
          last_name: staff.last_name,
          email: staff.email,
          phone: staff.phone,
          role: staff.role,
          department: staff.department,
        }));
        setStaffData(formattedData);

        return response.data;
      } catch (error) {
        console.log(error);
      }finally{
        setProcessing(false);
      }

    };
    staffs();
  }, []);
  return (
    <div className="my-5">
      <BoardFilter text="Staff">
        <ButtonUpload text="Add new staff" icon={<Smile />} link="addStaff" />
      </BoardFilter>
      <div>
        {processing ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={processing}
              className="border-2 border-primary "
              size={9}
            />
          </div>
        ) : (
          <DataTable data={staffData} columns={StaffColumns} />
        )}
      </div>
    </div>
  );
}
