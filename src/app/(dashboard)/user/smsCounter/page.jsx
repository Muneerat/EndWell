"use client";
import React, { useEffect, useState } from "react";
import { fetchSMSCount, fetchTransaction } from "./action";
import handleErrors from "@/app/data/handleErrors";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/app/components/Spinner";
import { TransactionColumns } from "@/app/data/transaction";
import { EoyassetColumns } from "@/app/data/eoyasset";
import { getAllMembers } from "@/Services/membersServie";
import { SmsCountColumns } from "@/app/data/SmsCounts";
import { DataTable } from "../../dashboard/components/table";
import BoardFilter from "../../dashboard/components/board";
import { fetchMonths, fetchYears } from "../requestSms/action";
import { userSmsCountColumns } from "@/app/data/userSmsCount";

export default function SMSCount() {
  const [smsCounts, setSmsCounts] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMember, setSelectedMember] = useState("all");
  const dispatch = useDispatch();
  const { userInfo} = useSelector((state) => state.userAuth);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await dispatch(
          getAllMembers(["id", "first_name", "last_name"])
        );
        setMembers(response.payload);
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

  useEffect(() => {
    const fetchSMSCounts = async () => {
      if (!selectedYear && !selectedMonth) return;
      setLoading(true);
      setSmsCounts([]);
      try {
        const response = await fetchSMSCount({
          year: selectedYear,
          month: selectedMonth,
          member_id: userInfo.id,
        });
    
        if (response.length === 0) {
          setErrors("No transactions found for the selected criteria.");
        } else {
          const SmsCounts = response.map((SmsCount, index) => ({
            ID: index + 1,
            member_name: SmsCount.member_name,
            month: SmsCount.month,
            year: SmsCount.year,
            no_of_message: SmsCount.no_of_message,
            total_amount: SmsCount.total_amount,
          }));
          setSmsCounts(SmsCounts);
          setErrors(null);
        }
      } catch (error) {
        handleErrors(error, setErrors);
      } finally {
        setLoading(false);
      }
    };

    fetchSMSCounts();
  }, [selectedYear,selectedMonth, userInfo.id]);

  return (
    <div className="md:px-6 py-10 sm:px-1 md:m-3">
        <div className="flex flex-col my-5  md:p-5 w-full lg: shadow-sm rounded-md mx-auto">
          {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
          <BoardFilter text="SMS Count History">
            <div className="flex md:flex-row flex-col  gap-6 mb-5">
              <Select onValueChange={(value) => setSelectedYear(value)}>
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
              </Select>

              <Select onValueChange={(value) => setSelectedMonth(value)}>
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
              </Select>

              {/* <Select onValueChange={(value) => setSelectedMember(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue
                    placeholder={selectedMember || "Select Member"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={String(member.id)}>
                      {member.first_name} {member.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
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
          ) : smsCounts.length > 0 ? (
            <DataTable data={smsCounts} columns={userSmsCountColumns} />
          ) : (
            <p className="text-center text-gray-600">No transactions found.</p>
          )}
        </div>
    </div>
  );
}
