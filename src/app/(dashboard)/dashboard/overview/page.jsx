"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Sms, Upload2 } from "@/assets/icon";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OverviewColumns, OverviewData } from "@/app/data/overviewData";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "@/Services/membersServie";
import { getAllLedger } from "@/Services/ledgerService";
import Spinner from "@/app/components/Spinner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { MemberColumns } from "@/app/data/member";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addToast } from "@/Store/features/toastSlice";
import { dashboardData } from "./action";
import handleErrors from "@/app/data/handleErrors";

export default function Overview() {
  const { members, loading } = useSelector((state) => state.member);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [dashboard, setDashboard] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    const dashboardDatas = async () => {
      try {
        const response = await dashboardData();
        setDashboard(response);
      } catch (error) {
        handleErrors(error, setError(error.response));
        console.log("Failed to fetch dashboard data:", error);
      }
    };
    //  dispatch(getAllLedger())
    dashboardDatas();
  }, []);

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

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
          headers: { Role: "admin" },
          data: { member_id: member.id },
        });
        // Update the table data without the deleted member
        // setMemberData((prev) => prev.filter((item) => item.id !== member.id));
        dispatch(getAllMembers());
        dispatch(
          addToast({
            type: "success",
            message: response.data.message,
          })
        );
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
                <DropdownMenuItem
                  onClick={() => handleActions.edit(row.original)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleActions.delete(row.original)}
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleActions.view(row.original)}
                >
                  {" "}
                  View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        }
      : column
  );

  return (
    <div className="">
      <div className="flex md:flex-row flex-col justify-between w-full px-6 pt-7 pb-1 flex-reverse flex-shrink ">
        <div className="grid lg:grid-cols-3  md:grid-cols-2  grid-cols-1 my-2  gap-8 text-primary ">
          <Card text="No. of Members" number={dashboard?.no_members || 0} />
          <Card
            text="No. of Ledgers Uploaded"
            number={dashboard?.no_ledgers || 0}
          />
          <Card text="No. of Sent SMS" number={dashboard?.no_sent_sms || 0} />
        </div>
        <div className="flex  justify-start justify- gap-2 ">
          <ButtonUpload
            text="Upload Ledger"
            icon={<Upload2 />}
            link="upload-ledger"
          />
          <ButtonUpload text="Send SMS" icon={<Sms />} link="SendSMS" />
        </div>
      </div>
      <BoardFilter text="Members">
        <div className="flex flex-row gap-1 md:gap-6 "></div>
      </BoardFilter>
      <div>
        {loading ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={loading}
              className="border-2 border-primary "
              size={9}
            />
          </div>
        ) : (
          <DataTable data={members} columns={columnsWithActions} />
        )}
      </div>
    </div>
  );
}
