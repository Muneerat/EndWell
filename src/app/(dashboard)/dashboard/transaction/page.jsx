"use client";
import React, { useEffect, useState } from "react";
import { fetchTransaction } from "./action";
import handleErrors from "@/app/data/handleErrors";
import { fetchMonths, fetchYears } from "../upload-ledger/action";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select as CustomSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { getAllMembers } from "@/Services/membersServie";
import Spinner from "@/app/components/Spinner";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";
import { TransactionColumns } from "@/app/data/transaction";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { addToast } from "@/Store/features/toastSlice";
import axios from "axios";

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMember, setSelectedMember] = useState("all");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await dispatch(
          getAllMembers(["id", "first_name", "last_name"])
        );
        if (response?.payload && Array.isArray(response.payload)) {
          setMembers(response.payload);
        } else {
          setErrors(response.payload?.message || "No record found.");
          setMembers([]);
        }
      } catch (error) {
        setErrors("Failed to load member data.");
      }
    };
    loadMembers();
  }, [dispatch]);

  useEffect(() => {
    const loadYears = async () => {
      try {
        const allYears = await fetchYears();
        setYears(Object.values(allYears.months));
      } catch (error) {
        setErrors("Failed to load years.");
      }
    };
    loadYears();
  }, []);

  useEffect(() => {
    const loadMonths = async () => {
      try {
        const monthData = await fetchMonths();
        const formattedMonths = Object.entries(monthData.months).map(
          ([key, value]) => ({
            key,
            value,
          })
        );
        setMonths(formattedMonths);
      } catch (error) {
        setErrors("Failed to load months.");
      }
    };
    loadMonths();
  }, []);

  const fetchTransactions = async () => {
    if (!selectedYear && !selectedMonth) return;
    setLoading(true);
    setTransaction([]);
    try {
      const response = await fetchTransaction({
        month: selectedMonth,
        year: selectedYear,
        id: selectedMember === "all" ? null : selectedMember,
      });
      if (response.length === 0) {
        setErrors("No transactions found for the selected criteria.");
      } else {
        const transactions = response.map((transaction, index) => ({
          ID: index + 1,
          id: transaction.id,
          member_name: transaction.member_name,
          total_contribution: transaction.total_contribution,
          total_dividend: transaction.total_dividend,
          withdrawable_dividend: transaction.withdrawable_dividend,
          month: transaction.month,
          year: transaction.year,
          date: transaction.date,
          uploaded_by: transaction.uploaded_by,
        }));
        setTransaction(transactions);
        setErrors(null);
      }
    } catch (error) {
      handleErrors(error, setErrors);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, selectedYear, selectedMember]);

  // Actions for table
  const handleActions = {
    edit: (transaction) => {
      if (transaction.id) {
        router.push(
          `/dashboard/editTransaction?id=${transaction.id}&month=${selectedMonth}&year=${selectedYear}`
        );
      }
    },
    delete: async (transaction) => {

      try {
        const response = await axios.delete(`/admin/transaction/delete`, {
          headers: { Role: "admin" },
          data: { id: transaction.id },
        });

        fetchTransactions();
        dispatch(
          addToast({
            type: "success",
            message: response.data.message,
          })
        );
        return response.data.message;
      } catch (error) {
        dispatch(
          addToast({
            type: "error",
            message: error.response.data.message,
          })
        );
      
      }
    },
  };

  const columnsWithActions = TransactionColumns.map((column) =>
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
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        }
      : column
  );

  const memberOptions = [
    { value: "select", label: "Select Members" },
    { value: "all", label: "All Members" },
    ...members.map((member) => ({
      value: member.id,
      label: `${member.first_name} ${member.last_name}`,
    })),
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      borderRadius: "8px",
      border: "2px solid #000680",
      padding: "6px",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused ? "#fff" : isSelected ? "#fff" : "#fff",
      color: "#333",
      padding: "10px",
    }),
  };

  const handleMemberChange = (selectedOption) => {
    setSelectedMember(selectedOption?.value || "all");
  };

  return (
    <div className="md:px-6 md:py-10 sm:px-1 md:m-3">
      <div className="flex flex-col my-5 md:p-1 p-5 w-full lg: shadow-sm rounded-md md:mx-auto">
        {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
        <BoardFilter text="Transaction History">
          <div className="flex md:flex-row flex-col gap-5 mb-5">
            <CustomSelect onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectedYear || "Select Year"} />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </CustomSelect>

            <CustomSelect onValueChange={(value) => setSelectedMonth(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectedMonth || "Select Month"} />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={String(month.value)}>
                    {month.key}
                  </SelectItem>
                ))}
              </SelectContent>
            </CustomSelect>

            <Select
              options={memberOptions}
              placeholder="Select Member"
              onChange={handleMemberChange}
              value={memberOptions.find((opt) => opt.value === selectedMember)}
              className="w-[180px] "
              styles={customStyles}
            />
          </div>
        </BoardFilter>
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Spinner
              className="border-2 border-primary"
              size={9}
              spin={loading}
            />
          </div>
        ) : transaction.length > 0 ? (
          <DataTable data={transaction} columns={columnsWithActions} />
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}
      </div>
    </div>
  );
}
