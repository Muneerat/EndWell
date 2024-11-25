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
import { useRouter } from "next/navigation";
import { addToast } from "@/Store/features/toastSlice";
import { useDispatch } from "react-redux";

export default function Staff() {
  const [staffData, setStaffData] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

       //fetch all users 
  useEffect(() => {
    const staffs = async () => {
      setProcessing(true);
      try {
        const response = await axios.get("/admin/user/all",{ headers: {Role: 'admin'}});
        const data = await response.data.users;

        const formattedData = data.map((staff, index) => ({
           ID: index + 1,
           id: staff.id,
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

  
    const handleActions = {
      view: (staff) => {
        router.push(`/dashboard/viewStaff?user_id=${staff.id}`);
      },
      edit: (staff) => {
        // router.push(`/dashboard/editStaff/${staff.id}`);
        router.push(`/dashboard/editStaff?user_id=${staff.id}`);
      },
      delete: async (staff) => {
        try {
          
          const response = await axios.delete(`/admin/user/delete`, {
            headers: {Role: 'admin'},
            data: { user_id: staff.id }, 
          });
          // Update the table data without the deleted staff
          setStaffData((prev) => prev.filter((item) => item.id !== staff.id));
          dispatch(addToast({
            type:'success',
            message: response.data.message
          }))
          return response.data.message;

        } catch (error) {
          console.log("Failed to delete staff:", error);
          // alert("Failed to delete staff. Please try again.");
        }
      },
    };
    

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
              <DropdownMenuItem onClick={() => handleActions.edit(row.original)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActions.delete(row.original)}>Delete</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleActions.view(row.original)}> View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ),
        }
      : column
  );



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
