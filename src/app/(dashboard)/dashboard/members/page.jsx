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
import { useDispatch, useSelector } from "react-redux";
import { MemberColumns } from "@/app/data/member";
import { setMember } from "@/Store/features/memberSlice";
import { getAllMembers } from "@/Services/membersServie";

export default function Member() {
  const [memberData, setMemberData] = useState([]);
  // const [loadingS, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const {members, totalMembers,loading,error} = useSelector((state) => state.member)

       //fetch all users 
  useEffect(() => {

     dispatch(getAllMembers())
  }, [dispatch]);

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
            headers: {Role: 'admin'},
            data: { member_id: member.id }, 
          });
          // Update the table data without the deleted member
          // setMemberData((prev) => prev.filter((item) => item.id !== member.id));
          dispatch(getAllMembers());
          dispatch(addToast({
            type:'success',
            message: response.data.message
          }))
          return response.data.message;

        } catch (error) {
          console.log("Failed to delete member:", error);
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
        {/* {loading ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={loading}
              className="border-2 border-primary "
              size={9}
            />
          </div>
        ) : error?(
          <div>{error}</div>
        ):Array.isArray(members) &&  members.length > 0 ? 
         (
          <DataTable data={members} columns={columnsWithActions} />
        ):
        (
          (
            !loading && !error && <p>No members found.</p>
          )
        )} */}
              {loading ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={loading}
              className="border-2 border-primary"
              size={9}
            />
          </div>
        ) : error ? (
          <div className="pb-8 text-red-700 text-sm">
            {/* Safely render error message */}
            {typeof error === "string"
              ? error
              : error.message || "An unexpected error occurred."}
          </div>
        ) : Array.isArray(members) && members.length > 0 ? (
          <DataTable data={members} columns={columnsWithActions} />
        ) : (
          !loading && !error && <p>No members found.</p>
        )}
      </div>
    </div>
  );
}
