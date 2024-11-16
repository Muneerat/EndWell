"use client";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Smile } from "@/assets/icon";
import BoardFilter from "../components/board";
import { StaffColumns, StaffData } from "@/app/data/staffData";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import handleErrors from "@/app/data/handleErrors";

export default function Staff() {
  const [staffData, setStaffData] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const columnsWithActions = StaffColumns.map((column) =>
    column.id === "actions"
      ? {
          ...column,
          cell: ({ row }) => (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0  ">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
              <DropdownMenuItem>View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ),
        }
      : column
  );
  const handleEdit = async () =>{
    try{
      await axios.put('api/v1/admin/user/update-profile', {user_id,first_name,last_name,email,phone,role,department})
    }catch(error){
      handleErrors(error,setErrors)
    }

  }
  //fetch all users 
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
          <DataTable data={staffData} columns={columnsWithActions} />
        )}
      </div>
    </div>
  );
}
