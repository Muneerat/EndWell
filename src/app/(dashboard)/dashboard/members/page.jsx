"use client";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Smile } from "@/assets/icon";
import BoardFilter from "../components/board";
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
import { MemberColumns } from "@/app/data/member";

export default function Member() {
  const [memberData, setMemberData] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();

       //fetch all users 
  useEffect(() => {
    const members = async () => {
      setProcessing(true);
      try {
        const response = await axios.get("/admin/member/all");
        const data = await response.data.users;

        const formattedData = data.map((member, index) => ({
           ID: index + 1,
           id: member.id,
          first_name: member.first_name,
          last_name: member.last_name,
          phone: member.phone,
        }));
        setMemberData(formattedData);
        console.log(data);
        

        return response.data;
      } catch (error) {
        console.log(error);
      }finally{
        setProcessing(false);
      }

    };
    members();
  }, []);

    // Actions for table
    const handleActions = {
      view: (member) => {
        router.push(`/dashboard/viewMembers?member_id=${member.id}`);
      },
      edit: (member) => {
        // router.push(`/dashboard/editMember/${member.id}`);
        router.push(`/dashboard/editMembers?member_id=${member.id}`);
      },
      delete: async (member) => {
        try {
          
          const response = await axios.delete(`/admin/member/delete`, {
            data: { member_id: member.id }, 
          });
          // Update the table data without the deleted member
          setMemberData((prev) => prev.filter((item) => item.id !== member.id));
          dispatch(addToast({
            type:'success',
            message: response.data.message
          }))
          return response.data.message;

        } catch (error) {
          console.log("Failed to delete member:", error);
          // alert("Failed to delete member. Please try again.");
        }
      },
    };
    

  const columnsWithActions = MemberColumns.map((column) =>
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
      <BoardFilter text="Members">
        <ButtonUpload text="Add new member" icon={<Smile />} link="addMember" />
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
          <DataTable data={memberData} columns={columnsWithActions} />
        )}
      </div>
    </div>
  );
}
